/**
 * Forth Bridge — Tab Navigation
 *
 * Implements WAI-ARIA tab pattern with keyboard navigation.
 * Tabs: arrow keys to move, Enter/Space to select.
 */

(function () {
  'use strict';

  const tabBar   = document.querySelector('.tab-bar');
  const tabs     = Array.from(tabBar.querySelectorAll('[role="tab"]'));
  const panels   = tabs.map(tab =>
    document.getElementById(tab.getAttribute('aria-controls'))
  );

  function activate(index) {
    tabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.setAttribute('aria-selected', String(isActive));
      tab.classList.toggle('active', isActive);
      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel, i) => {
      if (i === index) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  }

  // Click handler
  tabBar.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab) return;
    const index = tabs.indexOf(tab);
    if (index !== -1) activate(index);
  });

  // Keyboard handler — left/right arrows, Home, End
  tabBar.addEventListener('keydown', (e) => {
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;

    let next = current;

    if (e.key === 'ArrowRight') {
      next = (current + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      next = (current - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      next = 0;
    } else if (e.key === 'End') {
      next = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    activate(next);
    tabs[next].focus();
  });

  // Initialise: make non-active tabs non-focusable by keyboard sequence
  tabs.forEach((tab, i) => {
    tab.tabIndex = i === 0 ? 0 : -1;
  });

})();
