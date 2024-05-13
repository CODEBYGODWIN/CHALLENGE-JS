// CONTRÔLEUR DE L'INTERFACE UTILISATEUR
const UICtrl = (function(){

    // Sélecteurs d'interface utilisateur
    const UISelectors = {
        incomeBtn: '#add__income',
        expenseBtn: '#add__expense',
        description: '#description',
        amount: '#amount',
        category: '#category',
        subCategory: '#subCategory',
        moneyEarned: '#amount__earned',
        moneyAvailable: '#amount__available',
        moneySpent: '#amount__spent',
        incomeList: '#income__container',
        expensesList: '#expenses__container',
        incomeItem: '.income__amount',
        expenseItem: '.expense__amount',
        itemsContainer: '.items__container'
        
    }

    // Liste des catégories et sous-catégories
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
        // Fonction pour obtenir la valeur de la catégorie
        getCategoryInput: function(){
            return{
                categoryInput: document.querySelector(UISelectors.category).value
            };
        },
        // Fonction pour obtenir la valeur de la sous-catégorie
        getSubCategoryInput: function(){
            return{
                subCategoryInput: document.querySelector(UISelectors.subCategory).value
            };
        },
        // Fonction pour obtenir la valeur de la date
        getDateInput: function(){
            return{
                 dateInput: document.querySelector('#date').value
                };
        },
        
        // Fonction pour obtenir la liste des catégories
        getCategories: function(){
            return categories;
        },
        // Fonction pour mettre à jour les options de catégorie
        updateCategoryOptions: function(){
            const categorySelect = document.querySelector(UISelectors.category);
            let optionsHTML = '';
            for(let category in categories){
                optionsHTML += `<option value="${category}">${category}</option>`;
            }
            categorySelect.innerHTML = optionsHTML;
        },
        // Fonction pour mettre à jour les options de sous-catégorie
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
        // Fonction pour ajouter un élément de revenu à l'interface utilisateur
        addIncomeItem: function(item){
            // Créer une nouvelle div
            const div = document.createElement('div');
            // Ajouter une classe
            div.classList = 'item income';
            // Ajouter un identifiant à l'élément
            div.id = `item-${item.id}`;
            // Ajouter du HTML
            div.innerHTML = `
            <h4>${item.description}</h4>
            <div class="item__income">
                <p class="symbol">$</p>
                <span class="income__amount">${item.amount}</span>
                <p class="date">${item.date.toLocaleDateString()}</p>
                <p class="category">${item.category}</p>
                <p class="subCategory">${item.subCategory}</p>
            </div>
            <i class="far fa-trash-alt"></i>`;
            // Insérer le revenu dans la liste
            document.querySelector(UISelectors.incomeList).insertAdjacentElement('beforeend', div);
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
            // Créer une nouvelle div
            const div = document.createElement('div');
            // Ajouter une classe
            div.classList = 'item expense';
            // Ajouter un identifiant à l'élément
            div.id = `item-${item.id}`;
            // Ajouter du HTML
            div.innerHTML = `
             <h4>${item.description}</h4>
             <div class="item__expense">
                 <p class="symbol">$</p>
                 <span class="expense__amount">${item.amount}</span>
                 <p class="date">${item.date.toLocaleDateString()}</p> 
                 <p class="category">${item.category}</p>
                 <p class="subCategory">${item.subCategory}</p>
             </div>
             <i class="far fa-trash-alt"></i>
             `;
            // Insérer la dépense dans la liste
            document.querySelector(UISelectors.expensesList).insertAdjacentElement('beforeend', div);
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
    }
    
})()

export default UICtrl;