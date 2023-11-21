const texts = `



Yeah, sharp like an edge of a samurai sword
The mental blade cut through flesh and bone
Though my mind's at peace, the world out of order
Missing the inner heat, life gets colder
Oh yes, I have to find my path
No less, walk on earth, water, and fire
The elements compose a magnum opus
My modus operandi is amalgam
Steel packed tight in microchip
On my armor a sign of all-pro
The ultimate reward is honor, not awards
At odds with the times in wards with no lords

A freelancer
A battlecry of a hawk make a dove fly and a tear dry
Wonder why a lone wolf don't run with a clan
Only trust your instincts and be one with the plan

Some days, some nights
Some live, some die
In the way of the samurai
Some fight, some bleed
Sun up to sun down
The sons of a battlecry

Some days, some nights
Some live, some die
In the name of the samurai
Some fight, some bleed
Sun up to sun down
The sons of a battlecry

Look, just the air around him
An aura surrounding the heir apparent
He might be a peasant but shine like grand royalty
He to the people and land, loyalty
We witness above all to hear this
Sea sickness in the ocean of wickedness
Set sail to the sunset no second guessing

Far east style with the spirit of wild west
The "quote-unquote" code stands the test of
Time for the chosen ones to find the best of
Noble minds that ever graced the face of
A hemisphere with no fear, fly over

The blue yonder where
The sky meets the sea
And eye meets no eye
And boy meets world
And became a man to serve the world
To save the day, the night, and the girl too

Some days, some nights
Some live, some die
In the way of the samurai
Some fight, some bleed
Sun up to sun down
The sons of a battlecry

Some days, some nights
Some live, some die
In the name of the samurai
Some fight, some bleed
Sun up to sun down
The sons of a battlecry, battlecry

`;

class Canvas {
    static initialize() {
        this.setupCanvas();
        this.setupSizes();
        this.setupEvents();
    }

    static setupCanvas() {
        const d = document;

        this.canvas = d.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.minHeight = '100%';
        this.canvas.style.display = 'block';

        this.ctx = this.canvas.getContext('2d');

        d.body.appendChild(this.canvas);
    }

    static setupSizes() {
        this.sizes = {};

        this.sizes.width = this.canvas.width = window.innerWidth;
        this.sizes.height = this.canvas.height = window.innerHeight;
    }

    static setupEvents() {
        window.addEventListener('resize', this.setupSizes.bind(this), false);
    }

    static getContext() {
        return this.ctx;
    }

    static getSizes() {
        return this.sizes;
    }
}

class Terminal {
    constructor(ctx, texts) {
        this.ctx = ctx;
        this.textsArr = texts.split('\n');

        this.setupEvents();
        this.initialize();
    }

    setupEvents() {
        window.addEventListener('resize', this.initialize.bind(this), false);
    }

    initialize() {
        if (this.animId) {
            cancelAnimationFrame(this.animId);
        }

        this.sizes = Canvas.getSizes();

        this.maxLength = this.getMaxLength(this.textsArr);

        this.col = 0;
        this.row = 0;

        this.size = this.sizes.width / this.maxLength * 1.3;

        this.curHeight = Math.max(this.size * (this.textsArr.length + 1), this.sizes.height);

        this.draw(0);
    }

    getMaxLength(arr) {
        let tmp = 0;

        for (let i = 0; i < arr.length; i++) {
            tmp = Math.max(arr[i].length, tmp);
        }

        return tmp;
    }

    draw(t) {
        this.ctx.textBaseline = 'top';
        this.ctx.font = this.size + 'px sans-serif';
        this.ctx.fillStyle = 'white';

        this.ctx.clearRect(0, 0, this.sizes.width, this.curHeight);

        for (let i = 0; i < this.textsArr.length; i++) {
            let text = this.textsArr[i];

            if (i <= this.row) {
                if (i === this.row) {
                    text = text.substring(0, this.col);
                }

                this.ctx.fillText(text, 0, i * this.size);
            }
        }

        if (this.row === this.textsArr.length - 1) {
            this.ctx.save();

            this.ctx.globalAlpha = Math.sin(t * 0.005);
            this.ctx.fillRect(
                this.ctx.measureText(this.textsArr[this.row].substring(0, this.col)).width + this.size / 2,
                this.row * this.size,
                this.size / 4,
                this.size
            );

            if (Math.random() < 0.95) {
                this.ctx.restore();

                this.animId = requestAnimationFrame(this.draw.bind(this));

                return;
            }

            let newText = '';
            let randomNum = Math.floor(Math.random() * this.maxLength);

            const spanishCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzáéíóúñ¿¡!.,;:0123456789';

            for (let i = 0; i < randomNum; i++) {
                let text = spanishCharacters.charAt(Math.floor(Math.random() * spanishCharacters.length));
                newText += text;
            }

            this.textsArr.push(newText);
            this.curHeight = Math.max(this.size * (this.textsArr.length + 1), this.sizes.height);

            this.ctx.restore();

            this.animId = requestAnimationFrame(this.draw.bind(this));

            return;
        }

        this.ctx.fillRect(
            this.ctx.measureText(this.textsArr[this.row].substring(0, this.col)).width + this.size / 2,
            this.row * this.size,
            this.size / 4,
            this.size
        );

        if (Math.random() < 0.4) this.col++;

        if (this.col >= this.textsArr[this.row].length) {
            this.row++;
            this.col = 0;

            if (this.row * this.size > this.sizes.height - this.size) {
                this.ctx.translate(0, -this.size);
            }
        }

        this.animId = requestAnimationFrame(this.draw.bind(this));
    }
}

window.addEventListener('load', () => {
    console.clear();

    Canvas.initialize();

    new Terminal(Canvas.getContext(), texts);
});
