document.addEventListener("DOMContentLoaded", function () {
    var circle = document.querySelector('.circle');

    circle.addEventListener('click', function () {
        animateCircle();
    });

    function animateCircle() {
        var positionY = 0;
        var duration = 2000;
        var startTime = performance.now();
        var isFalling = true;

        function updatePosition() {
            var currentTime = performance.now();

            if (isFalling) {
                positionY = easeInOutQuad(currentTime - startTime, 0, window.innerHeight, duration);
            } else {
                positionY = easeInOutQuad(currentTime - startTime, window.innerHeight, -window.innerHeight, duration);
            }

            circle.style.transform = 'translateY(' + positionY + 'px)';

            if (currentTime - startTime < duration) {
                requestAnimationFrame(updatePosition);
            } else {
                isFalling = !isFalling;
                startTime = performance.now();
                requestAnimationFrame(updatePosition);
            }
        }

        requestAnimationFrame(updatePosition);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
});
