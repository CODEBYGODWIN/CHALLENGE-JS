const UICtrl = (function(){

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
        itemsContainer: '.items__container',
        category: '#category',
        subCategory: '#subCategory'
    }

    const categories = {
        "Revenus": ["Salaire", "Prestations", "Ventes", "Autres revenus"],
        "Alimentation" : ["Restaurants", "Épicerie", "Fast-food", "Cafés"],
        "Transport" : ["Essence", "Transport en commun", "Taxi/VTC", "Location de voiture"],
        "Logement": ["Loyers", "Hypothèque", "Factures d'électricité", "Factures d'eau", "Factures d'internet"],
        "Loisirs": ["Cinéma", "Sorties", "Abonnements", "Vacances"],
        "Santé": ["Médecin", "Pharmacie", "Assurance santé", "Soins dentaires"],
        "Vêtements": ["Vêtements", "Chaussures", "Accessoires"],
        "Éducation" : ["Frais de scolarité", "Livres et fournitures", "Cours particuliers"],
        "Famille" : ["Garderie", "Jouets", "Vêtements pour enfants"],
        "Services" : ["Téléphone portable", "Internet", "Assurances"],
        "Autres" : ["Divers", "Dépenses imprévues"],
        "Épargne et investissement": ["Épargne d'urgence", "Épargne pour les objectifs à court terme", "Épargne pour les objectifs à long terme", "Investissements"],
        "Dépenses liées aux finances": ["Remboursement de prêts", "Frais bancaires", "Investissements"],
        
    };
    // Retourne les sélecteurs HTML
    return{
        getSelectors: function(){
            return UISelectors;
        },
        // Récupère la description de l'utilisateur
        getDescriptionInput: function(){
            return {
                descriptionInput: document.querySelector(UISelectors.description).value
            };
        },
        // Récupère le montant entré par l'utilisateur
        getValueInput: function(){
            return{
                amountInput: document.querySelector(UISelectors.amount).value
            };
        },
        // Récupère la date entrée par l'utilisateur
        getDateInput: function(){
            return{
                dateInput: new Date(document.querySelector('#date').value).toLocaleDateString('fr-FR')
            };
        },
        // Récupère la catégorie sélectionnée par l'utilisateur
        getCategoryInput: function(){
            return{
                categoryInput: document.querySelector(UISelectors.category).value
            };
        },
        // Récupère la sous-catégorie sélectionnée par l'utilisateur
        getSubCategoryInput: function(){
            return{
                subCategoryInput: document.querySelector(UISelectors.subCategory).value
            };
        },
        // Récupère toutes les catégories disponibles
        getCategories: function(){
            return categories;
        },
        // Ajoute un revenu à l'interface utilisateur
        addIncomeItem: function(item){
            const div = document.createElement('div');
            div.classList = 'item income';
            div.id = `item-${item.id}`;
            div.innerHTML = `
            <h4>${item.description}</h4>
            <div class="item__income">
                <p>montant : <span class="income__amount">${item.amount}</span> €</p>
                <p class="date">Date : ${item.date instanceof Date ? item.date.toLocaleDateString() : item.date}</p>
                <p class="category">Catégorie : ${item.category}</p>
                <p class="subCategory">sous-catégorie : ${item.subCategory}</p>
            </div>
            <i class="far fa-trash-alt"></i>`;
            document.querySelector(UISelectors.incomeList).insertAdjacentElement('beforeend', div);
        },
        // Ajoute une dépense à l'interface utilisateur
        addExpenseItem: function(item){
            const div = document.createElement('div');
            div.classList = 'item expense';
            div.id = `item-${item.id}`;
            div.innerHTML = `
            <h4>${item.description}</h4>
            <div class="item__expense">
                <p>montant : <span class="expense__amount">${item.amount}</span> €</p>
                <p class="date">Date : ${item.date instanceof Date ? item.date.toLocaleDateString() : item.date}</p>
                <p class="category">Catégorie : ${item.category}</p>
                <p class="subCategory">sous-catégorie : ${item.subCategory}</p>
            </div>
            <i class="far fa-trash-alt"></i>`;
            document.querySelector(UISelectors.expensesList).insertAdjacentElement('beforeend', div);
        },
        // Remplit la liste des revenus et des dépenses
        populateItemList: function(incomes, expenses){
            incomes.forEach(function(income) {
                if (income.type === 'income') {
                    UICtrl.addIncomeItem(income);
                }
            });

            expenses.forEach(function(expense) {
                if (expense.type === 'expense') {
                    UICtrl.addExpenseItem(expense);
                }
            });

            UICtrl.updateSpent();
            UICtrl.updateAvailable();
            UICtrl.updateEarned();
        },
        // Met à jour les options de la liste déroulante des catégories
        updateCategoryOptions: function(){
            const categorySelect = document.querySelector(UISelectors.category);
            let optionsHTML = '';
            for(const category in categories){
                optionsHTML += `<option value="${category}">${category}</option>`;
            }
            categorySelect.innerHTML = optionsHTML;
        },
        // Met à jour les options de la liste déroulante des sous-catégories en fonction de la catégorie sélectionnée
        updateSubCategoryOptions: function(selectedCategory){
            const subCategorySelect = document.querySelector(UISelectors.subCategory);
            const subCategories = categories[selectedCategory];
            let optionsHTML = '';
            if(subCategories){
                subCategories.forEach(subCategory => {
                    optionsHTML += `<option value="${subCategory}">${subCategory}</option>`;
                });
            }
            subCategorySelect.innerHTML = optionsHTML;
        },
        // Efface les champs de saisie
        clearInputs: function(){
            document.querySelector(UISelectors.description).value = '';
            document.querySelector(UISelectors.amount).value = '';
        },
        // Met à jour le total des revenus
        updateEarned: function(){
            const allIncome = document.querySelectorAll(UISelectors.incomeItem);
            const incomeCount = [...allIncome].map(item => +item.innerHTML);
            const incomeSum = incomeCount.reduce(function(a,b){
                return a+b;
            },0);
            const earnedTotal = document.querySelector(UISelectors.moneyEarned);
            earnedTotal.innerHTML = incomeSum.toFixed(2);
        },
        // Met à jour le total des dépenses
        updateSpent: function(){
            const allExpenses = document.querySelectorAll(UISelectors.expenseItem);
            const expenseCount = [...allExpenses].map(item => +item.innerHTML);
            const expenseSum = expenseCount.reduce(function(a, b){
                return a+b;
            },0);
            const expensesTotal = document.querySelector(UISelectors.moneySpent);
            expensesTotal.innerHTML = expenseSum.toFixed(2);
        },
        // Met à jour le solde disponible
        updateAvailable: function(){
            const earned = document.querySelector(UISelectors.moneyEarned);
            const spent = document.querySelector(UISelectors.moneySpent);
            const available = document.querySelector(UISelectors.moneyAvailable);
            available.innerHTML = (parseFloat(earned.innerHTML) - parseFloat(spent.innerHTML)).toFixed(2);
        },
        // Supprime un revenu ou une dépense de l'interface utilisateur
        deleteAmount: function(id){
            const amountId = `#item-${id}`;
            const amountDelete = document.querySelector(amountId);
            if(amountDelete) {
                amountDelete.remove();
            }
        }
    }
})();

export default UICtrl;
