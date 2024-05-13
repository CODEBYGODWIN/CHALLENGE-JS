import itemCtrl from './itemCtrl.js';
import UICtrl from './UICtrl.js';

const App = (function(itemCtrl, UICtrl){
    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors();
        const incomeBtn = document.querySelector(UISelectors.incomeBtn);
        const expenseBtn = document.querySelector(UISelectors.expenseBtn);
        const itemsContainer = document.querySelector(UISelectors.itemsContainer);
        document.querySelector(UISelectors.itemsContainer).addEventListener('click', deleteItem);
        document.querySelector(UISelectors.category).addEventListener('change', categoryChange);
    
        if (incomeBtn) {
            incomeBtn.addEventListener('click', addIncome);
        }
        if (expenseBtn) {
            expenseBtn.addEventListener('click', addExpense);
        }
        if (itemsContainer) {
            itemsContainer.addEventListener('click', deleteItem);
        }
    };

    const categoryChange = function(){
        const selectedCategory = UICtrl.getCategoryInput().categoryInput;
        UICtrl.updateSubCategoryOptions(selectedCategory);
    }
    
    const addIncome = function(){
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();
        const category = UICtrl.getCategoryInput();
        const subCategory = UICtrl.getSubCategoryInput();
        if(description.descriptionInput !=='' && amount.amountInput !== ''){
            const newMoney = itemCtrl.addMoney(description.descriptionInput, amount.amountInput, 'income', category.categoryInput, subCategory.subCategoryInput);
            UICtrl.addIncomeItem(newMoney);
            UICtrl.clearInputs();
            UICtrl.updateEarned();
            UICtrl.updateAvailable();
            saveDataLocally();
        }
    }

    const addExpense = function(){
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();
        const category = UICtrl.getCategoryInput();
        const subCategory = UICtrl.getSubCategoryInput();
        if(description.descriptionInput !=='' && amount.amountInput !== ''){
            const newMoney = itemCtrl.addMoney(description.descriptionInput, amount.amountInput, 'expense', category.categoryInput, subCategory.subCategoryInput);
            UICtrl.addExpenseItem(newMoney);
            UICtrl.clearInputs();
            UICtrl.updateSpent();
            UICtrl.updateAvailable();
            saveDataLocally();
        }
    }

    const deleteItem = function(e){
        if(e.target.classList.contains('fa-trash-alt')){
            const id = itemCtrl.getIdNumber(e.target);
            UICtrl.deleteAmount(id);
            itemCtrl.deleteAmountArr(id);
            UICtrl.updateEarned();
            UICtrl.updateSpent();
            UICtrl.updateAvailable();
            removeItemLocally(id);
        }
        e.preventDefault();
    }

    const removeItemLocally = function(id) {
        const userEmail = localStorage.getItem('userEmail');
        const budgetData = JSON.parse(localStorage.getItem(`budgetData-${userEmail}`));
        budgetData.incomes = budgetData.incomes.filter(item => item.id !== id);
        budgetData.expenses = budgetData.expenses.filter(item => item.id !== id);
        localStorage.setItem(`budgetData-${userEmail}`, JSON.stringify(budgetData));
    };
    
    const saveDataLocally = function(){
        const incomes = itemCtrl.getIncomes();
        const expenses = itemCtrl.getExpenses();
        const userEmail = localStorage.getItem('userEmail');
        const existingData = localStorage.getItem(`budgetData-${userEmail}`);
        let newData = { incomes: [], expenses: [] };
    
        if (existingData) {
            const parsedData = JSON.parse(existingData);
            const newIncomes = incomes.filter(income => !parsedData.incomes.some(existingIncome => existingIncome.id === income.id));
            const newExpenses = expenses.filter(expense => !parsedData.expenses.some(existingExpense => existingExpense.id === expense.id));
            newData.incomes = parsedData.incomes.concat(newIncomes);
            newData.expenses = parsedData.expenses.concat(newExpenses);
        } else {
            newData = { incomes: incomes, expenses: expenses };
        }
        localStorage.setItem(`budgetData-${userEmail}`, JSON.stringify(newData));
    };
    
    const loadDataLocally = function(){
        const userEmail = localStorage.getItem('userEmail');
        const budgetData = localStorage.getItem(`budgetData-${userEmail}`);
        if(budgetData){
            const data = JSON.parse(budgetData);
            UICtrl.populateItemList(data.incomes, data.expenses);
        }
    };

    return{
        init: function(){
            loadDataLocally();
            UICtrl.updateEarned();
            UICtrl.updateSpent();
            UICtrl.updateAvailable();
            UICtrl.updateCategoryOptions();
            loadEventListeners();
        }
    }

})(itemCtrl, UICtrl);

App.init();