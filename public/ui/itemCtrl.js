import UICtrl from './UICtrl.js';

const itemCtrl = (function(){
    // Fonction constructeur pour créer un nouvel élément
    const Item = function(id, description, amount, date, type, category, subCategory){
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.type = type;
        this.category = category;
        this.subCategory = subCategory;
    }
    // Données de l'application
    const data = {
        items:[]
    }

    return{
        // Fonction pour afficher les données
        logData: function(){
            return data;
        },
        // Fonction pour ajouter un revenu ou une dépens
        addMoney: function(description, amount, type, category, subCategory){
            const ID = itemCtrl.createID();
            const date = UICtrl.getDateInput().dateInput;
            const newMoney = new Item(ID, description, amount, date, type, category, subCategory);
            data.items.push(newMoney);
            return newMoney;
        },
        // Fonction pour récupérer tous les revenus
        getIncomes: function() {
            return data.items.filter(item => item.type === "income");
        },
        // Fonction pour récupérer toutes les dépenses
        getExpenses: function() {
            return data.items.filter(item => item.type === "expense");
        },
        // Fonction pour générer un identifiant unique
        createID: function(){
            const idNum = Math.floor(Math.random()*10000);
            return idNum;
        },
        // Fonction pour obtenir l'identifiant d'un élément
        getIdNumber: function(item){
            const amountId = item.parentElement.id;
            const itemArr = amountId.split('-');
            const id = parseInt(itemArr[1]);
            return id;
        },
        // Fonction pour supprimer un élément du tableau des revenus ou des dépenses
        deleteAmountArr: function(id){
            const ids = data.items.map(function(item){
                return item.id
            });
            const index = ids.indexOf(id);
            if(index !== -1) {
                data.items.splice(index, 1);
            }
        }
    }
})();

export default itemCtrl;