let produits = [];

document.getElementById("ajout-produit").addEventListener("submit", function (event) {
    event.preventDefault();
    
    let nom = document.getElementById("nom-produit").value;
    let prix = parseFloat(document.getElementById("prix-produit").value);
    let stock = parseInt(document.getElementById("stock-produit").value);

    let produit = { nom, prix, stock };
    produits.push(produit);

    afficherProduits();
});

function afficherProduits() {
    let listeProduits = document.getElementById("liste-produits");
    listeProduits.innerHTML = "";

    produits.forEach((produit, index) => {
        let item = document.createElement("li");
        item.textContent = `${produit.nom} - ${produit.prix}€ - Stock : ${produit.stock}`;
        listeProduits.appendChild(item);
    });
}
