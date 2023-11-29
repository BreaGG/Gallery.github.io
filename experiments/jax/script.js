const $w = document.querySelector('[data-world]');

const settings = () => {
    return {
        ratio: Math.random() < .5 ? .75 : .5,
        stripes: 5 + Math.floor(Math.random() * 6),
    }
}

function doit(s = settings()) {
    const $wrap = document.createElement('div');
    $wrap.classList.add('frame');
    $wrap.style.setProperty('--ratio', s.ratio);

    for (let i = 0; i < s.stripes; i++) {
        const $stripe = document.createElement('div');
        $stripe.classList.add('stripe');
        $stripe.style.setProperty('--ri', i / s.stripes);
        $stripe.style.setProperty('--z', Math.random() < .2 ? 2 : 0);
        $stripe.style.setProperty('--il', Math.random() < .1 ? .15 : 0);
        $stripe.style.setProperty('--ir', Math.random() < .1 ? .15 : 0);

        $stripe.style.setProperty('--d', Math.round(Math.random()));
        $wrap.appendChild($stripe);

    }


    const $shape0 = document.createElement('div');
    $shape0.classList.add('shape', 'shape--bottom');
    $wrap.appendChild($shape0);

    const $shape = document.createElement('div');
    $shape.classList.add('shape');
    $wrap.appendChild($shape);

    const $shape2 = document.createElement('div');
    $shape2.classList.add('shape', 'shape--top');
    $wrap.appendChild($shape2);

    $w.appendChild($wrap);
}

doit();

document.documentElement.addEventListener('click', () => {
    $w.innerHTML = '';
    doit()
});