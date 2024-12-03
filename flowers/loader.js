function loader() {
  function Q(f, d) {
    const o = { Q, _: () => {} }, n = r => setTimeout(() => o._(f(r)), d);
    (!this || this === window) ? n() : (this._ = n);
    return o;
  }
  function E(t, a, p) { const n = document.createElement(t); Object.keys(a).forEach(k => n[k] = a[k]); p && p.append(n); return n; }

  function I(cb) { document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive" ? cb() : document.addEventListener('DOMContentLoaded', cb); }

  function S(e, s) { Object.keys(s).forEach(k => e.style[k] = s[k]); }

  function rnd(a = 0, b = 0) {
    return Math.floor(Math.random() * (Math.abs(a - b) + 1) + Math.min(a, b));
  }

  function rndOf(object) {
    const keys = Object.keys(object || {});
    return keys.length ? object[keys[rnd(keys.length - 1)]] : undefined;
  }

  function toggleClassName(element, className, state) {
    const hasClassName = element.className.indexOf(className) >= 0;
    if (hasClassName ? state === undefined : state === true) {
      element.className += ` ${className}`;
    } else if (hasClassName ? state === false : state === undefined) {
      element.className = element.className.replaceAll(className, '').trim();
    }
  }

  function initStyles() {
    E('style', { textContent: `
html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #eee;
    overflow: hidden;
}       
body {
    background-color: #062;
    box-shadow: 0 0 max(50vw, 50vh) #000 inset;
    will-change: background-color;
    transition: background-color 1s;
}
body.black {
    background-color: #111;
}
* {
    -webkit-user-select: none;
    -moz-user-select: none;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
}
.field {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.flower {
    position: absolute;
    z-index: 0;
    font-size: 30px;
    width: 1em;
    height: 1em;
    will-change: top, left, width, height;
    display: block;
    pointer-events: none;
}
.petal {
    position: absolute;
    top: 0;
    left: 40%;
    width: 20%;
    height: 40%;
    border-radius: 100%;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5), inset 0 0 2px 0 rgba(0, 0, 0, 0.5);
    transform-origin: center 125%;
}
.edged .petal::after {
    content: '';
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: block;
    border-radius: inherit;
    background-image: radial-gradient(ellipse farthest-side at 50% 100%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.8) 90%);
}
.center {
    position: absolute;
    z-index: 2;
    left: 37%;
    top: 37%;
    width: 26%;
    height: 26%;
    border-radius: 50%;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
}
.field.black .flower:not(.white) .petal {
    background-image: linear-gradient(0deg, black, grey);
}
.field.black .flower.edged:not(.white) .petal::after {
    background-image: radial-gradient(ellipse farthest-side at 50% 100%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.6) 90%);
}
.field.black .flower:not(.camomile):not(.aster) .center {
    background-image: radial-gradient(circle closest-side at 50% 50%, #444 20%, #ddd 70%);
}
.field.black .flower.aster .center {
    background-image: radial-gradient(circle, #ddd, #bbb 50%, #eee);
}
.flower.clickable {
    z-index: 1;
}
.flower.clickable .petal {
    cursor: pointer;
    transition: top 2s linear, transform 2s linear;
    will-change: top, left, transform;
    pointer-events: all;
}
.flower.clickable .center {
    z-index: 3;
}
.flower.scarlet .petal {
    background-image: linear-gradient(0deg, #a22, #f33);
}
.flower.red .petal {
    background-image: linear-gradient(0deg, #f13, #f63);
}
.flower.orange .petal {
    background-image: linear-gradient(0deg, #f70, #fa5);
}
.flower.yellow .petal {
    background-image: linear-gradient(0deg, #fe2, #eb0);
}
.flower.cyan .petal {
    background-image: linear-gradient(0deg, #39d, #7df);
}
.flower.blue .petal {
    background-image: linear-gradient(0deg, #03c, #37e);
}
.flower.azure .petal {
    background-image: linear-gradient(0deg, #25c, #3ae);
}
.flower.violet .petal {
    background-image: linear-gradient(0deg, #73d, #b7e);
}
.flower.pink .petal {
    background-image: linear-gradient(0deg, #a28, #f6d);
}
.flower.white .petal {
    background-image: linear-gradient(0deg, #ddd, #fff);
}
.flower .center,
.flower.red .center,
.flower.scarlet .center,
.flower.orange .center {
    background-image: radial-gradient(circle closest-side at 50% 50%, #613 20%, #eb4 70%);
}
.flower.yellow .center {
    background-image: radial-gradient(circle closest-side at 50% 50%, #613 20%, #e93 70%);
}
.flower.cyan .center {
    background-image: radial-gradient(circle closest-side at 50% 50%, #613 20%, #db5 70%);
}
.flower.blue .center,
.flower.azure .center {
    background-image: radial-gradient(circle closest-side at 50% 50%, #613 20%, #d75 70%);
}
.flower.violet .center {
    background-image: radial-gradient(circle closest-side at 50% 50%, #613 20%, #d95 70%);
}
.flower.white .center,
.flower.pink .center {
    background-image: radial-gradient(circle closest-side at 50% 50%, #613 20%, #ea5 70%);
}
.aster .petal,
.camomile .petal {
    left: 46%;
    width: 8%;
    height: 40%;
    border-radius: 40%;
    background: #fff;
}
.aster .petal.odd,
.camomile .petal.odd {
    z-index: 1;
}
.flower.aster .center,
.flower.camomile .center {
    left: 37%;
    top: 37%;
    width: 26%;
    height: 26%;
    background-image: radial-gradient(circle, #ed0, #dc0 50%, #ee0);
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2), inset -1px -1px 1px 0 rgba(0, 0, 0, 0.1), inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3);
}
.forgetMeNot .petal {
    left: 35%;
    width: 30%;
    height: 40%;
    background-image: linear-gradient(0deg, #07d, #08e, #09e);
}
.forgetMeNot .center {
    left: 38%;
    top: 38%;
    width: 24%;
    height: 24%;
    background-image: radial-gradient(circle, #222 0%, #ed0 40%, #dc0 50%, #ee0);
}
.viola .petal {
    left: 17%;
    width: 66%;
    height: 45%;
    transform-origin: center 110%;
}
.viola .center {
    left: 40%;
    top: 40%;
    width: 20%;
    height: 20%;
    background-image: radial-gradient(circle at 50% 50%, #520, #eb4 25%, #fe6);
}
.button {
    display: block;
    position: fixed;
    z-index: 2;
    top: -100px;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: transparent;
}
.button-black {
    right: -100px;
}
.button-repaint {
    left: -100px;
}`
    }, document.head);
  }

  const CAMOMILE_FLOWER_TYPE = 'camomile';
  const flowersModule = (function() {
    const COLORS = {
      RED: 'red',
      SCARLET: 'scarlet',
      ORANGE: 'orange',
      YELLOW: 'yellow',
      CYAN: 'cyan',
      BLUE: 'blue',
      AZURE: 'azure',
      VIOLET: 'violet',
      PINK: 'pink',
      WHITE: 'white',
    };
    const COLOR_KEYS = Object.keys(COLORS);

    /*
     * Flower Template Config
     * Note: flowers are generated from the biggest to the smallest, filling the empty space so, that they do not overlap.
     *
     * @type {string} - predefined string, defining flower CSS class and behavior (camomile-specific);
     * @colors {string} - array of predefined strings with applicable colors names, defining color CSS class modifier;
     * @sizes {[number, number]} - pair of numbers, defining the min and max size of flower (in px);
     * @petals {[number, number]} - pair of numbers, defining the min and max number of generated petals;
     * @deviation {number} - value of random angle deviation for a petal;
     * @density {number} - ratio, which defines the amount of flowers per page;
     * @edged {boolean} - force or prohibit the white edge of a petal, random by default;
     * @odd {boolean} - make petals look less strict, placing on different layers;
     * @clickable {boolean} - drop petals on click;
     */
    const FLOWERS = {
      CAMOMILE: {
        type: CAMOMILE_FLOWER_TYPE,
        colors: [COLORS.WHITE],
        sizes: [150, 200],
        petals: [20, 30],
        deviation: 2,
        density: 0.33,
        edged: true,
        odd: true,
        clickable: true,
      },
      ASTER: {
        type: 'aster',
        colors: COLOR_KEYS.filter(key => key !== 'WHITE' && key !== 'YELLOW').map(key => COLORS[key]),
        sizes: [80, 100],
        petals: [20, 25],
        deviation: 2,
        density: 0.2,
        odd: true,
      },
      VIOLA: {
        type: 'viola',
        colors: COLOR_KEYS.filter(key => key !== 'WHITE').map(key => COLORS[key]),
        sizes: [30, 70],
        petals: [3, 3],
        deviation: 5,
        density: 0.2,
        odd: false,
      },
      DEFAULT: {
        type: 'default',
        colors: COLOR_KEYS.map(key => COLORS[key]),
        sizes: [30, 60],
        petals: [5, 10],
        deviation: 2,
        density: 0.4,
        odd: true,
      },
      FORGET_ME_NOT: {
        type: 'forgetMeNot',
        colors: COLOR_KEYS.map(key => COLORS[key]),
        sizes: [20, 40],
        petals: [5, 5],
        edged: false,
        deviation: 2,
        density: 0.4,
        odd: false,
      },
    };

    const FLOWER_KEYS = Object.keys(FLOWERS);

    function Petal(params) {
      const className = 'petal';
      const zIndex = params.odd ? rnd(-1, 0) : 0;
      const deviation = params.deviation ? rnd(-params.deviation, params.deviation) : 0;
      const rotate = parseInt((params.index || 0) * 360 / params.count + params.rotate + deviation, 10) ;
      const style = `z-index: ${zIndex}; transform: rotate(${rotate}deg);`;

      this.flower = params.flower;
      this.element = E('span', { className, style }, params.flower.element);
    }

    function Flower(params) {
      const colorMod = params.color;
      const edgedMod = params.edged === true || (params.edged !== false && rnd(1)) ? 'edged' : '';
      const clickableMod = params.clickable ? 'clickable' : '';

      this.field = params.field;
      this.type = params.type || FLOWERS.DEFAULT.type;
      this.x = params.x;
      this.y = params.y;
      this.size = params.size;
      this.clickable = params.clickable;
      this.rendered = false;
      this.rotate = params.petals ? rnd(Math.round(360 / params.petals)) : 0;
      this.className = `flower ${this.type} ${colorMod} ${edgedMod} ${clickableMod}`;
      this.style = `left: ${this.x}px; top: ${this.y}px; font-size: ${this.size}px;`;
      this.element = E('div', { className: this.className, style: this.style });
      this.center = E('span', { className: 'center' }, this.element);
      this.petals = this.createPetals(params);

      if (params.clickable) { this.addPetalDropHandler(params); }
    }

    Flower.dropPetal = function(element) {
      const deg = Number(element.style.transform.replace(/\D/g, '')) || 0;
      const newDeg = deg > 0 && deg < 180 ? deg + 180 : deg - 180;

      S(element, { zIndex: 2, transform: `rotate(${newDeg}deg)`, top: '100vh', pointerEvents: 'none' });
    };

    Flower.prototype.addPetalDropHandler = function(params) {
      this.element.addEventListener('transitionend', e => {
        if (e.propertyName === 'top' && e.target.className.indexOf('petal') > -1) {
          this.petals = this.petals.filter(petal => petal.element !== e.target);
          e.target.remove();
          if (!this.petals.length) { this.petals = this.restorePetals(params); }
        }
      })
    };

    Flower.prototype.generatePetal = function(params, index) {
      return new Petal({
        index,
        rotate: this.rotate,
        deviation: params.deviation,
        odd: params.odd,
        count: params.petals,
        flower: this,
      });
    };

    Flower.prototype.createPetals = function(params) {
      return Array.apply(null, Array(params.petals)).map((_, index) => this.generatePetal(params, index));
    };

    Flower.prototype.restorePetals = function(params) {
      const petals = Array.apply(null, Array(params.petals));
      petals.reduce(
        (q, _, index) => q.Q(() => petals[index] = this.generatePetal(params, index), 20),
        Q(() => {}),
      );

      return petals;
    };

    Flower.prototype.render = function() {
      if (!this.rendered) {
        this.rendered = true;
        this.field.element.appendChild(this.element);
        return true;
      }
      return false;
    };

    function Field(parentElement) {
      let resizeDebounce;

      this.black = false;
      this.autoRender = false;
      this.element = E('div', { className: 'field' });
      this.parentElement = parentElement;
      this.width = 0;
      this.height = 0;
      this.flowers = [];

      this.refreshSize();

      window.addEventListener('click', e => {
        const targetClass = e.target.className;
        const parentClass = e.target.parentElement && e.target.parentElement.className;

        if (typeof targetClass === 'string' && targetClass.indexOf('petal') >= 0 && typeof parentClass === 'string' && parentClass.indexOf('clickable') >= 0) {
          Flower.dropPetal(e.target);
        }
      });
      window.addEventListener('resize', () => {
        clearTimeout(resizeDebounce);
        resizeDebounce = setTimeout(() => this.resizeHandler(), 300);
      });
    }

    Field.prototype.refreshSize = function() {
      this.width = this.parentElement?.offsetWidth;
      this.height = this.parentElement?.offsetHeight;
    };

    Field.prototype.resizeHandler = function() {
      const oldWidth = this.width;
      const oldHeight = this.height;

      this.refreshSize();

      const growWidth = oldWidth < this.width;
      const growHeight = oldHeight < this.height;
      const shrinkWidth = oldWidth > this.width;
      const shrinkHeight = oldHeight > this.height;

      if (shrinkWidth || shrinkHeight) { this.cropFlowers(); }
      if (growWidth) {
        this.createFlowers({ left: oldWidth, right: this.width, top: 0, bottom: this.height });
      }
      if (growHeight) {
        this.createFlowers({ left: 0, right: this.width, top: oldHeight, bottom: this.height })
      }
      if (growWidth && growHeight) {
        this.createFlowers({ left: oldWidth, right: this.width, top: oldHeight, bottom: this.height })
      }
      if ((growHeight || growWidth) && this.autoRender) {
        this.renderFlowers();
      }
    };

    Field.prototype.fillFlowers = function(typeKey, limit, fillRect) {
      let flower = null;
      let counter = 0;

      do {
        flower = counter < limit ? this.fillFlowerByType(typeKey, fillRect) : null;
        if (flower) {
          this.flowers.push(flower);
          counter++;
        }
      } while (flower);

      return counter;
    };

    Field.prototype.fillFlowerByType = function(typeKey, fillRect) {
      const retryLimit = 100;
      const flowerTemplate = FLOWERS[typeKey] || FLOWERS.DEFAULT;
      const size = rnd.apply(null, flowerTemplate.sizes);

      const flowerParams = {
        size,
        type: flowerTemplate.type,
        color: rndOf(flowerTemplate.colors),
        petals: rnd.apply(null, flowerTemplate.petals),
        edged: typeof flowerTemplate.edged === 'boolean' ? flowerTemplate.edged : !rnd(1),
        deviation: flowerTemplate.deviation,
        odd: flowerTemplate.odd,
        field: this,
        clickable: flowerTemplate.clickable,
      };

      const isCamomile = flowerTemplate.type === CAMOMILE_FLOWER_TYPE;
      const plantRect = {
        left: fillRect.left - (isCamomile ? 0 : size / 2),
        right: fillRect.right - (isCamomile ? size : size / 2),
        top: fillRect.top - (isCamomile ? 0 : size / 2),
        bottom: fillRect.bottom - (isCamomile ? size : size / 2),
      };

      let spaceAvailable = false;
      let counter = 0;
      do {
        flowerParams.x = rnd(plantRect.left, plantRect.right);
        flowerParams.y = rnd(plantRect.top, plantRect.bottom);
        spaceAvailable = this.checkSpace(flowerParams);
        counter++;
      } while (counter < retryLimit && !spaceAvailable);

      return spaceAvailable ? new Flower(flowerParams) : null;
    };
    Field.prototype.checkSpace = function(params) {
      const halfSize = params.size / 2;

      return this.flowers.every(flower => {
        const halfFlower = flower.size / 2;
        const distance = flower.type === params.type || flower.color === params.color
          ? halfFlower + halfSize
          : Math.max(halfFlower, halfSize);

        return Math.abs(params.x + halfSize - flower.x - halfFlower) > distance
          || Math.abs(params.y + halfSize - flower.y - halfFlower) > distance;
      });
    };
    Field.prototype.createFlowers = function(customRect) {
      const fillRect = customRect || { left: 0, right: this.width, top: 0, bottom: this.height };
      const fillArea = (fillRect.right - fillRect.left) * (fillRect.bottom - fillRect.top);

      FLOWER_KEYS
        .sort((keyA, keyB) => FLOWERS[keyB].sizes[1] - FLOWERS[keyA].sizes[1])
        .forEach(key => {
          const config = FLOWERS[key];
          const flowerMaxArea = Math.pow(config.sizes[1], 2);
          const limit = Math.round(fillArea * (config.density || 1) / flowerMaxArea);
          this.fillFlowers(key, limit, fillRect);
        });
    };
    Field.prototype.cropFlowers = function () {
      this.flowers = this.flowers.filter(flower => {
        if (flower.x < this.width && flower.y < this.height) { return true; }
        flower.rendered = true;
        flower.element.remove();
      });
    };
    Field.prototype.render = function() {
      this.refreshSize();
      this.createFlowers();
      this.parentElement.appendChild(this.element);
    };
    Field.prototype.repaint = function() {
      this.clearFlowersQueue()
        .Q(() => {
          this.createFlowers();
          this.setAutoRender(true);
        });
    };
    Field.prototype.clearFlowersQueue = function() {
      this.setAutoRender(false);
      this.flowers.forEach(flower => flower.rendered = true);

      return Array.apply(null, Array(this.flowers.length)).reduce(
        q => q.Q(() => {
          const flower = this.flowers.splice(rnd(this.flowers.length - 1), 1)[0];
          if (flower) { flower.element.remove(); }
        }, 0),
        Q(() => {}, 0),
      ).Q(() => this.flowers = []);
    };
    Field.prototype.renderFlowers = function(renderCount) {
      const bunch = [];

      if (renderCount) {
        const notRendered = this.flowers.filter(flower => !flower.rendered);
        while (notRendered.length > 0 && bunch.length < renderCount) {
          bunch.push(notRendered.splice(rnd(notRendered.length - 1), 1)[0]);
        }
      } else {
        Object.assign(bunch, this.flowers);
        const lastIndex = bunch.length - 1;
        let index = 0;
        let rndIndex;

        while (index < lastIndex) {
          const temp = bunch[index];
          rndIndex = rnd(index + 1, lastIndex);
          bunch[index] = bunch[rndIndex];
          bunch[rndIndex] = temp;
          index += 1;
        }
      }

      bunch.filter(flower => !flower.rendered)
        .reduce((q, flower) => q.Q(() => flower.render(), renderCount || 0), Q(() => {}));
    };
    Field.prototype.setAutoRender = function(state) {
      if (this.autoRender !== state) {
        this.autoRender = state;
        if (this.autoRender) { this.renderFlowers(); }
      }
    };
    Field.prototype.toggleBlack = function() {
      this.black = !this.black;
      Q(() => toggleClassName(document.body, 'black', this.black))
        .Q(() => toggleClassName(this.element, 'black', this.black), 1000);
    };

    return new Field(document.body);
  })();

  const buttonsModule = (function () {
    function Buttons() {
      this.buttonBlack = E('button', { className: 'button button-black' });
      this.buttonRepaint = E('button', { className: 'button button-repaint' });
    }

    Buttons.prototype.renderBlackButton = function() {
      document.body.appendChild(this.buttonBlack);
      this.buttonBlack.addEventListener('click', e => {
        e.stopPropagation();
        flowersModule.toggleBlack();
      });
    };
    Buttons.prototype.renderRepaintButton = function() {
      document.body.appendChild(this.buttonRepaint);
      this.buttonRepaint.addEventListener('click', e => {
        e.stopPropagation();
        flowersModule.repaint();
      });
    };

    return new Buttons();
  })();


  I(() => {
    initStyles();
    buttonsModule.renderBlackButton();
    buttonsModule.renderRepaintButton();
    flowersModule.render();
    Q(() => flowersModule.setAutoRender(true), 500);
  });
}
