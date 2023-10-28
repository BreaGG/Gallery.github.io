function makeElementDraggable(element) {
    var dragItem = null;

    element.style.position = "absolute";
    element.onmousedown = function(event) {
        
        dragItem = element;
        var offsetX = event.clientX - dragItem.getBoundingClientRect().left;
        var offsetY = event.clientY - dragItem.getBoundingClientRect().top;

        function onMouseMove(event) {
            var x = event.clientX - offsetX;
            var y = event.clientY - offsetY;
            dragItem.style.left = x + "px";
            dragItem.style.top = y + "px";
        }

        function onMouseUp() {
            
            dragItem = null;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };
}

// Selecciona todos los elementos con la clase "draggable" y hace que sean arrastrables
var elementosArrastrables = document.querySelectorAll(".draggable");

elementosArrastrables.forEach(function(elemento) {
    makeElementDraggable(elemento);
});
