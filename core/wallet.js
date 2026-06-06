async function loadConfig() {

    try {

        console.log("[CONFIG] loading...");

        const res = await fetch("/config/config.json", {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("config not found: " + res.status);
        }

        const config = await res.json();

        console.log("[CONFIG OK]", config);

        API_URL = config.API_URL;
        XID = config.XID;

        document.getElementById("user").innerText = user;

        loadBalance();

    } catch (err) {

        console.error("[CONFIG ERROR]", err);

        document.getElementById("msg").innerText =
            "Config error: " + err.message;
    }
}
