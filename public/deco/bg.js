document.addEventListener("DOMContentLoaded", function() {
  // Tableau contenant les chemins des images de fond
  const images = [
    "../static/img/liasse.webp",
    "../static/img/sac dollars.png",
    "../static/img/Gold.png",
  ];
  
  // Index de l'image actuellement affichée
  let currentImageIndex = 0;
  // Sélection de l'élément contenant l'image de fond
  const imageContainer = document.querySelector(".bg");
  // Création de l'élément img pour afficher l'image de fond
  const imgElement = document.createElement("img");
  // Ajout de la classe CSS pour le mouvement de l'arrière-plan
  imgElement.classList.add("bgMove");
  // Ajout de l'élément img au conteneur d'image
  imageContainer.appendChild(imgElement);
  // Ajout d'un identifiant à l'élément img
  imgElement.id = "bgMove";;

  // Fonction pour changer l'image de fond avec une transition
  function changeBackgroundImage() {
    // Réduire l'opacité de l'image actuelle
    imgElement.style.opacity = "0";
    
    setTimeout(function() {
      // Changer l'image vers l'image suivante dans le tableau
      imgElement.src = images[currentImageIndex];
      // Mettre à jour l'index pour l'image suivante
      currentImageIndex = (currentImageIndex + 1) % images.length;
      setTimeout(function() {
        // Augmenter l'opacité de la nouvelle image
        imgElement.style.opacity = "0.2";
      }, 50);
    }, 5);
    // Appeler la fonction de changement d'image toutes les 10 secondes
    setTimeout(changeBackgroundImage, 10000);
  }
  // Appeler la fonction pour démarrer le changement d'image de fond
  changeBackgroundImage();
});

document.addEventListener('DOMContentLoaded', function() {
  // Sélection de l'élément img de l'arrière-plan
  var bg = document.getElementById('bgMove');
  
  // Fonction pour obtenir une position aléatoire dans la fenêtre
  function getRandomPosition() {
    // Calcul des positions maximales en fonction de la taille de la fenêtre
    var maxX = window.innerWidth - bg.clientWidth;
    var maxY = window.innerHeight - bg.clientHeight;
    // Génération de positions aléatoires dans la fenêtre
    var randomX = Math.floor(Math.random() * maxX);
    var randomY = Math.floor(Math.random() * maxY);
    // Retourner les coordonnées x et y
    return { x: randomX, y: randomY };
  }

  // Fonction pour déplacer l'image de fond à une position aléatoire
  function movebg() {
    // Obtenir une nouvelle position aléatoire
    var newPosition = getRandomPosition();
    // Appliquer la transformation pour déplacer l'image de fond
    bg.style.transform = 'translate(' + newPosition.x + 'px, ' + newPosition.y + 'px)';
  }
  // Appeler la fonction de déplacement toutes les 2.5 secondes
  setInterval(movebg, 2500); 
});