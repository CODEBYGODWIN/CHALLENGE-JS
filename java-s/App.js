import itemCtrl from './itemCtrl.js';
import UICtrl from './UICtrl.js';

// CONTRÔLEUR DE L'APPLICATION
const App = (function(itemCtrl, UICtrl){
    // Écouteurs d'événements
    const loadEventListeners = function(){
        // Obtenir les sélecteurs d'interface utilisateur
        const UISelectors = UICtrl.getSelectors();
        // Mettre à jour les options de sous-catégorie en fonction de la catégorie sélectionnée
        document.querySelector(UISelectors.category).addEventListener('change', categoryChange);
        document.querySelector(UISelectors.incomeBtn).addEventListener('click', addIncome);
        document.querySelector(UISelectors.expenseBtn).addEventListener('click', addExpense);
        document.querySelector(UISelectors.itemsContainer).addEventListener('click', deleteItem);
    }

    // Mettre à jour les options de sous-catégorie en fonction de la catégorie sélectionnée
    const categoryChange = function(){
        const selectedCategory = UICtrl.getCategoryInput().categoryInput;
        UICtrl.updateSubCategoryOptions(selectedCategory);
    }

    // Ajouter un nouveau revenu
    const addIncome = function(){
        // Obtenir les valeurs de la description, du montant, de la catégorie et de la sous-catégorie
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();
        const category = UICtrl.getCategoryInput();
        const subCategory = UICtrl.getSubCategoryInput();
        // Si les champs ne sont pas vides
        if(description.descriptionInput !=='' && amount.amountInput !== '' && category.categoryInput !== '' && subCategory.subCategoryInput !== ''){
            // Ajouter un nouvel article
            const newMoney = itemCtrl.addMoney(description.descriptionInput, amount.amountInput, category.categoryInput, subCategory.subCategoryInput);
            // Ajouter l'article à la liste
            UICtrl.addIncomeItem(newMoney);
            UICtrl.clearInputs();
            UICtrl.updateSpent();
            UICtrl.updateEarned();
            UICtrl.updateAvailable();
        }
    }

    // Ajouter une nouvelle dépense
    const addExpense = function(){
        // Obtenir les valeurs de la description, du montant, de la catégorie et de la sous-catégorie
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();
        const category = UICtrl.getCategoryInput();
        const subCategory = UICtrl.getSubCategoryInput();

        // Si les champs ne sont pas vides
        if(description.descriptionInput !=='' && amount.amountInput !== '' && category.categoryInput !== '' && subCategory.subCategoryInput !== ''){
            const newMoney = itemCtrl.addMoney(description.descriptionInput, amount.amountInput, category.categoryInput, subCategory.subCategoryInput);
            // Ajouter l'article à la liste
            UICtrl.addExpenseItem(newMoney);
            UICtrl.clearInputs();
            UICtrl.updateSpent();
            UICtrl.updateEarned();
            UICtrl.updateAvailable();
        }
    }

    // Supprimer un article de la liste d'articles de l'interface utilisateur.
    const deleteItem = function(e){
        if(e.target.classList.contains('fa-trash-alt')){
            // Obtenir le numéro d'identifiant
            const id = itemCtrl.getIdNumber(e.target);
            // Supprimer le montant de l'interface utilisateur
            UICtrl.deleteAmount(id);
            itemCtrl.deleteAmountArr(id);
            UICtrl.updateSpent();
            UICtrl.updateEarned();
            UICtrl.updateAvailable();
        }

        e.preventDefault();
    }

    // Fonction d'initialisation il ettre à jour les options de catégorie et afficher les données dans la console
    return{
        init: function(){
            UICtrl.updateCategoryOptions();
            loadEventListeners();
            console.log(itemCtrl.logData());
        }
    }

})(itemCtrl, UICtrl);

// Initialiser l'application
App.init();