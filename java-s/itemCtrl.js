import UICtrl from './UICtrl.js';

// CONTRÔLEUR DES ARTICLES
const itemCtrl = (function(){
    // Constructeur d'objet pour les articles
    const Item = function(id, description, amount, date){
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.date = date;
    }
    // Structure de données
    const data = {
        items:[]
    }
    // Méthodes publiques
    return{
        // Fonction pour afficher les données dans la console
        logData: function(){
            return data;
        },
        // Fonction pour ajouter un montant (revenu ou dépense)
        addMoney: function(description, amount){
            // Créer un identifiant aléatoire
            let ID = itemCtrl.createID();
            // Obtenir la date de l'interface utilisateur
            let date = UICtrl.getDateInput().dateInput;
            // Créer un nouvel article
            let newMoney = new Item(ID, description, amount, date);
            // Ajouter l'article dans le tableau
            data.items.push(newMoney);

            return newMoney;
        },
        // Fonction pour créer un identifiant aléatoire
        createID: function(){
            // Créer un numéro d'identifiant aléatoire entre 0 et 10000
            const idNum = Math.floor(Math.random()*10000);
            return idNum;
        },
        // Fonction pour obtenir le numéro d'identifiant d'un article
        getIdNumber: function(item){
            // Obtenir l'identifiant de l'article
            const amountId = item.parentElement.id;
            // Diviser l'identifiant en un tableau
            const itemArr = amountId.split('-');
            // Obtenir le numéro d'identifiant
            const id = parseInt(itemArr[1]);

            return id;
        },
        // Fonction pour supprimer un montant du tableau de données
        deleteAmountArr: function(id){
            // Obtenir tous les identifiants
            const ids = data.items.map(function(item){
                // Retourner l'identifiant de l'article
                return item.id
            });
            // Obtenir l'index
            const index = ids.indexOf(id);
            // Supprimer l'article
            if(index !== -1) {
                data.items.splice(index, 1);
            }
        }
    }
})();

export default itemCtrl;


