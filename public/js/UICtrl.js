const UICtrl = (function(){

    const categories = { "Dépenses courantes": ["Alimentation", "Transport"], 
        "Dépenses personnelles" : ["Vêtements et accessoires", "Soins personnels"]
    };
    
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
    }

    return{
        getSelectors: function(){
            return UISelectors;
        },

        getDescriptionInput: function(){
            return {
                descriptionInput: document.querySelector(UISelectors.description).value
            };
        },

        getValueInput: function(){
            return{
                amountInput: document.querySelector(UISelectors.amount).value
            };
        },

        getDateInput: function(){
            return{
                dateInput: new Date(document.querySelector('#date').value).toLocaleDateString('fr-FR')
            };
        },

        getCategories: function(){
            return categories;
        },

        addIncomeItem: function(item){
            const div = document.createElement('div');
            div.classList = 'item income';
            div.id = `item-${item.id}`;
            div.innerHTML = `
            <h4>${item.description}</h4>
            <div class="item__income">
                <p class="symbol">$</p>
                <span class="income__amount">${item.amount}</span>
                <p class="date">${item.date instanceof Date ? item.date.toLocaleDateString() : item.date}</p>
            </div>
            <i class="far fa-trash-alt"></i>`;
            document.querySelector(UISelectors.incomeList).insertAdjacentElement('beforeend', div);
        },

        addExpenseItem: function(item){
            const div = document.createElement('div');
            div.classList = 'item expense';
            div.id = `item-${item.id}`;
            div.innerHTML = `
            <h4>${item.description}</h4>
            <div class="item__expense">
                <p class="symbol">$</p>
                <span class="expense__amount">${item.amount}</span>
                <p class="date">${item.date instanceof Date ? item.date.toLocaleDateString() : item.date}</p>
            </div>
            <i class="far fa-trash-alt"></i>`;
            document.querySelector(UISelectors.expensesList).insertAdjacentElement('beforeend', div);
        },

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

        clearInputs: function(){
            document.querySelector(UISelectors.description).value = '';
            document.querySelector(UISelectors.amount).value = '';
        },

        updateEarned: function(){
            const allIncome = document.querySelectorAll(UISelectors.incomeItem);
            const incomeCount = [...allIncome].map(item => +item.innerHTML);
            const incomeSum = incomeCount.reduce(function(a,b){
                return a+b;
            },0);
            const earnedTotal = document.querySelector(UISelectors.moneyEarned);
            earnedTotal.innerHTML = incomeSum.toFixed(2);
        },

        updateSpent: function(){
            const allExpenses = document.querySelectorAll(UISelectors.expenseItem);
            const expenseCount = [...allExpenses].map(item => +item.innerHTML);
            const expenseSum = expenseCount.reduce(function(a, b){
                return a+b;
            },0);
            const expensesTotal = document.querySelector(UISelectors.moneySpent);
            expensesTotal.innerHTML = expenseSum.toFixed(2);
        },

        updateAvailable: function(){
            const earned = document.querySelector(UISelectors.moneyEarned);
            const spent = document.querySelector(UISelectors.moneySpent);
            const available = document.querySelector(UISelectors.moneyAvailable);
            available.innerHTML = (parseFloat(earned.innerHTML) - parseFloat(spent.innerHTML)).toFixed(2);
        },

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
