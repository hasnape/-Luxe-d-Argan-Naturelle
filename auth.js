document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let nom = document.getElementById("register-nom").value;
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;

    let user = { nom, email, password };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Inscription réussie !");
});

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;
    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert("Connexion réussie !");
        sessionStorage.setItem("loggedInUser", JSON.stringify(storedUser));
        window.location.href = "index.html";
    } else {
        alert("Email ou mot de passe incorrect.");
    }
});
