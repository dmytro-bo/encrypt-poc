var code2char = code => String.fromCharCode(code),
  char2code = char => char.charCodeAt(0),
  str2code = str => str.split('').map(char2code),
  code2str = codeList => codeList.map(code2char).join('');

var encrypt = (str, key, delta) => {
    const bKey = str2code(key), bKeyLength = bKey.length;
    return code2str(str2code(str).map((charCode, index) => (charCode ^ bKey[index % bKeyLength]) + bKey[bKeyLength - (index % bKeyLength + 1)] + delta));
  },
  decrypt = (str, key, delta) => {
    const bKey = str2code(key), bKeyLength = bKey.length;
    return code2str(str2code(str).map((charCode, index) => (charCode - bKey[bKeyLength - (index % bKeyLength + 1)] - delta) ^ bKey[index % bKeyLength]));
  };

var c2ch = c => String.fromCharCode(c), ch2c = s => s.charCodeAt(0), s2c = s => s.split('').map(ch2c), c2s = c => c.map(c2ch).join(''),
  encrypt = (s, k, d) => { const b = s2c(k), bl = b.length; return c2s(s2c(s).map((c, i) => (c ^ b[i%bl]) + b[bl-(i%bl+1)] + d));},
  decrypt = (s, k, d) => { const b = s2c(k), bl = b.length; return c2s(s2c(s).map((c, i) => (c - b[bl-(i%bl+1)] - d) ^ b[i%bl]));};

function Q(f, d) { const o = { Q, _: () => {} }, n = r => setTimeout(() => o._(f(r)), d); (!this || this === window) ? n() : (this._ = n); return o; }
function E(t, a, p) { const n = document.createElement(t); Object.keys(a).forEach(k => n[k] = a[k]); p && p.append(n); return n; }
function S(e, s) { Object.keys(s).forEach(k => e.style[k] = s[k]); }
