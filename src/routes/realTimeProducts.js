import ProductManager from "../ProductManager.js";
import { Router } from "express";
import __dirname from "../utils.js";

const router = Router();

const productManager = new ProductManager();

router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("index", {
        products,
        style: "index.css",
        title: "Ecommerce - Productos en tiempo real",
    });
});

router.get("/realtimeproducts", async (req, res) => {
    res.render("realtimeproducts", {
        style: "realTimeProducts.css",
        title: "Ecommerce - Productos en tiempo real",
    });
});

export default router;
