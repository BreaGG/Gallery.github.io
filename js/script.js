document.addEventListener("DOMContentLoaded", function() {
    // Simula el tiempo que tarda en cargar el contenido
    setTimeout(function() {
        // Oculta la pantalla de carga
        document.querySelector(".preload-screen").style.display = "none";
        // Muestra el contenido principal
        document.querySelector(".content").style.display = "block";
    }, 3000); // Cambia este valor a la cantidad de milisegundos que deseas para la simulación de carga
});
