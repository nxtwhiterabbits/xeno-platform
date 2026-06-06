async function request(path, options = {}) {

    if (!APP_READY) {
        throw new Error("APP NOT READY");
    }

    const url = API_URL + path;

    const token = localStorage.getItem("token");

    const params = new URLSearchParams();

    if (options.body) {
        for (const key in options.body) {
            params.append(key, options.body[key]);
        }
    }

    if (token) {
        params.append("token", token);
    }

    console.log("[API REQUEST]", url);
    console.log("[API BODY]", params.toString());

    const res = await fetch(url, {
        method: options.method || "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
    });

    const text = await res.text();
    console.log("[API RAW]", text);

    return JSON.parse(text);
}
