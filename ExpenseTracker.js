document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");

    let expenses = [];

    // Add Expense
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("expense-name").value.trim();
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value.trim();
        const date = document.getElementById("expense-date").value;

        if (!name || !amount || !category || !date) return;

        const expense = {
            id: Date.now(),
            name,
            amount,
            category,
            date
        };
        expenses.push(expense);

        updateUI();
        expenseForm.reset();
    });

    // Delete Expense
    expenseList.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-delete")) {
            const id = parseInt(e.target.dataset.id);
            expenses = expenses.filter((exp) => exp.id !== id);
            updateUI();
        }
    });

    // Filter Expenses
    filterCategory.addEventListener("change", () => updateUI());

    // Update UI
    function updateUI() {
        const filteredExpenses =
            filterCategory.value === "All" ?
            expenses :
            expenses.filter((exp) => exp.category === filterCategory.value);

        displayExpenses(filteredExpenses);
        calculateTotal(filteredExpenses);
    }

    // Display Expenses in Table
    function displayExpenses(filteredExpenses) {
        expenseList.innerHTML = "";
        filteredExpenses.forEach((exp) => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${exp.name}</td>
        <td>$${exp.amount.toFixed(2)}</td>
        <td>${exp.category}</td>
        <td>${exp.date}</td>
        <td><button data-id="${exp.id}" class='btn btn-sm btn-danger btn-delete'>Delete</button></td>`;
            expenseList.appendChild(row);
        });
    }

    // Calculate Total Amount
    function calculateTotal(filteredExpenses) {
        const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }
});