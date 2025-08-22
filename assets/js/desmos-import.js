(function () {
  // Robust dark-mode detector
  const isDark = () => {
    const html = document.documentElement;
    const attr = html.getAttribute('data-mode');
    if (attr === 'dark') return true;
    if (attr === 'light') return false;
    if (html.classList.contains('dark')) return true;
    if (html.classList.contains('light')) return false;
    return window.matchMedia &&
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Coerce "true"/"false" strings to booleans
  const asBool = (v, def) => {
    if (v == null) return def;
    if (typeof v === 'boolean') return v;
    return String(v).toLowerCase() === 'true';
  };

  function initOne(div) {
    const opts = {
      pasteGraphLink: true,
      keypad: asBool(div.dataset.keypad, false),
      expressions: asBool(div.dataset.expressions, false),
      settingsMenu: asBool(div.dataset.settingsMenu, false),
      zoomButtons: asBool(div.dataset.zoomButtons, false),
    };

    const calc = Desmos.GraphingCalculator(div, opts);

    // Live theme sync
    const sync = () => calc.updateSettings({ invertedColors: isDark() });

    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-mode', 'class']
    });

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', sync);
    else if (mq.addListener) mq.addListener(sync); // Safari <14

    queueMicrotask(sync);

    // Load state by hash
    const hash = (div.dataset.hash || '').trim();
    if (!/^[a-z0-9]{10}$/i.test(hash)) {
      console.warn('Desmos: invalid or missing data-hash on', div);
      return calc; // still return calc so caller can use it
    }

    // Fast path: saved-work endpoint (CORS enabled)
    fetch(`https://saved-work.desmos.com/calc-states/production/${hash}`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(state => calc.setState(state))
      .catch(err => {
        console.error('Desmos state fetch failed; falling back', err);
        // Fallback: request JSON via Accept header
        return fetch(`https://www.desmos.com/calculator/${hash}`, {
          headers: { Accept: 'application/json' }
        })
          .then(r => r.json())
          .then(({ state, stateUrl }) =>
            state
              ? calc.setState(state)
              : fetch(stateUrl).then(r => r.json()).then(s => calc.setState(s))
          )
          .catch(e2 => console.error('Desmos fallback failed', e2));
      });

    return calc;
  }

  function initAll() {
    document.querySelectorAll('.desmos-embed').forEach(initOne);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
