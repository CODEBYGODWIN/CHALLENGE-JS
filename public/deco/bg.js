// Cette fonction est exécutée lorsque le DOM est entièrement chargé
document.addEventListener("DOMContentLoaded", function() {
    // Tableau des chemins des images
    const images = [
      "../static/img/liasse.webp",
      "../static/img/sac dollars.png",
      "../static/img/Gold.png",
    ];
  
    // Index de l'image actuellement affichée
    let currentImageIndex = 0;
  
    // Sélectionne le conteneur d'images avec la classe ".bg"
    const imageContainer = document.querySelector(".bg");
  
    // Crée un élément image et ajoute-lui la classe "bgMove"
    const imgElement = document.createElement("img");
    imgElement.classList.add("bgMove");
  
    // Ajoute l'élément image au conteneur d'images
    imageContainer.appendChild(imgElement);
  
    // Définit l'identifiant de l'élément image
    imgElement.id = "bgMove";
  
    // Fonction pour changer l'image de fond à intervalles réguliers
    function changeBackgroundImage() {
      // Réduit progressivement l'opacité de l'image
      imgElement.style.opacity = "0";
      setTimeout(function() {
        // Change l'image après une courte pause pour la transition
        imgElement.src = images[currentImageIndex];
        currentImageIndex = (currentImageIndex + 1) % images.length;
        setTimeout(function() {
          // Rétablit l'opacité à 0.2 après avoir changé l'image
          imgElement.style.opacity = "0.2";
        }, 50); // Attend un court instant avant de rétablir l'opacité pour permettre à la transition de se terminer
      }, 5); // Attend 5 ms avant de changer l'image, ce qui donne le temps pour la transition d'opacité de se terminer
  
      // Appelle à nouveau la fonction pour le prochain changement d'image après 10 secondes
      setTimeout(changeBackgroundImage, 10000); // Change toutes les 10 secondes
    }
  
    // Appelle la fonction pour démarrer le diaporama
    changeBackgroundImage();
  });
  
  // Cette fonction est exécutée lorsque le DOM est entièrement chargé
  document.addEventListener('DOMContentLoaded', function() {
    // Sélectionne l'élément image avec l'identifiant "bgMove"
    var bg = document.getElementById('bgMove');
    
    // Fonction pour obtenir une position aléatoire sur la page
    function getRandomPosition() {
      // Calcule les limites de la fenêtre pour la position maximale
      var maxX = window.innerWidth - bg.clientWidth;
      var maxY = window.innerHeight - bg.clientHeight;
      
      // Génère des coordonnées X et Y aléatoires dans ces limites
      var randomX = Math.floor(Math.random() * maxX);
      var randomY = Math.floor(Math.random() * maxY);
      
      return { x: randomX, y: randomY };
    }
  
    // Fonction pour déplacer l'image de fond à une position aléatoire
    function movebg() {
      // Obtiens une nouvelle position aléatoire
      var newPosition = getRandomPosition();
      // Définit la position de l'image en fonction de la nouvelle position aléatoire
      bg.style.transform = 'translate(' + newPosition.x + 'px, ' + newPosition.y + 'px)';
    }
  
    // Définit la fréquence de déplacement de l'image de fond à 2500 ms (2,5 secondes)
    setInterval(movebg, 2500); 
  });