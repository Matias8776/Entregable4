const socket = io();

const productsContainer = document.getElementById("productsList");
const addForm = document.getElementById("addForm");
const deleteForm = document.getElementById("deleteForm");

let form = document.getElementById("addForm");

socket.on("updatedProducts", async () => {
    await fetch("/api/products", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((response) => {
            let products = response;
            productsContainer.innerHTML = "";
            products.forEach((a) => {
                const newLiProduct = document.createElement("li");
                newLiProduct.innerHTML = `
            <strong>Id:</strong> ${a.id}<br>
            <strong>Título:</strong> ${a.title}<br>
            <strong>Descripción:</strong> ${a.description}<br>
            <strong>Precio:</strong> ${a.price}<br>
            <strong>Código:</strong> ${a.code}<br>
            <strong>Stock:</strong> ${a.stock}<br>
            <strong>Categoria:</strong> ${a.category}<br>
            <strong>Status:</strong> ${a.status}<br>
            `;
                productsContainer.appendChild(newLiProduct);
            });
        });
});

addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(addForm);

    formData.get("title");
    formData.get("description");
    formData.get("code");
    formData.get("price");
    formData.get("stock");
    formData.get("category");
    formData.get("status");
    formData.get("thumbnails");

    await fetch("/api/products", {
        method: "POST",
        body: formData,
    });
    addForm.reset();
    socket.emit("addProduct");
});

deleteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(deleteForm);
    const pid = formData.get("id");

    await fetch(`/api/products/${pid}`, {
        method: "DELETE",
        body: formData,
    });
    deleteForm.reset();
    socket.emit("addProduct");
});
