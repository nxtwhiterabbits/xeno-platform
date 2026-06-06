async function loadBalance() {

    try {

        const res = await request("/api/balance.php", {
            method: "GET"
        });

        document.getElementById("balance").innerText =
            res.balance ?? 0;

    } catch (err) {

        console.error("[WALLET] ERROR", err);

        document.getElementById("balance").innerText = "0";
    }
}

async function deposit(amount) {

    await request("/api/deposit.php", {
        body: { amount }
    });

    loadBalance();
}

async function withdraw(amount) {

    await request("/api/withdraw.php", {
        body: { amount }
    });

    loadBalance();
}
