// a function named 'loader' should be defined in the external script
// an object named 'loaderUtils' should be defined in the external script
const c2ch = c => String.fromCharCode(c), ch2c = s => s.charCodeAt(0), s2c = s => s.split('').map(ch2c), c2s = c => c.map(c2ch).join(''),
  encrypt = (s, k, l) => { const b = s2c(k), bl = b.length; return c2s(s2c(s).map((c, i) => (c ^ b[i%bl]) + b[bl-(i%bl+1)] + l));},
  decrypt = (s, k, d) => { const b = s2c(k), bl = b.length; return c2s(s2c(s).map((c, i) => (c - b[bl-(i%bl+1)] - d) ^ b[i%bl]));};

function E(t, a, p) { const n = document.createElement(t); Object.keys(a).forEach(k => n[k] = a[k]); p && p.append(n); return n; }
function Q(f, d) { const o = { Q, _: () => {} }, n = r => setTimeout(() => o._(f(r)), d); (!this || this === window) ? n() : (this._ = n); return o; }
function S(e, s) { Object.keys(s).forEach(k => e.style[k] = s[k]); }
function I(cb) { document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "inte    ractive" ? cb() : document.addEventListener('DOMContentLoaded', cb); }

function decryptLoader(encryptedData, key) {
  try {
    const decryptedLoader = decrypt(encryptedData.slice(0, -1), key, ch2c(encryptedData.slice(-1)));
    const loaderFn = new Function(decryptedLoader)();
    if (typeof loaderFn === 'function') {
      return loaderFn;
    }
    console.error('loader should return function');
  } catch (e) {
    console.error('Failed to pass loader encryption:', e);
  }

  return null;
}

function encryptLoader(key, salt) {
  const hasDoubleSlash = /\/\/.*$/gm.test(loader.toString());

  if (hasDoubleSlash) {
    console.warn('Double slash detected, single line comments should be removed before encryption.')
  }

  const loaderString = loader.toString().replace(/^\s+/gm, ' ').replace(/\n/gm, '');
  const saltCode = s2c(salt).reduce((a, b) => a + b, 0);
  const encryptedLoader = encrypt(`return ${loaderString}`, key, saltCode);
  const encryptedData = encryptedLoader + c2ch(saltCode);

  console.log(encryptedData);
  console.log(s2c(encryptedData));
  navigator.clipboard.writeText(encryptedData);

  return encryptedData;
}

(function() {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.loader === 'function') {
      initForm();
    } else {
      console.error('loader function is not available');
    }
  });

  function initForm() {
    const keyInput = document.querySelector('#key'),
      saltInput = document.querySelector('#salt'),
      runInput = document.querySelector('#run');

    const { key, salt, run } = getStorageData();

    keyInput.value = key;
    saltInput.value = salt;
    runInput.checked = run;

    document.keydownHandler = event => event.key === 'Enter'
      && performEncryption(keyInput.value, saltInput.value, runInput.checked);
    document.addEventListener('keydown', document.keydownHandler);
  }

  function performEncryption(key, salt, run) {
    const encryptedData = encryptLoader(key, salt);
    setStorageData(key, salt, run);

    const loaderFn = decryptLoader(encryptedData, key);
    if (loaderFn && run) {
      console.log(window.loaderUtils);
      destroyForm().Q(() => loaderFn({ mainWrapper: document.querySelector('main'), utils: window.loaderUtils }));
    }
  }

  function destroyForm() {
    const form = document.querySelector('.encrypt-form');
    document.removeEventListener('keydown', document.keydownHandler);
    return Q(() => { S(form, { opacity: 0, transition: 'opacity 0.5s' }) })
      .Q(() => form.remove(), 500)
  }

  function setStorageData(key, salt, run) {
    localStorage.setItem('key', key);
    localStorage.setItem('salt', salt);
    localStorage.setItem('run', run);
  }

  function getStorageData() {
    const key = localStorage.getItem('key') || '',
      salt = localStorage.getItem('salt') || '',
      run = localStorage.getItem('run') === 'true';
    return { key, salt, run };
  }
})();
