import itemCtrl from '../js/itemCtrl.js';

let ctx = document.getElementById('graphCount').getContext('2d');

// Créez un tableau d'objets avec les dates et les montants
let newMoneyData = itemCtrl.logData().items.map(item => ({
    date: item.date,
    count: item.amount
}));

// Extrayez les dates et les montants dans des tableaux séparés
let dates = newMoneyData.map(item => item.date);
let counts = newMoneyData.map(item => item.count);

let data = {
    labels: dates, // Utilisez les dates comme labels
    datasets: [{
        label: 'ajouter',
        data: counts, // Utilisez les montants comme données
        backgroundColor: 'rgba(255, 200, 132, 0.2)',
        borderColor: 'rgba(255, 200, 132, 1)',
        borderWidth: 2
    },{ 
        label: 'vente',
        data: counts, // Utilisez les montants comme données
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 2
    }]
};

let graphCount = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }
});
