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
        
        console.log('Formulaire de connexion soumis');
    
        const firstName = document.getElementById('loginName').value;
        const password = document.getElementById('loginPassword').value;
    
        console.log('Prénom:', firstName);
        console.log('Mot de passe:', password);
        
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, password })
        })
        .then(response => {
            console.log('Réponse de la requête:', response);
            if (response.ok) {
                // Récupérer l'email de l'utilisateur à partir de la réponse JSON
                return response.json();
            } else if (response.status === 401) {
                // Alerte si les identifiants sont incorrects
                alert('Identifiants incorrects. Veuillez réessayer.');
            } else {
                throw new Error('Erreur lors de la connexion.');
            }
        })
        .then(data => {
            // Stocker l'email de l'utilisateur dans le stockage local
            localStorage.setItem('userEmail', data.email);
    
            // Redirection vers la page count.html en cas de connexion réussie
            window.location.href = '/count.html';
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
                // Alerte si le compte est créé avec succès
                alert('Compte créé avec succès.');
                // Réinitialisation du formulaire d'inscription
                registerForm.reset();
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
