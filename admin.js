document.addEventListener("DOMContentLoaded", function () {
    if (!sessionStorage.getItem("isAdmin")) {
        window.location.href = "admin-login.html";
    }

    document.getElementById("logout").addEventListener("click", function () {
        sessionStorage.removeItem("isAdmin");
        window.location.href = "admin-login.html";
    });

    function chargerProduits() {
        fetch("http://localhost:3000/produits")
            .then(response => response.json())
            .then(data => {
                let listeProduits = document.getElementById("product-list");
                listeProduits.innerHTML = "";
                data.forEach(prod => {
                    let item = document.createElement("li");
                    item.textContent = `${prod.nom} - ${prod.prix}€ - Stock: ${prod.stock}`;
                    listeProduits.appendChild(item);
                });
            });
    }

    document.getElementById("add-product-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let nom = document.getElementById("product-name").value;
        let prix = document.getElementById("product-price").value;
        let stock = document.getElementById("product-stock").value;

        fetch("http://localhost:3000/produits", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom, prix, stock })
        }).then(() => chargerProduits());
    });

    function chargerCommandes() {
        fetch("http://localhost:3000/commandes")
            .then(response => response.json())
            .then(data => {
                let listeCommandes = document.getElementById("order-list");
                listeCommandes.innerHTML = "";
                data.forEach(cmd => {
                    let item = document.createElement("li");
                    item.textContent = `Commande de ${cmd.client} - ${cmd.total}€`;
                    listeCommandes.appendChild(item);
                });
            });
    }

    chargerProduits();
    chargerCommandes();
});
