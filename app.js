const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const port = 3000;
const manager = new ProductManager("./products.json");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenido al servidor de ProductManager");
});

app.get("/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await manager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await manager.getProducts();
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
