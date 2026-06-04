let API_URL = "";
let XID = "";

async function loadConfig() {
    const res = await fetch("../config/config.json"); // IMPORTANT
    const config = await res.json();

    API_URL = config.API_URL;
    XID = config.XID;

    document.getElementById("xid").innerText = XID;

    loadBalance();
}

async function loadBalance() {
    const res = await fetch(`${API_URL}/api/balance.php?xid=${XID}`);
    const data = await res.json();

    document.getElementById("balance").innerText = data.balance;
}

async function deposit(amount) {
    await fetch(`${API_URL}/api/deposit.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `xid=${XID}&amount=${amount}`
    });

    loadBalance();
}

async function withdraw(amount) {
    await fetch(`${API_URL}/api/withdraw.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `xid=${XID}&amount=${amount}`
    });

    loadBalance();
}

loadConfig();
