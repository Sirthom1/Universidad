// Get references to the 'funds' element and the 'toggle-funds' icon element
var funds = document.getElementById('funds'),
    icon = document.getElementById('toggle-funds-icon');
    toggler = document.getElementById('toggle-funds');
    // Initialize variables
    showingFunds = true;
    currentFunds = funds.innerText;
    // Attach click event handler to the icon
    toggler.onclick = function () {
        // Toggle visibility of funds
        if(showingFunds) {
            // Hide funds and change icon to show hidden funds
            funds.innerText = "●●●"
            icon.className = 'fa fa-2x fa-eye';
            showingFunds = false;
        } else {
            // Show funds and change icon to hide funds
            funds.innerText = currentFunds
            icon.className = 'fa fa-2x fa-eye-slash';
            showingFunds = true;
        }

    }

// Function to search for a cookie
function getCookie(name) {
    var cookieValue = null;
    // Check if there are cookies and they are not empty
    if (document.cookie && document.cookie !== '') {
        // Split the cookies into an array
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            // Clean up the cookie value by removing whitespace
            var cookie = cookies[i].trim();
            // Check if the cookie starts with the desired name followed by '='
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                // Get the cookie value and decode it
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                // Break the loop as the desired cookie has been found
                break;
            }
        }
    }

    // Return the cookie value or null if none was found
    return cookieValue;
}

// Function to translate the category to spanish
function translateCategory(category) {
    if (category == "home") {
        return "Hogar";
    }
    if (category == "entertainment") {
        return "Entretenimiento";
    }
    if (category == "transfer") {
        return "Transferencia";
    }
    if (category == "others") {
        return "Otros";
    }
    return category;
}

// Function that displays transactions when filters are applied
function submitFilterForm() {
    // Get the values of the filters
    var category = document.getElementById('filter_category').value;
    var dateFrom = document.getElementById('date_from').value;
    var dateTo = document.getElementById('date_to').value;
    // The url of the page that will filter the transactions
    var filterUrl = document.getElementById('filter_form').getAttribute('data-filter-url');
    // Apply the filters
    fetch(filterUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({ category: category, date_from: dateFrom, date_to: dateTo })
    })
        .then(response => response.json())
        .then(data => {

            // Get filtered transactions and store their ids.
            let filtered_transactions = JSON.parse(data.transactions);
            let filtered_ids = [];
            for (transaction of filtered_transactions) {
                filtered_ids.push(transaction.pk);
            }
      
            // Go through ALl transactions and hide the ones that don't match the filter.
            var current_transactions = document.getElementsByClassName("transaction");
            for (var i = 0; i < current_transactions.length; i++) {
                current_transactions[i].style.display = "";

                // Check if the id exists in the filtered transactions.
                // This works because the div id matches the id in the database.
                this_id = parseInt(current_transactions[i].id);
                console.log(current_transactions[i].style.display);
                if (!filtered_ids.includes(this_id)) {
                    current_transactions[i].style.display = "none";
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function that Format the number with thousands separators
function formatNumber(number) {
    // Format the number with thousands separators using the 'es-ES' locale
    return number.toLocaleString('es-ES', { useGrouping: true });
}

// This event will format the numbers that shows in the page using the formatNumber function
document.addEventListener('DOMContentLoaded', function () {
    // Select all elements with the class 'formatted-amount'
    var amountElements = document.querySelectorAll('.formatted-amount');
    // Iterate over each element
    amountElements.forEach(function (element) {
        // Get the numeric value from the element's text content
        var amount = parseFloat(element.textContent);
        // Format the number and update the element's text content
        element.textContent = formatNumber(amount);
    });
});

// Function that show an alert when a transaction want to be delete, using sweetalert2
function confirmDelete(button) {
    // Get the transaction ID and delete URL from the button's data attributes
    var transactionId = button.getAttribute('data-transaction-id');
    var deleteUrl = button.getAttribute('data-delete-url');
    // Show a confirmation dialog using SweetAlert library
    Swal.fire({
        title: '¿Estas seguro que quieres eliminar la transacción?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, quiero eliminarla',
        cancelButtonText: 'No, quiero mantenerla',
        confirmButtonColor: '#f7505a',
        cancelButtonColor: '#f7505a',
    }).then((result) => {
        if (result.isConfirmed) {
            // code to execute if the action is confirmed ("Sí, quiero eliminarla").
            deleteTransaction(transactionId, deleteUrl);
        } else {
            //If choose "No, quiero mantenerla", it stays on the same page.
        }
    });
}

// Function that delete a transaction
function deleteTransaction(transactionId, deleteUrl) {
    // Get the CSRF token from the cookie
    const csrftoken = getCookie('csrftoken');

    // Send an AJAX request to delete the transaction
    $.ajax({
        url: deleteUrl,
        type: "POST",
        headers: { "X-CSRFToken": csrftoken },  // Incluir el token CSRF como encabezado
        success: function () {
            // Redirect to the transactions page after deletion
            window.location.href = "/";
        },
        error: function () {
            // Handle any errors that occur during deletion
            alert("Ocurrió un error al eliminar la transacción.");
        }
    });
}

var filter_toggle = document.getElementById("toggle-filter");
var filter = document.getElementById("filter");
filter.style.display = "none";
var caret_up = document.getElementById("caret-up");
var caret_down = document.getElementById("caret-down");
// Toggles visibility of filters on click.
filter_toggle.onclick = function () {
    if (filter.style.display == "none") {
        filter.style.display = "inline";
        caret_up.style.display = "inline";
        caret_down.style.display = "none";
    }
    else {
        
        filter.style.display = "none";
        caret_up.style.display = "none";
        caret_down.style.display = "inline";
    }
}

