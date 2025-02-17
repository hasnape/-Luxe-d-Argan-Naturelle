document.addEventListener("DOMContentLoaded", function () {
    let client = JSON.parse(sessionStorage.getItem("loggedInUser")).email;

    fetch(`http://localhost:3000/commandes?client=${client}`)
        .then(response => response.json())
        .then(data => {
            let liste = document.getElementById("liste-commandes");
            data.forEach(cmd => {
                let item = document.createElement("li");
                item.textContent = `Commande du ${new Date(cmd.date).toLocaleDateString()} - Total : ${cmd.total}€`;
                liste.appendChild(item);
            });
        });
});
