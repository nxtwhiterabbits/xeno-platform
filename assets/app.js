// LOAD BALANCE
async function loadBalance() {
    const res = await fetch(`${API_URL}/api/balance.php?xid=${XID}`);
    const data = await res.json();

    document.getElementById("balance").innerText =
        data.balance + " XENO";
}

// DEPOSIT
async function deposit(amount) {
    const res = await fetch(`${API_URL}/api/deposit.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `xid=${XID}&amount=${amount}`
    });

    const data = await res.json();
    console.log(data);
    loadBalance();
}

// AUTO RUN
loadBalance();
