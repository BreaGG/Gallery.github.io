const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    function randomLetter() {
        return letters[Math.floor(Math.random() * letters.length)];
    }

    let lastTimestamp = null;
    let fontSize = 30;

    async function loadCustomFont() {
        const customFont = new FontFace('BebasNeue', 'url(https://fonts.gstatic.com/s/bebasneue/v2/JTUSjIg69CK48gW7PXoo9Wdhzg.ttf)');

        try {
            await customFont.load();
            document.fonts.add(customFont);
        } catch (error) {
            console.error('Error al cargar la fuente personalizada:', error);
        }
    }

    function updateFontSize(speed) {
        const minFontSize = 10;
        const maxFontSize = 250;
        const speedThreshold = 1.2;

        if (speed > speedThreshold) {
            fontSize = Math.min(maxFontSize, fontSize + speed);
        }if (speed < speedThreshold) {
            fontSize = Math.max(minFontSize, fontSize - (fontSize * speed * 0.1));
        }
    }

    async function init() {
        await loadCustomFont();

        function drawLetter(x, y) {
            ctx.font = `bold ${fontSize}px BebasNeue`;
            ctx.fillStyle = 'black';
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1;
            const letter = randomLetter();
            ctx.fillText(letter, x, y);
            ctx.strokeText(letter, x, y);
        }

        function handleMouseMove(event) {
            const x = event.clientX;
            const y = event.clientY;

            const timestamp = performance.now();
            const speed = lastTimestamp ? Math.sqrt((x - lastTimestamp.x)**2 + (y - lastTimestamp.y)**2) / (timestamp - lastTimestamp.timestamp) : 0;

            updateFontSize(speed);
            drawLetter(x, y);

            lastTimestamp = { x, y, timestamp };
        }

        canvas.addEventListener('mousemove', handleMouseMove);
    }

    init();