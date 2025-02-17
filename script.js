// Initialisation du panier
let panier = [];
let totalPrix = 0;

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(nom, prix) {
    panier.push({ nom, prix });
    totalPrix += prix;
    miseAJourPanier();
}

// Fonction pour mettre à jour l'affichage du panier
function miseAJourPanier() {
    let panierListe = document.getElementById("panier-liste");
    let totalPrixElement = document.getElementById("total-prix");
    let cartCount = document.getElementById("cart-count");

    // Vider la liste avant de la remplir
    panierListe.innerHTML = "";
    
    // Ajouter chaque élément du panier à la liste
    panier.forEach((produit, index) => {
        let item = document.createElement("li");
        item.textContent = `${produit.nom} - ${produit.prix}€`;
        panierListe.appendChild(item);
    });

    // Mettre à jour le total
    totalPrixElement.textContent = totalPrix;
    
    // Mettre à jour l'icône du panier
    cartCount.textContent = panier.length;
}

// Fonction pour vider le panier
function viderPanier() {
    panier = [];
    totalPrix = 0;
    miseAJourPanier();
}

// Affichage du panier au clic sur l'icône
document.getElementById("cart-btn").addEventListener("click", () => {
    let panierElement = document.getElementById("panier");
    panierElement.classList.toggle("hidden");
});
