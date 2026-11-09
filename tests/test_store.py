from pathlib import Path
from tempfile import TemporaryDirectory
from threading import Thread
from urllib.error import HTTPError
from urllib.request import Request, build_opener, HTTPCookieProcessor
import http.cookiejar
import json
import unittest
from server import StoreServer, database


class StoreTests(unittest.TestCase):
    def setUp(self):
        self.folder = TemporaryDirectory()
        self.path = Path(self.folder.name) / "test.sqlite"
        self.server = StoreServer(("127.0.0.1", 0), self.path)
        self.thread = Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.base = f"http://127.0.0.1:{self.server.server_port}"
        self.client = build_opener(HTTPCookieProcessor(http.cookiejar.CookieJar()))

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()
        self.folder.cleanup()

    def post(self, path, data):
        request = Request(self.base + path, data=json.dumps(data).encode(), headers={"Content-Type": "application/json"})
        try:
            response = self.client.open(request)
        except HTTPError as error:
            response = error
        with response:
            return response.status, json.load(response)

    def test_passwords_and_sessions(self):
        account = {"name": "Demo User", "email": "demo@example.test", "password": "Test-pass-123"}
        self.assertEqual(self.post("/api/auth/register", account)[0], 200)
        with self.client.open(self.base + "/api/auth/me") as response:
            self.assertEqual(json.load(response)["user"]["email"], account["email"])
        self.assertEqual(self.post("/api/auth/register", account)[0], 409)
        self.post("/api/auth/logout", {})
        self.assertEqual(self.post("/api/auth/login", {**account, "password": "incorrect-password"})[0], 401)
        self.assertEqual(self.post("/api/auth/login", account)[0], 200)
        with database(self.path) as db:
            self.assertNotEqual(db.execute("SELECT password FROM users").fetchone()[0], account["password"])

    def test_order_recalculates_total_and_persists(self):
        customer = {"first_name": "Demo", "last_name": "User", "email": "demo@example.test", "country": "MMR", "address": "Test street", "city": "Yangon", "state": "Yangon", "phone": "09123456789"}
        status, receipt = self.post("/api/orders", {"items": [0, 0], "customer": customer, "total": 1})
        self.assertEqual(status, 201)
        self.assertEqual(receipt["total"], 2 * self.server.catalog[0]["price"])
        self.assertTrue(receipt["demo"])
        with database(self.path) as db:
            self.assertEqual(db.execute("SELECT count(*) FROM orders").fetchone()[0], 1)
        self.assertEqual(self.post("/api/orders", {"items": [], "customer": customer})[0], 400)
        self.assertEqual(self.post("/api/orders", {"items": [9999], "customer": customer})[0], 400)

    def test_does_not_serve_legacy_php_or_credentials(self):
        for path in ["/db_conn.php", "/.git/config", "/../server.py"]:
            with self.assertRaises(HTTPError) as error:
                self.client.open(self.base + path)
            self.assertEqual(error.exception.code, 404)

    def test_every_catalog_image_is_served(self):
        for item in self.server.catalog.values():
            with self.subTest(product=item["id"]):
                with self.client.open(self.base + "/" + item["image"]) as response:
                    self.assertEqual(response.status, 200)
                    self.assertTrue(response.headers.get_content_type().startswith("image/"))


if __name__ == "__main__":
    unittest.main()
