let API_URL = "";
let XID = "";

/* =========================
   LOAD CONFIG
========================= */
async function loadConfig() {
    try {
        console.log("[XENO] Loading config...");

        const res = await fetch("../config/config.json");
        const config = await res.json();

        console.log("[XENO] Config:", config);

        API_URL = config.API_URL;
        XID = config.XID;

        document.getElementById("xid").innerText = XID;

        loadBalance();

    } catch (err) {
        console.error("[XENO] Config error:", err);
    }
}

/* =========================
   LOAD BALANCE (FIXED)
========================= */
async function loadBalance() {
    try {
        console.log("[XENO] Fetch balance...");

        const res = await fetch(`${API_URL}/api/balance.php?xid=${XID}`);
        const data = await res.json();

        console.log("[XENO] Balance response:", data);

        // SAFE READ (IMPORTANT FIX)
        const balance = data.balance ?? 0;

        document.getElementById("balance").innerText = balance;

    } catch (err) {
        console.error("[XENO] Balance error:", err);
        document.getElementById("balance").innerText = "0";
    }
}

/* =========================
   DEPOSIT (FIXED)
========================= */
async function deposit(amount) {
    try {
        console.log("[XENO] Deposit:", amount);

        await fetch(`${API_URL}/api/deposit.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `xid=${XID}&amount=${amount}`
        });

        // refresh balance AFTER update
        setTimeout(loadBalance, 300);

    } catch (err) {
        console.error("[XENO] Deposit error:", err);
    }
}

/* =========================
   WITHDRAW (FIXED)
========================= */
async function withdraw(amount) {
    try {
        console.log("[XENO] Withdraw:", amount);

        await fetch(`${API_URL}/api/withdraw.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `xid=${XID}&amount=${amount}`
        });

        // refresh balance AFTER update
        setTimeout(loadBalance, 300);

    } catch (err) {
        console.error("[XENO] Withdraw error:", err);
    }
}

/* =========================
   START SYSTEM
========================= */
loadConfig();
