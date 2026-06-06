async function login(username, password) {

    const res = await request("/api/auth/login.php", {
        body: { username, password }
    });

    if (res.status === "success") {

        localStorage.setItem("token", res.token);
        localStorage.setItem("refresh", res.refresh_token);
        localStorage.setItem("user", res.username);
        localStorage.setItem("xid", res.xid);

        window.location.href = "./wallet.html";

    } else {
        alert(res.message);
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "./login.html";
}

function isLoggedIn() {
    return !!localStorage.getItem("token");
}
