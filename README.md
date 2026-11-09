# Otaku Garden — reviews and demo store

An anime and manga review website with a local demonstration shop. Reviews and product artwork are kept in the original site layout. The completed store has a shared product catalog, persistent carts, local account registration/login, and saved demo orders.

## Run

Requires Python 3.10 or later. No PHP, XAMPP, MySQL, or Python packages are needed.

```sh
python server.py
```

Open http://127.0.0.1:8797. The server binds to your own computer and stores accounts/orders in `.data/shop.sqlite`. You can change the port with `--port` and database location with `--database`.

1. Browse the reviews or open `Products.html`.
2. Search the catalog and add/remove products. The cart is restored on reload.
3. Optionally create a local account through the sign-in page. Passwords are salted and hashed using scrypt; sessions use an HTTP-only cookie.
4. Confirm an order and fill in delivery details. The server validates product IDs, recalculates prices from its own catalog, and records a demo receipt.

**Checkout is a demonstration: no payment is collected and nothing is shipped.** The legacy PHP connection is not used or served by the local server. This project is not a hosted commerce service; account recovery, payment providers, and fulfillment are not connected.

## Verification

```sh
python -m unittest discover -s tests -v
npm ci
npx playwright install chromium
npm test
```

The API tests use temporary databases, covering authentication, session cookies, duplicate accounts, incorrect passwords, server-side pricing, invalid carts, saved orders, and blocked private/legacy files. Browser checks cover registration, catalog/cart behavior, checkout, and empty or damaged saved carts.

`My_Otaku_Garden/project_start/main/catalog.json` is the shared source of product IDs, prices, images, and review links. Update it to change the catalog.
