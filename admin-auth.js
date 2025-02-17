document.getElementById("admin-login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("admin-username").value;
    let password = document.getElementById("admin-password").value;

    if (username === "admin" && password === "secure123") {
        sessionStorage.setItem("isAdmin", "true");
        window.location.href = "admin-dashboard.html";
    } else {
        alert("Accès refusé !");
    }
});
