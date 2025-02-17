let produits = [];

document.getElementById("ajout-produit").addEventListener("submit", function(event) {
    event.preventDefault();

    let nom = document.getElementById("nom-produit").value;
    let prix = document.getElementById("prix-produit").value;

    produits.push({ nom, prix });
    afficherProduits();
});

function afficherProduits() {
    const liste = document.getElementById("liste-produits");
    liste.innerHTML = "";

    produits.forEach((produit, index) => {
        const li = document.createElement("li");
        li.textContent = `${produit.nom} - ${produit.prix}€`;
        liste.appendChild(li);
    });
}
