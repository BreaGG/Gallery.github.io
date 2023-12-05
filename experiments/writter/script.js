const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    function randomLetter() {
        return letters[Math.floor(Math.random() * letters.length)];
    }

    function drawLetter(x, y) {
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(randomLetter(), x, y);
    }

    function handleMouseMove(event) {
        const x = event.clientX;
        const y = event.clientY;

        drawLetter(x, y);
    }

    canvas.addEventListener('mousemove', handleMouseMove);