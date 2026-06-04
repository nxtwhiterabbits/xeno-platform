let API_URL = "";
let XID = "";

/* =========================
   LOAD CONFIG FIRST
========================= */
async function loadConfig() {
    try {
        const res = await fetch("config/config.json");
        const config = await res.json();

        API_URL = config.API_URL;
        XID = config.XID;

        console.log("Config loaded:", config);

        // start system after config ready
        loadBalance();

    } catch (err) {
        console.error("Failed to load config:", err);
    }
}

/* =========================
   LOAD BALANCE
========================= */
async function loadBalance() {
    try {
        const res = await fetch(`${API_URL}/api/balance.php?xid=${XID}`);
        const data = await res.json();

        const el = document.getElementById("balance");
        if (el) {
            el.innerText = data.balance + " XENO";
        }

    } catch (err) {
        console.error("Balance error:", err);
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
            body: `xid=${XID}&amount=${amount}`
        });

        const data = await res.json();

        console.log("Deposit:", data);

        // refresh balance after deposit
        loadBalance();

    } catch (err) {
        console.error("Deposit error:", err);
    }
}

/* =========================
   WITHDRAW (optional future)
========================= */
async function withdraw(amount) {
    try {
        const res = await fetch(`${API_URL}/api/withdraw.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `xid=${XID}&amount=${amount}`
        });

        const data = await res.json();

        console.log("Withdraw:", data);

        loadBalance();

    } catch (err) {
        console.error("Withdraw error:", err);
    }
}

/* =========================
   INIT SYSTEM
========================= */
loadConfig();
