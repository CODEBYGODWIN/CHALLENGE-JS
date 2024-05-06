import itemCtrl from './itemCtrl.js';
import UICtrl from './UICtrl.js';

const App = (function(itemCtrl, UICtrl){
    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors();
        const saveBtn = document.querySelector(UISelectors.saveBtn);
        const incomeBtn = document.querySelector(UISelectors.incomeBtn);
        const expenseBtn = document.querySelector(UISelectors.expenseBtn);
        const itemsContainer = document.querySelector(UISelectors.itemsContainer);
    
        if (saveBtn) {
            saveBtn.addEventListener('click', saveData);
        }
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
    

    const addIncome = function(){
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();
        if(description.descriptionInput !=='' && amount.amountInput !== ''){
            const newMoney = itemCtrl.addMoney(description.descriptionInput, amount.amountInput, 'income');
            UICtrl.addIncomeItem(newMoney);
            UICtrl.clearInputs();
            UICtrl.updateEarned();
            UICtrl.updateAvailable();
            saveDataLocally(); // Ajout : sauvegarde les données localement
        }
    }

    const addExpense = function(){
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();
        if(description.descriptionInput !=='' && amount.amountInput !== ''){
            const newMoney = itemCtrl.addMoney(description.descriptionInput, amount.amountInput, 'expense');
            UICtrl.addExpenseItem(newMoney);
            UICtrl.clearInputs();
            UICtrl.updateSpent();
            UICtrl.updateAvailable();
            saveDataLocally(); // Ajout : sauvegarde les données localement
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
    
        // Supprimer l'élément des revenus s'il est trouvé
        budgetData.incomes = budgetData.incomes.filter(item => item.id !== id);
        // Supprimer l'élément des dépenses s'il est trouvé
        budgetData.expenses = budgetData.expenses.filter(item => item.id !== id);
    
        localStorage.setItem(`budgetData-${userEmail}`, JSON.stringify(budgetData));
    };
    // Ajout : Fonction pour sauvegarder les données localement
    // Fonction pour sauvegarder les données localement
    // Fonction pour sauvegarder les données localement
    // Fonction pour sauvegarder les données localement
    const saveDataLocally = function(){
        const incomes = itemCtrl.getIncomes();
        const expenses = itemCtrl.getExpenses();
    
        const userEmail = localStorage.getItem('userEmail');
        const existingData = localStorage.getItem(`budgetData-${userEmail}`);
    
        let newData = { incomes: [], expenses: [] };
    
        if (existingData) {
            const parsedData = JSON.parse(existingData);
            
            // Filtrer les nouveaux revenus pour ne garder que ceux qui ne sont pas déjà présents
            const newIncomes = incomes.filter(income => !parsedData.incomes.some(existingIncome => existingIncome.id === income.id));
            
            // Filtrer les nouvelles dépenses pour ne garder que celles qui ne sont pas déjà présentes
            const newExpenses = expenses.filter(expense => !parsedData.expenses.some(existingExpense => existingExpense.id === expense.id));
            
            // Fusionner les données existantes avec les nouvelles données filtrées
            newData.incomes = parsedData.incomes.concat(newIncomes);
            newData.expenses = parsedData.expenses.concat(newExpenses);
        } else {
            newData = { incomes: incomes, expenses: expenses };
        }
    
        localStorage.setItem(`budgetData-${userEmail}`, JSON.stringify(newData));
    };
    
    
    
    
    // Ajout : Fonction pour charger les données localement
    const loadDataLocally = function(){
        const userEmail = localStorage.getItem('userEmail'); // Récupérer l'email de l'utilisateur
        const budgetData = localStorage.getItem(`budgetData-${userEmail}`); // Utiliser l'email comme clé
        if(budgetData){
            const data = JSON.parse(budgetData);
            // Charger les données dans l'interface utilisateur
            UICtrl.populateItemList(data.incomes, data.expenses);
        }
    };

    const saveData = function() {
        saveDataLocally();
        // Possibilité d'ajouter une logique supplémentaire ici, comme l'envoi des données au serveur
        alert('Données sauvegardées avec succès !');
    };

    return{
        init: function(){
            loadDataLocally(); // Ajout : chargement des données locales
            loadEventListeners();
        }
    }

})(itemCtrl, UICtrl);

App.init();