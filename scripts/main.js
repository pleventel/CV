/*
 * Back-to-top button.
 *
 * Creates a circular "up" button in the bottom right corner (styled by
 * a.clickbutton.backtotop in styles/main.css), shows it once the visitor has
 * scrolled down a bit, and lifts it above the footer when the footer is on
 * screen so it never covers the copyright line.
 *
 * Included on every page with: <script src="scripts/main.js" defer></script>
 * (use ../scripts/main.js for the pages in the activities/ folder).
 */
(function () {
    'use strict';

    var SHOW_AFTER = 400; // pixels scrolled before the button appears
    var GAP = 0;          // extra space between button and footer, on top of the CSS offset

    var button = document.createElement('a');
    button.className = 'clickbutton circlebutton backtotop';
    button.href = '#top';
    button.title = 'Back to top';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML =
        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<path d="M12 19V5M6 11l6-6 6 6"/></svg>';
    document.body.appendChild(button);

    var footer = document.querySelector('footer');
    var ticking = false;

    function update() {
        ticking = false;
        button.classList.toggle('visible', window.pageYOffset > SHOW_AFTER);

        // How far the footer reaches into the visible window (0 when it is off screen)
        var overlap = 0;
        if (footer) {
            overlap = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top) + GAP;
        }
        button.style.setProperty('--footer-overlap', overlap + 'px');
    }

    function onScroll() {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(update);
        }
    }

    button.addEventListener('click', function (event) {
        event.preventDefault();
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });

        // Keep keyboard users oriented: move focus to the first navigation link
        var firstLink = document.querySelector('header nav a');
        if (firstLink) {
            firstLink.focus({ preventScroll: true });
        }
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
})();
