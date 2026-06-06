async function login(username, password) {

    console.log("[LOGIN] START");

    const res = await request("/api/auth/login.php", {
        body: {
            username,
            password
        }
    });

    console.log("[LOGIN RESPONSE]", res);

    if (res.status !== "success") {
        throw new Error(res.message || "Login failed");
    }

    localStorage.setItem("token", res.token);
    localStorage.setItem("refresh", res.refresh_token);
    localStorage.setItem("user", res.username);
    localStorage.setItem("xid", res.xid);

    window.location.href = "./wallet.html";
}

function logout() {
    localStorage.clear();
    window.location.href = "./login.html";
}
