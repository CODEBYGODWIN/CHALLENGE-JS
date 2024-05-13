  document.addEventListener("DOMContentLoaded", function() {
      const images = [
        "../static/img/liasse.webp",
        "../static/img/sac dollars.png",
        "../static/img/Gold.png",
      ];
    
      let currentImageIndex = 0;
      const imageContainer = document.querySelector(".bg");
      const imgElement = document.createElement("img");
      imgElement.classList.add("bgMove");
      imageContainer.appendChild(imgElement);
      imgElement.id = "bgMove";

      function changeBackgroundImage() {
        imgElement.style.opacity = "0";

        setTimeout(function() {
          imgElement.src = images[currentImageIndex];
          currentImageIndex = (currentImageIndex + 1) % images.length;
          setTimeout(function() {
            imgElement.style.opacity = "0.2";
          }, 50);
        }, 5);
        setTimeout(changeBackgroundImage, 10000);

      }
      changeBackgroundImage();
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    var bg = document.getElementById('bgMove');
    
    function getRandomPosition() {
      var maxX = window.innerWidth - bg.clientWidth;
      var maxY = window.innerHeight - bg.clientHeight;
      var randomX = Math.floor(Math.random() * maxX);
      var randomY = Math.floor(Math.random() * maxY);
      return { x: randomX, y: randomY };
    }

    function movebg() {
      var newPosition = getRandomPosition();
      bg.style.transform = 'translate(' + newPosition.x + 'px, ' + newPosition.y + 'px)';
    }
    setInterval(movebg, 2500); 
  });