let API_URL = "";
let APP_READY = false;

window.bootstrap = async function () {

    try {

        const res = await fetch("../config/config.json", {
            cache: "no-store"
        });

        const config = await res.json();

        API_URL = config.API_URL;

        if (!API_URL) throw new Error("API missing");

        APP_READY = true;

        console.log("[BOOT READY]", API_URL);

    } catch (err) {

        console.error("[BOOT ERROR]", err);

        APP_READY = false;
    }
};
