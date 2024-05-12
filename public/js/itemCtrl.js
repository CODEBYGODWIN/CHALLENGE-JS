import UICtrl from './UICtrl.js';

const itemCtrl = (function(){
    const Item = function(id, description, amount, date, type){
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.type = type;
    }

    const data = {
        items:[]
    }

    return{
        logData: function(){
            return data;
        },

        addMoney: function(description, amount, type){
            const ID = itemCtrl.createID();
            const date = UICtrl.getDateInput().dateInput;
            const newMoney = new Item(ID, description, amount, date, type);
            data.items.push(newMoney);

            return newMoney;
        },

        getIncomes: function() {
            return data.items.filter(item => item.type === "income");
        },

        getExpenses: function() {
            return data.items.filter(item => item.type === "expense");
        },

        createID: function(){
            const idNum = Math.floor(Math.random()*10000);
            return idNum;
        },

        getIdNumber: function(item){
            const amountId = item.parentElement.id;
            const itemArr = amountId.split('-');
            const id = parseInt(itemArr[1]);
            return id;
        },
        
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