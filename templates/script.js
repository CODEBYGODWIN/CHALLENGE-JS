document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const userList = document.getElementById('userList');

    showRegisterLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginContainer.classList.add('hidden');
        registerContainer.classList.remove('hidden');
    });

    showLoginLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    });

    const displayUsers = () => {
        userList.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const email = localStorage.key(i);
            const user = JSON.parse(localStorage.getItem(email));
            const listItem = document.createElement('li');
            listItem.textContent = `Email: ${email}, Mot de passe: ${user.password}`;
            userList.appendChild(listItem);
        }
    };

    displayUsers();

    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const existingUser = JSON.parse(localStorage.getItem(email));

        if (existingUser) {
            alert('Un compte avec cet email existe déjà.');
        } else {
            const newUser = { email, password };
            localStorage.setItem(email, JSON.stringify(newUser));
            alert('Compte créé avec succès. Vous pouvez maintenant vous connecter.');
            displayUsers();
            document.getElementById('registerForm').reset();
            registerContainer.classList.add('hidden');
            loginContainer.classList.remove('hidden');
        }
    });

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const user = JSON.parse(localStorage.getItem(email));

        if (user && user.password === password) {
            alert('Connexion réussie.');
            // Redirection vers la page de gestion de budgets
            // window.location.href = 'budget.html';
        } else {
            alert('Identifiants incorrects.');
        }
    });
});
