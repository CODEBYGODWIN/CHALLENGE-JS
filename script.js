// Function to add expense 
function addExpense(event) { 
	event.preventDefault(); 

	// Get expense name and amount from form 
	const expenseNameInput = document.getElementById("expense-name"); 
	const expenseAmountInput = document.getElementById("expense-amount"); 
	const expenseName = expenseNameInput.value; 
	const expenseAmount = parseFloat(expenseAmountInput.value); 

	// Clear form inputs 
	expenseNameInput.value = ""; 
	expenseAmountInput.value = ""; 

	// Validate inputs 
	if (expenseName === "" || isNaN(expenseAmount)) { 
		alert("Please enter valid expense details."); 
		return; 
	} 
    // Create new expense object 
	const expense = { 
		name: expenseName, 
		amount: expenseAmount, 
	}; 

	// Add expense to expenses array 
	expense.push(expense); 

	
}