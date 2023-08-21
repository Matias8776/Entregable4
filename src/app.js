import express from "express";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import viewsRouter from "./routes/realTimeProducts.js";
import path from "path";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "/public")));
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const server = app.listen(8080, () => {
    console.log("Servidor en puerto 8080");
});

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("Cliente conectado");
    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });

    socket.emit("server:updatedProducts");
    socket.on("client:updateProduct", () => {
        io.emit("server:updatedProducts");
    });
});
