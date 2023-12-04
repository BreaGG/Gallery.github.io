var audio = new Audio('Kanye-West-Runaway.mp3');

document.getElementById('playButton').addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    
    var imagenes = document.getElementsByClassName('norotada');
    var imagenesArray = Array.from(imagenes);
    
    var imagenesRotadas = document.getElementsByClassName('rotada');
    var imagenesRotadasArray = Array.from(imagenesRotadas);

    imagenesArray.forEach(function (imagen) {
        imagen.classList.toggle('baile');
    });

    imagenesRotadasArray.forEach(function (imagenRotada) {
        imagenRotada.classList.toggle('baileRotada');
    });
});
