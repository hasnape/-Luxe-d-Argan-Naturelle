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
