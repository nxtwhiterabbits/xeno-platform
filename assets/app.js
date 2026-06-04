let API_URL = "";
let XID = "";

/* =========================
   LOAD CONFIG
========================= */
async function loadConfig() {
    try {
        console.log("Loading config...");

        const res = await fetch("../config/config.json");
        const config = await res.json();

        console.log("CONFIG LOADED:", config);

        API_URL = config.API_URL;
        XID = config.XID;

        document.getElementById("xid").innerText = XID;

        loadBalance();

    } catch (err) {
        console.error("Config load error:", err);
    }
}

/* =========================
   LOAD BALANCE
========================= */
async function loadBalance() {
    try {
        const res = await fetch(`${API_URL}/api/balance.php?xid=${XID}`);
        const data = await res.json();

        console.log("BALANCE:", data);

        document.getElementById("balance").innerText = data.balance;

    } catch (err) {
        console.error("Balance error:", err);
    }
}

/* =========================
   DEPOSIT
========================= */
async function deposit(amount) {
    try {
        await fetch(`${API_URL}/api/deposit.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `xid=${XID}&amount=${amount}`
        });

        loadBalance();

    } catch (err) {
        console.error("Deposit error:", err);
    }
}

/* =========================
   WITHDRAW
========================= */
async function withdraw(amount) {
    try {
        await fetch(`${API_URL}/api/withdraw.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `xid=${XID}&amount=${amount}`
        });

        loadBalance();

    } catch (err) {
        console.error("Withdraw error:", err);
    }
}

/* =========================
   START SYSTEM
========================= */
loadConfig();
