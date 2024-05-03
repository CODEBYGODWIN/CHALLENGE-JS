import itemCtrl from './itemCtrl.js';
import UICtrl from './UICtrl.js';


// CONTRÔLEUR DE L'APPLICATION
const App = (function(itemCtrl, UICtrl){
    // Écouteurs d'événements
    const loadEventListeners = function(){
        // Obtenir les sélecteurs d'interface utilisateur
        const UISelectors = UICtrl.getSelectors();
        // Ajouter un nouveau revenu
        document.querySelector(UISelectors.incomeBtn).addEventListener('click', addIncome);
        // Ajouter une nouvelle dépense
        document.querySelector(UISelectors.expenseBtn).addEventListener('click', addExpense);
        // Supprimer un article
        document.querySelector(UISelectors.itemsContainer).addEventListener('click', deleteItem);
    }

    // Ajouter un nouveau revenu
    const addIncome = function(){
        // Obtenir les valeurs de la description et du montant
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();
        // Si les champs ne sont pas vides
        if(description.descriptionInput !=='' && amount.amountInput !== ''){
            // Ajouter un nouvel article
            const newMoney = itemCtrl.addMoney(description.descriptionInput, amount.amountInput);
            // Ajouter l'article à la liste
            UICtrl.addIncomeItem(newMoney);
            // Effacer les champs de saisie
            UICtrl.clearInputs();
            // Mettre à jour le total des revenus
            UICtrl.updateEarned();
            // Calculer le solde disponible
            UICtrl.updateAvailable();
        }
    }

    // Ajouter une nouvelle dépense
    const addExpense = function(){
        // Obtenir les valeurs de la description et du montant
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();
        // Si les champs ne sont pas vides
        if(description.descriptionInput !=='' && amount.amountInput !== ''){
            // Ajouter un nouvel article
            const newMoney = itemCtrl.addMoney(description.descriptionInput, amount.amountInput);
            // Ajouter l'article à la liste
            UICtrl.addExpenseItem(newMoney);
            // Effacer les champs de saisie
            UICtrl.clearInputs();
            // Mettre à jour le total des dépenses
            UICtrl.updateSpent();
            // Calculer le solde disponible
            UICtrl.updateAvailable();
        }
    }

    // Supprimer un article
    const deleteItem = function(e){
        if(e.target.classList.contains('fa-trash-alt')){
            // Obtenir le numéro d'identifiant
            const id = itemCtrl.getIdNumber(e.target);
            // Supprimer le montant de l'interface utilisateur
            UICtrl.deleteAmount(id);
            // Supprimer le montant des données
            itemCtrl.deleteAmountArr(id);
            // Mettre à jour le total des revenus
            UICtrl.updateEarned();
            // Mettre à jour le total des dépenses
            UICtrl.updateSpent();
            // Calculer le solde disponible
            UICtrl.updateAvailable();
        }

        e.preventDefault();
    }

    // Fonction d'initialisation
    return{
        init: function(){
            loadEventListeners();
            // Afficher les données dans la console
            console.log(itemCtrl.logData());
        }
    }

})(itemCtrl, UICtrl);

// Initialiser l'application
App.init();
