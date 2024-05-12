document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    showRegisterLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerContainer.classList.remove('hidden');
        loginContainer.classList.add('hidden');
    });
    
    showLoginLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginContainer.classList.remove('hidden');
        registerContainer.classList.add('hidden');
    });

    loginForm.addEventListener('submit', function(event) {

        event.preventDefault();
        const mail = document.getElementById('loginMail').value;
        const password = document.getElementById('loginPassword').value;
        
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mail, password })
        })
        .then(response => {
            console.log('Réponse de la requête:', response);
            if (response.ok) {
                localStorage.setItem('userEmail', mail);
                window.location.href = '/budget.html';
            } else if (response.status === 401) {
                alert('Identifiants incorrects. Veuillez réessayer.');
            } else {
                throw new Error('Erreur lors de la connexion.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la connexion :', error);
            alert('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        });
    });

    registerForm.addEventListener('submit', function(event) {

        event.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const firstName = document.getElementById('registerFirstName').value;
        const lastName = document.getElementById('registerLastName').value;
        
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, firstName, lastName })
        })
        .then(response => {
            if (response.ok) {
                alert('Compte créé avec succès.');
                registerForm.reset();
                window.location.href = '/connect.html';
            } else {
                throw new Error('Erreur lors de la création du compte.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la création du compte :', error);
            alert('Une erreur est survenue lors de la création du compte. Veuillez réessayer.');
        });
    });
});