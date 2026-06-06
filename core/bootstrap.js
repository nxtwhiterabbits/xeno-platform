let API_URL = "";
let APP_READY = false;

window.bootstrap = async function () {

    try {
        console.log("[BOOT] START");

        const res = await fetch("../config/config.json", {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("config.json not found");
        }

        const config = await res.json();

        API_URL = config.API_URL || "";

        if (!API_URL) {
            throw new Error("API_URL missing");
        }

        APP_READY = true;

        console.log("[BOOT] READY", API_URL);

    } catch (err) {

        console.error("[BOOT ERROR]", err);

        APP_READY = false;
    }
};
