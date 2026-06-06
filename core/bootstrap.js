let API_URL = "";
let APP_READY = false;

async function bootstrap() {

    try {
        console.log("[BOOT] loading config...");

        const res = await fetch("../config/config.json");
        const config = await res.json();

        API_URL = config.API_URL;

        if (!API_URL) throw new Error("API missing");

        // health check loop
        await healthCheck();

        APP_READY = true;

        console.log("[BOOT] READY");

    } catch (err) {
        console.error("[BOOT ERROR]", err);
        alert("System offline");
    }
}

async function healthCheck() {
    try {
        const res = await fetch(API_URL + "/api/auth/login.php", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: "username=ping&password=ping"
        });

        return true;
    } catch (e) {
        throw new Error("API unreachable");
    }
}
