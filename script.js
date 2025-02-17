let panier = [];
const panierListe = document.getElementById("panier-liste");
const totalPrix = document.getElementById("total-prix");
const panierBtn = document.getElementById("cart-btn");
const panierDiv = document.getElementById("panier");

function ajouterAuPanier(nom, prix) {
    panier.push({ nom, prix });
    mettreAJourPanier();
}

function mettreAJourPanier() {
    panierListe.innerHTML = "";
    let total = 0;

    panier.forEach((item, index) => {
        total += item.prix;
        const li = document.createElement("li");
        li.textContent = `${item.nom} - ${item.prix}€`;
        panierListe.appendChild(li);
    });

    totalPrix.textContent = total;
    document.getElementById("cart-count").textContent = panier.length;
    panierDiv.classList.remove("hidden");
}

function viderPanier() {
    panier = [];
    mettreAJourPanier();
}

// Afficher/Masquer le panier
panierBtn.addEventListener("click", () => {
    panierDiv.classList.toggle("hidden");
});

document.addEventListener("DOMContentLoaded", async () => {
    const produitsContainer = document.getElementById("produits");

    // Récupération des produits depuis le backend
    const response = await fetch("http://localhost:3000/produits");
    const produits = await response.json();

    produitsContainer.innerHTML = produits.map(produit => `
        <div class="produit">
            <img src="assets/images/${produit.image}" alt="${produit.nom}">
            <h2>${produit.nom}</h2>
            <p>${produit.description}</p>
            <p>Prix : ${produit.prix}€</p>
            <button onclick="ajouterAuPanier('${produit._id}', '${produit.nom}', ${produit.prix})">Ajouter au panier</button>
        </div>
    `).join('');
});

// Fonction pour ajouter un produit au panier (stocké en localStorage)
function ajouterAuPanier(id, nom, prix) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier.push({ id, nom, prix, quantite: 1 });
    localStorage.setItem("panier", JSON.stringify(panier));
    alert("Produit ajouté au panier !");
}

