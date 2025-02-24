<script src="https://js.paystack.co/v1/inline.js"></script>

    function payWithPaystack() {
        // Get form data
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phonenumber = document.getElementById("number").value;
        let amount = document.getElementById("amount").value;
        let givingtype = document.getElementById("type").value;
        let choose = document.getElementById("choose").value;

        // Validate inputs
        if (!name || !email || !amount || givingtype === "empty" || choose === "Empty") {
            alert("Please fill in all required fields.");
            return;
        }

        let handler = PaystackPop.setup({
            key: 'your-paystack-public-key', // Replace with your Paystack public key
            email: email,
            amount: amount * 100, // Convert to kobo
            currency: "NGN",
            ref: 'TX-' + Math.floor(Math.random() * 1000000000 + 1), // Unique transaction reference
            callback: function(response) {
                // Send form data to the backend after successful payment
                fetch("http://localhost:5500/api/auth/give", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name,
                        email,
                        phonenumber,
                        amount,
                        givingtype,
                        choose,
                        transactionRef: response.reference // Store transaction reference
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.status === "Success") {
                        alert("Payment successful! Data saved.");
                        window.location.reload();
                    } else {
                        alert("Data saving failed: " + data.message);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Something went wrong!");
                });
            },
            onClose: function() {
                alert("Transaction was not completed.");
            }
        });

        handler.openIframe(); // Open Paystack popup
    }

