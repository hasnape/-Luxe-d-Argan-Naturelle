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

// Initialisation Stripe (remplace "VOTRE_CLE_PUBLIQUE_STRIPE" par ta clé)
let stripe = Stripe("VOTRE_CLE_PUBLIQUE_STRIPE");

document.getElementById("stripe-pay").addEventListener("click", function () {
    // Envoyer les données du panier au serveur
    fetch("/stripe-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ panier: panier })
    })
    .then(response => response.json())
    .then(data => {
        if (data.url) window.location.href = data.url;
    });
});

// PayPal
paypal.Buttons({
    createOrder: function (data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: { value: totalPrix }
            }]
        });
    },
    onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
            alert("Paiement réussi ! Merci " + details.payer.name.given_name);
            viderPanier();
        });
    }
}).render("#paypal-button-container");

document.getElementById("stripe-pay").addEventListener("click", function () {
    let client = JSON.parse(sessionStorage.getItem("loggedInUser")).email;
    let produitsCommandes = panier;
    let totalPrix = panier.reduce((acc, p) => acc + p.prix, 0);

    fetch("http://localhost:3000/commande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client, produits: produitsCommandes, total: totalPrix })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Erreur:", error));
});

