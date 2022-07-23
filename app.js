// Selectors
const nameInput = document.querySelector("#name-input");
const dateInput = document.querySelector("#date-input");
const costInput = document.querySelector("#cost-input");
const tbody = document.querySelector("tbody");
const addButton = document.querySelector("#add-button");
const defaultTable = document.querySelector(".table-secondary");

let expenses = [];

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    getExpenses();
    expenseCheck();
});
addButton.addEventListener("click", beforeAddExpense);
tbody.addEventListener("click", deleteExpense);

// Functions
function beforeAddExpense(e) {
    e.preventDefault();
    if (isNaN(costInput.value)) {
        alert("Please only enter numbers in the cost input!");
    } else {
        if (nameInput.value == "" || costInput.value == "") {
            alert("Please fill out at least the Name & Cost!");
        } else {
            if (expenses.length !== 0) {
                const newExpense = {
                    name: nameInput.value || "n/a",
                    date: dateInput.value || "n/a",
                    cost: costInput.value || "n/a",
                };
                console.log(newExpense);
                for (i = 0; i < expenses.length; i++) {
                    console.log(i);
                    if (
                        expenses[i].name == newExpense.name &&
                        expenses[i].date == newExpense.date &&
                        expenses[i].cost == newExpense.cost
                    ) {
                        alert("You already have that expense, please make it unique!");
                        break;
                    } else {
                        addExpense();
                        break;
                    }
                }
            } else {
                addExpense();
            }
        }
    }
}

function addExpense() {
    const tr = document.createElement("tr");
    const name = document.createElement("td");
    name.innerText = !nameInput.value == "" ? nameInput.value : "n/a";
    const date = document.createElement("td");
    date.innerText = !dateInput.value == "" ? dateInput.value : "n/a";
    const cost = document.createElement("td");
    cost.innerText = !costInput.value == "" ? costInput.value : "n/a";

    tr.appendChild(name);
    tr.appendChild(date);
    tr.appendChild(cost);

    tbody.appendChild(tr);

    const newExpense = {
        name: !nameInput.value == "" ? nameInput.value : "n/a",
        date: !dateInput.value == "" ? dateInput.value : "n/a",
        cost: !costInput.value == "" ? costInput.value : "n/a",
    };

    expenses.push(newExpense);

    updateLocalExpenses();
    expenseCheck();

    nameInput.value = "";
    dateInput.value = "";
    costInput.value = "";
}

function deleteExpense(e) {
    if (e.target.nodeName == "TD" && e.target.id == "") {
        let expenseList = e.target.parentNode.children;
        for (i = 0; i < expenses.length; i++) {
            if (
                expenses[i].name == expenseList[0].innerText &&
                expenses[i].date == expenseList[1].innerText &&
                expenses[i].cost == expenseList[2].innerText
            ) {
                const expenseIndex = i;
                expenses.splice(expenseIndex, 1);
                break;
            }
        }
        e.target.parentNode.remove();
        updateLocalExpenses();
        expenseCheck();
    }
}

function expenseCheck() {
    if (!expenses.length == 0) {
        defaultTable.style.visibility = "collapse";
    } else {
        defaultTable.style.visibility = "visible";
    }
}

function updateLocalExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function getExpenses() {
    if (localStorage.getItem("expenses") === null) {
        return;
    } else {
        expenses = JSON.parse(localStorage.getItem("expenses"));
    }
    console.log(expenses);

    expenses.forEach((expense) => {
        const tr = document.createElement("tr");
        const name = document.createElement("td");
        name.innerText = expense.name;
        const date = document.createElement("td");
        date.innerText = expense.date;
        const cost = document.createElement("td");
        cost.innerText = expense.cost;

        tr.appendChild(name);
        tr.appendChild(date);
        tr.appendChild(cost);

        tbody.appendChild(tr);
    });
}
