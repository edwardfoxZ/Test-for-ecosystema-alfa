const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, "products.json");

app.use(cors());
app.use(express.json());

async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return { products: [] };
  }
}

// Helper function to write data
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Routes

// GET all products
app.get("/products", async (req, res) => {
  try {
    const data = await readData();
    res.json(data.products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const data = await readData();
    const product = data.products.find((p) => p.id === parseInt(req.params.id));

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// POST new product
app.post("/products", async (req, res) => {
  try {
    const data = await readData();
    const newProduct = {
      id: Math.max(...data.products.map((p) => p.id), 0) + 1,
      ...req.body,
      rating: req.body.rating || { rate: 0, count: 0 },
    };

    data.products.push(newProduct);
    await writeData(data);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// PUT update product
app.put("/products/:id", async (req, res) => {
  try {
    const data = await readData();
    const productIndex = data.products.findIndex(
      (p) => p.id === parseInt(req.params.id)
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found" });
    }

    data.products[productIndex] = {
      ...data.products[productIndex],
      ...req.body,
    };

    await writeData(data);
    res.json(data.products[productIndex]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE product
app.delete("/products/:id", async (req, res) => {
  try {
    const data = await readData();
    const productIndex = data.products.findIndex(
      (p) => p.id === parseInt(req.params.id)
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found" });
    }

    data.products.splice(productIndex, 1);
    await writeData(data);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
