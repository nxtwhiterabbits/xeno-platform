async function request(path, options = {}) {

    if (!APP_READY) {
        throw new Error("APP NOT READY");
    }

    const url = API_URL + path;

    const token = localStorage.getItem("token");

    const payload = options.body || {};

    if (token && !path.includes("login")) {
        payload.token = token;
    }

    console.log("[REQ]", url, payload);

    const res = await fetch(url, {
        method: options.method || "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const text = await res.text();

    console.log("[RAW]", text);

    return JSON.parse(text);
}
