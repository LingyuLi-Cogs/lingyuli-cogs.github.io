/* Lingyu Li | site behaviour: theme memory, scroll reveals, sticky-header hairline. */
(function () {
  'use strict';

  var root = document.documentElement;
  window.__siteReady = true;

  /* --- Theme ------------------------------------------------------------- */

  var toggle = document.querySelector('[data-theme-toggle]');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set === 'light' || set === 'dark') return set;
    return systemDark.matches ? 'dark' : 'light';
  }

  function syncLabel() {
    if (!toggle) return;
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
  }

  if (toggle) {
    syncLabel();
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncLabel();
    });
  }

  if (systemDark.addEventListener) {
    systemDark.addEventListener('change', syncLabel);
  }

  /* --- Scroll reveals ---------------------------------------------------- */
  /* Sequence only. Entries fade up in reading order so a long list does not
     land as one wall of text. Everything is shown immediately when the user
     prefers reduced motion or the observer is unavailable. */

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var revealable = document.querySelectorAll('.reveal');

  if (reduced.matches || !('IntersectionObserver' in window) || !revealable.length) {
    root.classList.remove('reveal-ready');
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

    Array.prototype.forEach.call(revealable, function (el) {
      revealObserver.observe(el);
    });
  }

  /* --- Sticky header hairline -------------------------------------------- */

  var header = document.querySelector('.site-header');

  if (header && 'IntersectionObserver' in window) {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.insertBefore(sentinel, document.body.firstChild);

    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }).observe(sentinel);
  }
})();
