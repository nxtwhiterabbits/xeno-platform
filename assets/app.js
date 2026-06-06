let API_URL = "";
let TOKEN = "";
console.log("APP JS LOADED");

/* =========================
   LOAD CONFIG
========================= */
async function loadConfig() {
    try {
        const res = await fetch("../config/config.json");
        const config = await res.json();

        API_URL = config.API_URL;

        TOKEN = localStorage.getItem("token");

        if (!TOKEN) {
            window.location.href = "./login.html";
            return;
        }

        loadBalance();

    } catch (err) {
        console.error("[XENO] Config error:", err);
    }
}

/* =========================
   LOAD BALANCE (SECURE)
========================= */
async function loadBalance() {
    try {
        const res = await fetch(`${API_URL}/api/balance.php?token=${TOKEN}`);
        const data = await res.json();

        console.log("[XENO] Balance:", data);

        if (data.status === "success") {
            document.getElementById("balance").innerText = data.balance;
            document.getElementById("xid").innerText = data.xid;
        } else {
            console.error(data.message);
        }

    } catch (err) {
        console.error("[XENO] Balance error:", err);
    }
}

/* =========================
   DEPOSIT
========================= */
async function deposit(amount) {
    try {
        const res = await fetch(`${API_URL}/api/deposit.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `token=${TOKEN}&amount=${amount}`
        });

        const data = await res.json();

        if (data.status === "success") {
            loadBalance();
        } else {
            console.error(data.message);
        }

    } catch (err) {
        console.error("[XENO] Deposit error:", err);
    }
}

/* =========================
   WITHDRAW
========================= */
async function withdraw(amount) {
    try {
        const res = await fetch(`${API_URL}/api/withdraw.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `token=${TOKEN}&amount=${amount}`
        });

        const data = await res.json();

        if (data.status === "success") {
            loadBalance();
        } else {
            console.error(data.message);
        }

    } catch (err) {
        console.error("[XENO] Withdraw error:", err);
    }
}

/* =========================
   START
========================= */
loadConfig();
