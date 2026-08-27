/*!
 * Cloud2Gether Theme Controller (Dark & Light Mode)
 * Ensures rock-solid theme switching and zero-flash transitions.
 */

(() => {
  'use strict';

  const themeKey = 'td-color-theme';
  const getStoredTheme = () => localStorage.getItem(themeKey);
  const setStoredTheme = theme => localStorage.setItem(themeKey, theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = theme => {
    let resolvedTheme = theme;
    if (theme === 'auto') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-bs-theme', resolvedTheme);
    document.documentElement.style.backgroundColor = (resolvedTheme === 'light') ? '#f8f9fc' : '#09090b';
    document.documentElement.style.color = (resolvedTheme === 'light') ? '#2d2f39' : '#bfc1cd';
  };

  // Run theme application immediately
  setTheme(getPreferredTheme());

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme');
    if (!themeSwitcher) {
      return;
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text');
    const activeThemeIcon = document.querySelector('.theme-icon-active use');
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);

    if (!btnToActive) {
      return;
    }

    const svgUse = btnToActive.querySelector('svg use');
    const svgOfActiveBtn = svgUse ? svgUse.getAttribute('href') : null;

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active');
      element.setAttribute('aria-pressed', 'false');
    });

    btnToActive.classList.add('active');
    btnToActive.setAttribute('aria-pressed', 'true');

    if (activeThemeIcon && svgOfActiveBtn) {
      activeThemeIcon.setAttribute('href', svgOfActiveBtn);
    }

    if (themeSwitcherText) {
      const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
      themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);
    }

    if (focus) {
      themeSwitcher.focus();
    }
  };

  const handleToggleClick = (e) => {
    const toggleBtn = e.currentTarget;
    const theme = toggleBtn.getAttribute('data-bs-theme-value');
    if (!theme) return;
    setStoredTheme(theme);
    setTheme(theme);
    showActiveTheme(theme, true);
  };

  const initThemeUI = () => {
    const activeSetting = getStoredTheme() || 'auto';
    showActiveTheme(activeSetting);

    document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
      toggle.removeEventListener('click', handleToggleClick);
      toggle.addEventListener('click', handleToggleClick);
    });

    // Remove initialization lock cleanly
    document.documentElement.removeAttribute('data-theme-init');
  };

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme();
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme('auto');
      showActiveTheme('auto');
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeUI);
  } else {
    initThemeUI();
  }

  // Backup trigger on full window load
  window.addEventListener('load', initThemeUI);
})();
