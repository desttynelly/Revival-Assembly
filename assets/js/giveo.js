

    function payWithPaystack() {
        // Get form data
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phonenumber = document.getElementById("number").value;
        let amount = document.getElementById("amount").value;
        let givingtype = document.getElementById("type").value;
        let choose = document.getElementById("choose").value;

        // Validate inputs
        if (!name || !email || !amount || givingtype || choose) {
          
        }

        let handler = PaystackPop.setup({
            key: 'pk_test_a174f4bbd7c96ddafef3066dc671345cbd14c0f4', // Replace with your Paystack public key
            email: email,
            amount: amount * 100, // Convert to kobo
            currency: "NGN",
            ref: 'TX-' + Math.floor(Math.random() * 1000000000 + 1), // Unique transaction reference
            callback: function(response) {
                // Send form data to the backend after successful payment
                fetch("/api/auth/give", {
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
                        window.location.href = window.location.href; // Navigate back to the same page
                    } else {
                        alert("Data saving failed: " + data.message);
                    }
                })
                .catch(error => {
                    window.location.href = window.location.href; // Navigate back to the same page
                });

            },
            onClose: function() {
                alert("Transaction was not completed.");
            }
        });

        handler.openIframe(); // Open Paystack popup
    }