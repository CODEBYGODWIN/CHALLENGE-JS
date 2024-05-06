
// CONTRÔLEUR DE L'INTERFACE UTILISATEUR
const UICtrl = (function(){

    const categories = { "Dépenses courant": ["Alimentation", "Transport"], 
        "Dépense personnelles" : ["Vétements et accessoires", "Soins personnels"]

    };
    
    // Sélecteurs d'interface utilisateur
    const UISelectors = {
        incomeBtn: '#add__income',
        expenseBtn: '#add__expense',
        description: '#description',
        amount: '#amount',
        moneyEarned: '#amount__earned',
        moneyAvailable: '#amount__available',
        moneySpent: '#amount__spent',
        incomeList: '#income__container',
        expensesList: '#expenses__container',
        incomeItem: '.income__amount',
        expenseItem: '.expense__amount',
        itemsContainer: '.items__container'
        // categoryList: `#category`,
        //subcategoryList: `#subcategory`
    }
    // Méthodes publiques
    return{
        // Fonction pour obtenir les sélecteurs d'interface utilisateur
        getSelectors: function(){
            return UISelectors;
        },
        // Fonction pour obtenir la valeur de la description
        getDescriptionInput: function(){
            return {
                descriptionInput: document.querySelector(UISelectors.description).value
            };
        },
        // Fonction pour obtenir la valeur du montant
        getValueInput: function(){
            return{
                amountInput: document.querySelector(UISelectors.amount).value
            };
        },

        // Fonction pour obtenir la valeur de la date
        getDateInput: function(){
            return{
                dateInput: new Date(document.querySelector('#date').value)
            };
        },
        //Fonction pour obtenir le choix d'utilisateur 
        getCategories: function(){
            return categories;
        },


        // Fonction pour ajouter un élément de revenu à l'interface utilisateur
        addIncomeItem: function(item){
            // Créer une nouvelle section
            const section = document.createElement('section');
            // Ajouter une classe
            section.classList = 'item income';
            // Ajouter un identifiant à l'élément
            section.id = `item-${item.id}`;
            // Ajouter du HTML
            section.innerHTML = `
            <h4>${item.description}</h4>
            <section class="item__income">
                <p class="symbol">$</p>
                <span class="income__amount">${item.amount}</span>
                <p class="date">${item.date.toLocaleDateString()}</p>
            </section>
            <i class="far fa-trash-alt"></i>
            `;
            // Insérer le revenu dans la liste
            document.querySelector(UISelectors.incomeList).insertAdjacentElement('beforeend', section);
        },
        // Fonction pour effacer les champs de saisie
        clearInputs: function(){
            document.querySelector(UISelectors.description).value = '';
            document.querySelector(UISelectors.amount).value = '';
        },
        // Fonction pour mettre à jour le total des revenus
        updateEarned: function(){
            // Tous les éléments de revenus
            const allIncome = document.querySelectorAll(UISelectors.incomeItem);
            // Tableau avec tous les revenus
            const incomeCount = [...allIncome].map(item => +item.innerHTML);
            // Calculer le total des revenus
            const incomeSum = incomeCount.reduce(function(a,b){
                return a+b;
            },0);
            // Afficher le total des revenus
            const earnedTotal = document.querySelector(UISelectors.moneyEarned);
            earnedTotal.innerHTML = incomeSum.toFixed(2);
        },
        // Fonction pour ajouter un élément de dépense à l'interface utilisateur
        addExpenseItem: function(item){
            // Créer une nouvelle section
            const section = document.createElement('section');
            // Ajouter une classe
            section.classList = 'item expense';
            // Ajouter un identifiant à l'élément
            section.id = `item-${item.id}`;
            // Ajouter du HTML
            section.innerHTML = `
            <h4>${item.description}</h4>
            <section class="item__expense">
                <p class="symbol">$</p>
                <span class="expense__amount">${item.amount}</span>
                <p class="date">${item.date.toLocaleDateString()}</p> 
            </section>
            <i class="far fa-trash-alt"></i>
            `;
            // Insérer la dépense dans la liste
            document.querySelector(UISelectors.expensesList).insertAdjacentElement('beforeend', section);
        },
        // Fonction pour mettre à jour le total des dépenses
        updateSpent: function(){
            // Tous les éléments de dépenses
            const allExpenses = document.querySelectorAll(UISelectors.expenseItem);
            // Tableau avec toutes les dépenses
            const expenseCount = [...allExpenses].map(item => +item.innerHTML);
            // Calculer le total
            const expenseSum = expenseCount.reduce(function(a, b){
                return a+b;
            },0);
            // Afficher le total des dépenses
            const expensesTotal = document.querySelector(UISelectors.moneySpent);
            expensesTotal.innerHTML = expenseSum.toFixed(2);
        },
        // Fonction pour mettre à jour le solde disponible
        updateAvailable: function(){
            const earned = document.querySelector(UISelectors.moneyEarned);
            const spent = document.querySelector(UISelectors.moneySpent);
            const available = document.querySelector(UISelectors.moneyAvailable);
            available.innerHTML = (parseFloat(earned.innerHTML) - parseFloat(spent.innerHTML)).toFixed(2);
        },
        // Fonction pour supprimer un montant de l'interface utilisateur
        deleteAmount: function(id){
            // Créer l'identifiant à sélectionner
            const amountId = `#item-${id}`;
            // Sélectionner le montant avec l'identifiant passé
            const amountDelete = document.querySelector(amountId);
            // Supprimer de l'interface utilisateur
            if(amountDelete) {
                amountDelete.remove();
            }
        }
        // function pour ajouter les options des catégories et sous-catégories
        // addCategories: function(){
        //     const categorySelect = document.querySelector(UISelectors.categoryList);
        //     const subcategorySelect = document.querySelector(UISelectors.subcategoryList);





        // }.





    }
})();

export default UICtrl;
