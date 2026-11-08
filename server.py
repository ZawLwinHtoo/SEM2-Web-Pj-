"""Local Otaku Garden demo: static site, accounts, sessions, and saved demo orders."""
from collections import Counter
from contextlib import contextmanager
from functools import partial
from http.cookies import SimpleCookie
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit
import argparse
import hashlib
import hmac
import json
import re
import secrets
import sqlite3
import time

ROOT = Path(__file__).resolve().parent
SITE = ROOT / "My_Otaku_Garden/project_start/main"


@contextmanager
def database(path):
    connection = sqlite3.connect(path)
    connection.row_factory = sqlite3.Row
    try:
        with connection:
            yield connection
    finally:
        connection.close()


class StoreServer(ThreadingHTTPServer):
    daemon_threads = True

    def __init__(self, address, db_path):
        self.db_path = Path(db_path)
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self.catalog = {item["id"]: item for item in json.loads((SITE / "catalog.json").read_text(encoding="utf-8"))}
        with database(self.db_path) as db:
            db.executescript('''
                CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);
                CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY, user_id INTEGER NOT NULL, expires INTEGER NOT NULL);
                CREATE TABLE IF NOT EXISTS orders(id TEXT PRIMARY KEY, user_id INTEGER, customer TEXT NOT NULL, items TEXT NOT NULL, total INTEGER NOT NULL, created INTEGER NOT NULL);
            ''')
        super().__init__(address, partial(StoreHandler, directory=str(SITE)))


class StoreHandler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, ".jfif": "image/jpeg"}
    def reply(self, status, data, cookie=None):
        body = json.dumps(data).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        if cookie:
            self.send_header("Set-Cookie", cookie)
        self.end_headers()
        self.wfile.write(body)

    def user(self):
        cookies = SimpleCookie()
        try:
            cookies.load(self.headers.get("Cookie", ""))
            token = cookies["otaku_session"].value
        except (KeyError, ValueError):
            return None
        digest = hashlib.sha256(token.encode()).hexdigest()
        with database(self.server.db_path) as db:
            row = db.execute("SELECT u.id,u.name,u.email FROM users u JOIN sessions s ON u.id=s.user_id WHERE s.token=? AND s.expires>?", (digest, int(time.time()))).fetchone()
            return dict(row) if row else None

    def session(self, user_id):
        token = secrets.token_urlsafe(32)
        with database(self.server.db_path) as db:
            db.execute("DELETE FROM sessions WHERE expires<=?", (int(time.time()),))
            db.execute("INSERT INTO sessions VALUES(?,?,?)", (hashlib.sha256(token.encode()).hexdigest(), user_id, int(time.time()) + 86400))
        return f"otaku_session={token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400"

    def do_GET(self):
        route = urlsplit(self.path).path
        if route == "/api/auth/me":
            return self.reply(200, {"user": self.user()})
        if route == "/api/orders":
            user = self.user()
            if not user:
                return self.reply(401, {"error": "Sign in to see your demo orders."})
            with database(self.server.db_path) as db:
                rows = db.execute("SELECT id,total,created FROM orders WHERE user_id=? ORDER BY created DESC", (user["id"],)).fetchall()
            return self.reply(200, {"orders": [dict(row) for row in rows], "demo": True})
        if route.startswith("/api/"):
            return self.reply(404, {"error": "Not found"})
        if route == "/":
            self.path = "/home.html"
        decoded = unquote(urlsplit(self.path).path)
        if any(part.startswith(".") for part in decoded.split("/")) or Path(decoded).suffix.lower() not in {".html", ".css", ".js", ".json", ".png", ".jpg", ".jpeg", ".jfif", ".gif", ".webp", ".svg", ".ico", ".woff", ".woff2", ".ttf", ".otf", ".mp4"}:
            return self.send_error(404)
        super().do_GET()

    def do_POST(self):
        origin = self.headers.get("Origin")
        if origin and urlsplit(origin).netloc != self.headers.get("Host"):
            return self.reply(403, {"error": "Cross-site requests are not allowed."})
        try:
            if self.headers.get_content_type() != "application/json":
                raise ValueError("Send JSON data.")
            size = int(self.headers.get("Content-Length", "0"))
            if not 0 < size <= 100_000:
                raise ValueError("Invalid request size.")
            payload = json.loads(self.rfile.read(size))
            if not isinstance(payload, dict):
                raise ValueError("Expected a JSON object.")
            route = urlsplit(self.path).path
            if route in {"/api/auth/register", "/api/auth/login"}:
                return self.account(route, payload)
            if route == "/api/orders":
                return self.order(payload)
            if route == "/api/auth/logout":
                cookie = SimpleCookie(self.headers.get("Cookie", ""))
                if "otaku_session" in cookie:
                    digest = hashlib.sha256(cookie["otaku_session"].value.encode()).hexdigest()
                    with database(self.server.db_path) as db:
                        db.execute("DELETE FROM sessions WHERE token=?", (digest,))
                return self.reply(200, {"ok": True}, "otaku_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0")
            return self.reply(404, {"error": "Not found"})
        except (ValueError, TypeError, KeyError) as exc:
            return self.reply(400, {"error": str(exc)})

    def account(self, route, payload):
        email, password = payload.get("email"), payload.get("password")
        if not isinstance(email, str) or not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", email) or len(email) > 254:
            raise ValueError("Enter a valid email address.")
        if not isinstance(password, str) or not 8 <= len(password) <= 128:
            raise ValueError("Use a password between 8 and 128 characters.")
        email = email.strip().lower()
        with database(self.server.db_path) as db:
            if route.endswith("register"):
                name = payload.get("name")
                if not isinstance(name, str) or not 1 <= len(name.strip()) <= 80:
                    raise ValueError("Enter a name of 1 to 80 characters.")
                salt = secrets.token_bytes(16)
                digest = hashlib.scrypt(password.encode(), salt=salt, n=16384, r=8, p=1).hex()
                try:
                    cursor = db.execute("INSERT INTO users(name,email,password) VALUES(?,?,?)", (name.strip(), email, salt.hex() + ":" + digest))
                    user_id = cursor.lastrowid
                except sqlite3.IntegrityError:
                    return self.reply(409, {"error": "An account already exists for this email."})
            else:
                row = db.execute("SELECT id,password FROM users WHERE email=?", (email,)).fetchone()
                if not row:
                    return self.reply(401, {"error": "Invalid email or password."})
                salt, stored = row["password"].split(":")
                digest = hashlib.scrypt(password.encode(), salt=bytes.fromhex(salt), n=16384, r=8, p=1).hex()
                if not hmac.compare_digest(digest, stored):
                    return self.reply(401, {"error": "Invalid email or password."})
                user_id = row["id"]
        return self.reply(200, {"ok": True}, self.session(user_id))

    def order(self, payload):
        item_ids = payload.get("items")
        customer = payload.get("customer")
        if not isinstance(item_ids, list) or not 1 <= len(item_ids) <= 100 or any(type(i) is not int or i not in self.server.catalog for i in item_ids):
            raise ValueError("Add valid products to your cart before checkout.")
        fields = {"first_name", "last_name", "email", "country", "address", "city", "state", "phone"}
        if not isinstance(customer, dict) or any(not isinstance(customer.get(field), str) or not customer[field].strip() or len(customer[field]) > 254 for field in fields):
            raise ValueError("Complete every required delivery field.")
        if customer["country"] == "select" or not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", customer["email"]) or not re.fullmatch(r"[+\d ()-]{7,25}", customer["phone"]):
            raise ValueError("Enter a valid country, email, and phone number.")
        items = [{"id": key, "title": self.server.catalog[key]["title"], "quantity": count, "price": self.server.catalog[key]["price"]} for key, count in Counter(item_ids).items()]
        total = sum(item["price"] * item["quantity"] for item in items)
        user = self.user()
        order_id = "DEMO-" + secrets.token_hex(6).upper()
        with database(self.server.db_path) as db:
            db.execute("INSERT INTO orders VALUES(?,?,?,?,?,?)", (order_id, user["id"] if user else None, json.dumps({field: customer[field].strip() for field in fields}), json.dumps(items), total, int(time.time())))
        return self.reply(201, {"id": order_id, "total": total, "currency": "USD", "demo": True})


def main():
    parser = argparse.ArgumentParser(description="Run the local Otaku Garden shop demo")
    parser.add_argument("--port", type=int, default=8797)
    parser.add_argument("--database", type=Path, default=ROOT / ".data/shop.sqlite")
    args = parser.parse_args()
    with StoreServer(("127.0.0.1", args.port), args.database) as server:
        print(f"Local demo: http://127.0.0.1:{args.port}. No payments or shipments.", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
