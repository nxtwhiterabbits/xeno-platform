async function request(path, options = {}) {

    if (!APP_READY) throw new Error("APP NOT READY");

    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        ...(options.headers || {})
    };

    const body = new URLSearchParams(options.body || {});

    if (token) {
        body.append("token", token);
    }

    const res = await fetch(API_URL + path, {
        method: options.method || "POST",
        headers,
        body: body.toString()
    });

    const data = await res.json();

    // auto logout on expired token
    if (data.status === "error" && data.message === "auth failed") {
        logout();
    }

    return data;
}
