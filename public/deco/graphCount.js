let ctx = document.getElementById('graphCount').getContext('2d');

let data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'ajouter',
        data: [12, 11, 3, 5, 2, 3, 1],
        backgroundColor: 'rgba(255, 200, 132, 0.2)',
        borderColor: 'rgba(255, 200, 132, 1)',
        borderWidth: 2
    },{ 
        label: 'vente',
        data: [2, 6, 3, 5, 5, 3, 3],
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

console.log(data);