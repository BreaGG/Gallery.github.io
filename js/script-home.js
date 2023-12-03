// script-home.js
import 'https://code.jquery.com/jquery-3.6.4.min.js';

$(document).ready(function () {
    $(".navbar-a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            var targetElement = document.querySelector(hash);

            if (targetElement) {
                var offsetTop = targetElement.getBoundingClientRect().top + window.scrollY;

                $('html, body').animate({
                    scrollTop: offsetTop
                }, 600, 'swing');s

                window.history.pushState(null, null, hash);
            }
        }
    });
});
