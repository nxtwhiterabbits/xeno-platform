async function request(path, options = {}) {

    if (!APP_READY) {
        throw new Error("APP NOT READY");
    }

    const token = localStorage.getItem("token");

    const bodyObj = options.body || {};

    if (token) {
        bodyObj.token = token;
    }

    const body = new URLSearchParams(bodyObj);

    const url = API_URL + path;

    console.log("[API] REQUEST =>", url);

    const res = await fetch(url, {
        method: options.method || "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body.toString()
    });

    const text = await res.text();

    console.log("[API] RAW RESPONSE =>", text);

    let data;

    try {
        data = JSON.parse(text);
    } catch (e) {
        throw new Error("Invalid JSON from server");
    }

    if (data.status === "error" && data.message === "auth failed") {
        logout();
    }

    return data;
}
