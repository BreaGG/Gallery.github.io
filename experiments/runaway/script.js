var audio = new Audio('Kanye-West-Runaway.mp3');

document.getElementById('playButton').addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    var imagenes = document.querySelectorAll('svg');
    imagenes.forEach(function (imagen) {
        imagen.classList.toggle('baile');
    });
});