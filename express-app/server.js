const express = require('express')
const app = express()
const sqlite3 = require("sqlite3").verbose();
const cors = require('cors');

const port = 3000
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const corsOptions = {
    origin: '*', 
    methods: 'GET,POST', 
    allowedHeaders: 'Content-Type,Authorization' 
};

app.use(cors(corsOptions));

/** Function that connects with sqLite db. */
const db = new sqlite3.Database("products.db", (err) => {
  if (err) {
    console.error("Błąd połączenia z bazą:", err.message);
  } else {
    console.log("✅ Połączono z bazą SQLite.");
  }
});

/** Function that creates table if nor exists. */
db.run(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE,
  category TEXT
)`);

/** Function that fetches products from database. */
app.get("/products", (req, res) => {
  const { name, limit } = req.query;
  let sql = "SELECT * FROM products";
  const params = [];

  if (name) {
    sql += " WHERE LOWER(name) LIKE ?";
    params.push(`%${name.toLowerCase()}%`);
  }

  const limitValue = parseInt(limit, 10);
  const finalLimit = !isNaN(limitValue) && limitValue > 0 ? limitValue : 10;
  
  sql += name ? " LIMIT ?" : " LIMIT ?"; // Append limit regardless
  params.push(finalLimit);

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

/** Function that adds a new product to the database. */
app.post("/products", (req, res) => {
  const { name, category } = req.body;
  if (!name || !category) {
    return res.status(400).json({ error: "Podaj nazwę i kategorię produktu." });
  }
  db.run("INSERT INTO products (name, category) VALUES (?, ?)", [name, category], function (err) {
    if (err) {
      return res.status(400).json({ error: "Produkt już istnieje lub błąd bazy." });
    }
    res.status(201).json({ id: this.lastID, name, category });
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/** Function that runs the server. */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})