function protectRoute() {
    if (!isLoggedIn()) {
        window.location.href = "./login.html";
    }
}
