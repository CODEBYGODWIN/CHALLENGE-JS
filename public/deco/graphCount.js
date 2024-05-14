const graphCount = (function(){
    document.addEventListener("DOMContentLoaded", function () {
        // Get the canvas element
        const graphCanvas = document.getElementById("graphCount");

        // Get the 2D rendering context
        const ctx = graphCanvas.getContext("2d");

        // Initial data for the chart
        const initialData = {
            labels: ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"],
            datasets: [{
                label: "Dépenses",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                data: Array(12).fill(0)
            }, {
                label: "Revenus",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                data: Array(12).fill(0)
            }]
        };

        // Create a new chart instance
        const myChart = new Chart(ctx, {
            type: "bar",
            data: initialData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Function to get the month from a string date
        function getMonthFromStringDate(dateString) {
            const parts = dateString.split('/');
            return parseInt(parts[1]) - 1;
        }

        // Function to update the chart
        function updateChart() {
            const userEmail = localStorage.getItem('userEmail');
            const budgetData = JSON.parse(localStorage.getItem(`budgetData-${userEmail}`));
            const expenses = budgetData.expenses || [];
            const incomes = budgetData.incomes || [];

            // Create a new object to hold updated data for the chart
            const newData = {
                labels: initialData.labels.slice(),
                datasets: [{
                    label: "Dépenses",
                    backgroundColor: initialData.datasets[0].backgroundColor,
                    borderColor: initialData.datasets[0].borderColor,
                    borderWidth: initialData.datasets[0].borderWidth,
                    data: Array(12).fill(0)
                }, {
                    label: "Revenus",
                    backgroundColor: initialData.datasets[1].backgroundColor,
                    borderColor: initialData.datasets[1].borderColor,
                    borderWidth: initialData.datasets[1].borderWidth,
                    data: Array(12).fill(0)
                }]
            };

            expenses.forEach(expense => {
                if (expense.type === 'expense'){
                    const expenseMonth = getMonthFromStringDate(expense.date);
                    newData.datasets[0].data[expenseMonth] += parseFloat(expense.amount);
                }
            });

            incomes.forEach(income => {
                if (income.type === 'income'){
                    const incomeMonth = getMonthFromStringDate(income.date);
                    newData.datasets[1].data[incomeMonth] += parseFloat(income.amount);
                }
            });

            myChart.data = newData;
            myChart.update();
        }
        updateChart();

        // Listen for custom events 'incomeAdded' and 'expenseAdded' and call updateChart function
        document.addEventListener('incomeAdded', updateChart);
        document.addEventListener('expenseAdded', updateChart);
    });
})();