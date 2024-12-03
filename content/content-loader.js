window.loaderUtils = {
  Q,
  S,
}

function loader(data) {
  const Q = data.utils.Q;
  const S = data.utils.S;

  function E(t, a, p) { const n = document.createElement(t); Object.keys(a).forEach(k => n[k] = a[k]); p && p.append(n); return n; }
  function I(initCb) {
    if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive") {
      initCb();
    } else {
      document.addEventListener('DOMContentLoaded', initCb);
    }
  }

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

  const bgColor = '#062';
  const CAMOMILE_FLOWER_TYPE = 'camomile';
  const AUTO_RENDER_MARKER = Symbol('auto_render');
  const PETAL_FALL_MARKER = Symbol('petal_fall');

  function initStyles() {
    E('style', { textContent: `
* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

body::after {
  color: rgba(255, 255, 255, 0.05);
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 2;
  border: none;
  outline: none;
  cursor: pointer;
  transform-origin: center center;
  padding: 0;
  margin: 0;
}
.button-play {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  color: transparent;
  font: bold 120px sans-serif;
  line-height: 1;
  text-shadow: 0 0 1em transparent, 0 0 1em transparent;
  transition: text-shadow 0.3s linear, transform 0.3s;
  will-change: text-shadow, transform;
  pointer-events: none;
}
.button-play:hover {
  transform: translate(-50%, -50%) scale(1.3);
}
.button-play.show {
  pointer-events: all;
  text-shadow: 0 0 0 #fff, 0 0 0.25em #fff;
  transition: text-shadow 2s linear, transform 0.3s
}

.button-black {
  font: bold 20px sans-serif;
  transition: transform 0.3s;
  will-change: transform;
  right: 20px;
  top: 20px;
  width: 4em;
  height: 4em;
  opacity: 0;
  border-radius: 50%;
  background-color: #ddd;
  background-image: linear-gradient(135deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  box-shadow: inset 1px 1px 2px -1px rgba(255, 255, 255, 0.5), inset -1px -1px 2px -1px rgba(0, 0, 0, 0.5), 3px 3px 10px -5px rgba(0, 0, 0, 0.7);
  transition: opacity 0.5s;
  will-change: opacity;
  pointer-events: none;
}
.button-black.show {
  opacity: 0.4;
  transition: opacity 2s;
  pointer-events: all;
}
.button-black.show:hover {
  opacity: 1;
  transition: opacity 0.3s;
}
.button-black-message {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 92%;
  height: 92%;
  overflow: hidden;
  color: transparent;
  border-radius: 50%;
  background-color: #333;
  background-image: linear-gradient(315deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  transition: background-color 0.5s;
  box-shadow: 2px 2px 2px -1px rgba(255, 255, 255, 0.5), -2px -2px 2px -2px rgba(0, 0, 0, 0.5);
}
.button-black-message:active {
  background-color: #777;
}
.button-black-message::before {
  content: 'Black?';
  color: transparent;
  text-shadow: 0 0 1px #ddd;
  white-space: nowrap;
}
.button-black-message.back {
  background-color: ${bgColor};
}
.button-black-message.back::before  {
  content: 'Back?';
}
.button-black-message.back:active {
  background-color: #0a4;
}
.button-black-glass {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: inset 10px 10px 30px 10px rgba(0, 0, 0, 0.8);
  cursor: pointer;
}
.button-black-glass::after {
  content: '';
  position: absolute;
  left: 3%;
  top: 3%;
  width: 94%;
  height: 94%;
  border-radius: 50%;
  display: block;
  background-image: linear-gradient(135deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3) 15%, rgba(255, 255, 255, 0) 22%, rgba(255, 255, 255, 0) 81.5%, rgba(255, 255, 255, 0.3) 85%);
}

.button-repaint {
  left: 20px;
  top: 0px;
  background: transparent;
  color: #fff;
  font: 80px sans-serif;
  line-height: 1;
  text-shadow: 0 0 10px #000, 0 0 0.2em #fff;
  will-change: opacity;
  pointer-events: none;
  transition: opacity 0.5s;
  opacity: 0;
}
.button-repaint.show {
  transition: opacity 2s;
  pointer-events: all;
  opacity: 0.4;
}
.button-repaint.show:hover {
  opacity: 1;
  transition: opacity 0.3s;
}

.button-like {
  left: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  background: transparent;
  color: #fff;
  font: 20px sans-serif;
  pointer-events: none;
  opacity: 0;
  transition: opacity 1s, transform 1s;
  transform: scale(1);
  will-change: opacity, transform;
  transform-origin: 50% 50%;
}
.button-like::after {
  content: 'like';
  text-shadow: 0 0 0.2em #fff;
}
.button-like.show {
  pointer-events: all;
  opacity: 0.4;
}
.button-like.pressed {
  opacity: 1;
  transition: opacity 0.5s, transform 0.5s;
  transform: scale(1.5);
}
.button-like.pressed::after {
  content: 'thx!';
}
.button-like svg {
  width: 2em;
  height: auto;
  filter: drop-shadow(0px 0px 2px rgba(255 255 255 / 1));
}
.button-like svg #beat {
  opacity: 0;
  will-change: opacity;
  transition: opacity 0.5s;
}
.button-like.pressed svg #beat {
  opacity: 1;
}
` }, document.head);
  }

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

    Flower.dropPetal = function(element) {
      const deg = Number(element.style.transform.replace(/\D/g, '')) || 0;
      const newDeg = deg > 0 && deg < 180 ? deg + 180 : deg - 180;

      S(element, { zIndex: 2, transform: `rotate(${newDeg}deg)`, top: '100vh', pointerEvents: 'none' });
    };
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
      this.width = this.parentElement?.offsetWidth;
      this.height = this.parentElement?.offsetHeight;
      this.flowers = [];

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
    Field.prototype.resizeHandler = function() {
      const oldWidth = this.width;
      const oldHeight = this.height;

      this.width = this.parentElement?.offsetWidth;
      this.height = this.parentElement?.offsetHeight;

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
    Field.prototype.toggleBlack = function(black) {
      this.black = black;
      Q(() => S(data.mainWrapper, { backgroundColor: black ? '#111' : bgColor }))
        .Q(() => toggleClassName(this.element, 'black', black), 1000);
    };

    return new Field(data.mainWrapper);
  })();

  const audioModule = (function() {
    const noteFrequencyMap = {
      'C0': 16.35, 'C#0': 17.32, 'D0': 18.35, 'D#0': 19.40, 'E0': 20.61, 'F0': 21.82, 'F#0': 23.12, 'G0': 24.50, 'G#0': 25.95, 'A0': 27.50, 'A#0': 29.13, 'B0': 30.87,
      'C1': 32.70, 'C#1': 34.65, 'D1': 36.95, 'D#1': 38.88, 'E1': 41.21, 'F1': 43.65, 'F#1': 46.25, 'G1': 49.00, 'G#1': 51.90, 'A1': 55.00, 'A#1': 58.26, 'B1': 61.74,
      'C2': 65.41, 'C#2': 69.30, 'D2': 73.91, 'D#2': 77.78, 'E2': 82.41, 'F2': 87.31, 'F#2': 92.50, 'G2': 98.00, 'G#2': 103.80, 'A2': 110.00, 'A#2': 116.54, 'B2': 123.48,
      'C3': 130.82, 'C#3': 138.59, 'D3': 147.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.62, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.00, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.96,
      'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
      'C5': 523.25, 'C#5': 554.36, 'D5': 587.32, 'D#5': 622.26, 'E5': 659.26, 'F5': 698.46, 'F#5': 739.98, 'G5': 784.00, 'G#5': 830.60, 'A5': 880.00, 'A#5': 932.32, 'B5': 987.75,
      'C6': 1046.50, 'C#6': 1108.70, 'D6': 1174.60, 'D#6': 1244.50, 'E6': 1318.50, 'F6': 1396.90, 'F#6': 1480.00, 'G6': 1568.00, 'G#6': 1661.20, 'A6': 1720.00, 'A#6': 1864.60, 'B6': 1975.50,
    };
    const lotrNotes = {
      tracks: [
        [
/* LotR */
          { R: 2.5, G: 0.2, F: 0.5, T: 'sine' },
          { n: 'D4', l: 1 / 8 },
          { n: 'E4', l: 1 / 8 },
          { n: 'F#4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 8 },
          { n: 'E4', l: 1 / 8 },
          { n: 'D4', l: 3 / 16 },
          { n: 'E4', l: 1 / 16 },
          { n: 'D4', l: 3 / 4 },

          { n: 'F#4', l: 1 / 8 },
          { n: 'A4', l: 1 / 8 },
          { n: 'B4', l: 1 / 4 },
          { n: 'D5', l: 1 / 4 },
          { n: 'C#5', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 },
          { n: 'F#4', l: 3 / 8 },
          { n: 'G4', l: 1 / 16 },
          { n: 'F#4', l: 1 / 16 },
          { n: 'E4', l: 1 / 4 },

          { n: 'D4', l: 1 / 8 },
          { n: 'E4', l: 1 / 8 },
          { n: 'F#4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 8 },
          { n: 'E4', l: 1 / 8 },
          { n: 'D4', l: 3 / 16 },
          { n: 'E4', l: 1 / 16 },
          { n: 'D4', l: 3 / 4 },

          { n: 'F#4', l: 1 / 8 },
          { n: 'A4', l: 1 / 8 },
          { n: 'B4', l: 1 / 2 },
          { n: 'A4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 },
          { n: 'F#4', l: 3 / 8 },
          { n: 'G4', l: 1 / 16 },
          { n: 'F#4', l: 1 / 16 },
          { n: 'E4', l: 1 / 2, i: AUTO_RENDER_MARKER },
          { n: 'D4', l: 3 / 4 },

          { n: 'D4', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'D5', l: 1 / 16 },
          { n: 'E4', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'E5', l: 1 / 16 },
          { n: 'F#4', o: 1 / 8, type: 'triangle', g: 0.1 },
          { n: 'F#5', l: 1 / 8 },
          { l: 3 / 8 },
          { n: 'F#5', l: 1 / 8 },
          { l: 1 / 8 },
          { n: 'F#5', l: 1 / 8 },
          { n: 'A5', l: 1 / 8 },
          { n: 'E5', l: 1 / 8 },
          { n: 'D5', l: 1 / 8 },
          { n: 'E5', l: 1 / 8 },
          { l: 1 / 2 },

          { n: 'A3', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'A4', l: 1 / 16 },
          { n: 'B3', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'B4', l: 1 / 16 },
          { n: 'C#4', o: 1 / 8, type: 'triangle', g: 0.1 },
          { n: 'C#5', l: 1 / 8 },
          { l: 1 / 8 },
          { n: 'C#5', l: 1 / 8 },
          { n: 'C#5', l: 1 / 8 },
          { n: 'D5', l: 1 / 8 },
          { l: 1 / 8 },
          { n: 'B4', l: 1 / 8 },
          { n: 'F#4', l: 1 / 4 },
          { l: 1 / 8 },
          { n: 'A4', l: 1 / 8 },
          { n: 'E4', l: 1 / 4, i: PETAL_FALL_MARKER },
          { l: 1 / 4 },

          { n: 'D4', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'D5', l: 1 / 16 },
          { n: 'E4', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'E5', l: 1 / 16 },
          { n: 'F#4', o: 1 / 8, type: 'triangle', g: 0.1 },
          { n: 'F#5', l: 1 / 8 },
          { l: 1 / 8 },
          { n: 'F#5', l: 1 / 8 },
          { l: 3 / 8 },
          { n: 'A5', l: 1 / 8 },
          { n: 'F#5', l: 1 / 8 },
          { n: 'E5', l: 1 / 8 },
          { l: 1 / 8 },
          { n: 'D5', l: 1 / 8 },
          { n: 'E5', l: 1 / 8 },
          { n: 'C#5', l: 1 / 8, i: PETAL_FALL_MARKER },
          { l: 1 / 8 },

          { n: 'C#4', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'C#5', l: 1 / 16 },
          { n: 'D4', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'D5', l: 1 / 16 },
          { n: 'C#4', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'C#5', l: 1 / 16 },
          { n: 'B3', o: 3 / 4, type: 'triangle', g: 0.1 },
          { n: 'B4', l: 3 / 4 },
          { l: 1 / 16},
          { n: 'F#3', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'F#4', l: 1 / 16 },
          { n: 'B3', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'B4', l: 1 / 16 },
          { n: 'C#4', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'C#5', l: 1 / 16 },
          { n: 'D4', o: 3 / 8, type: 'triangle', g: 0.1 },
          { n: 'D5', l: 3 / 8 },
          { n: 'C#4', o: 3 / 8, type: 'triangle', g: 0.1 },
          { n: 'C#5', l: 3 / 8, i: PETAL_FALL_MARKER },
          { l: 1 / 8 },
          { n: 'A4', l: 1 / 8 },
          { n: 'F#4', l: 3 / 8 },
          { n: 'G4', l: 1 / 16 },
          { n: 'F#4', l: 1 / 16 },
          { n: 'E4', l: 3 / 8 },
          { n: 'D4', l: 1 / 16 },
          { n: 'E4', l: 1 / 16 },
          { n: 'F#4', l: 3 / 4 },
          { l: 1 / 8 },
          { n: 'F#4', l: 1 / 16 },
          { n: 'G4', l: 1 / 16 },
          { n: 'A4', l: 1 / 2 },
          { n: 'E4', l: 1 / 2, i: PETAL_FALL_MARKER },

          { n: 'D#4', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'D#5', l: 1 / 16 },
          { n: 'E4', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'E5', l: 1 / 16 },
          { n: 'F#4', o: 1 / 8, type: 'triangle', g: 0.1 },
          { n: 'F#5', l: 1 / 8 },
          { l: 3 / 8 },
          { n: 'F#5', l: 1 / 8 },
          { l: 1 / 8 },
          { n: 'F#4', o: 1 / 8, type: 'triangle', g: 0.1 },
          { n: 'F#5', l: 1 / 8 },
          { n: 'E4', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'E5', l: 1 / 16 },
          { n: 'F#4', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'F#5', l: 1 / 16 },
          { n: 'G#5', l: 1 / 8 },
          { l: 1 / 8 },
          { n: 'G#5', l: 1 / 8 },
          { l: 1 / 8 },
          { n: 'G#5', l: 1 / 8 },
          { l: 1 / 8 },
          { n: 'G#5', l: 1 / 8, i: PETAL_FALL_MARKER },

          { n: 'F#4', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'F#5', l: 1 / 16 },
          { n: 'G#4', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'G#5', l: 1 / 16 },
          { n: 'A#4', o: 1 / 8, type: 'triangle', g: 0.1 },
          { n: 'A#5', l: 1 / 8 },
          { l: 1 / 4 },
          { n: 'A#5', l: 1 / 8 },
          { n: 'A#5', l: 1 / 4 },
          { n: 'A#5', l: 1 / 16 },
          { n: 'A#5', l: 1 / 16 },
          { n: 'A#5', l: 3 / 4, i: PETAL_FALL_MARKER },

          { l: 1 / 4 },
          { F: 0.5, T: 'triangle' },
          { n: 'D3', o: 1 / 4 },
          { n: 'D4', l: 1 / 8 },
          { l: 1 / 8 },
          { n: 'F#3', o: 1 / 4 },
          { n: 'F#4', l: 1 / 8 },
          { l: 1 / 8 },
          { n: 'D3', o: 1 / 8 },
          { n: 'D4', l: 1 / 16 },
          { l: 1 / 16 },
          { n: 'F#3', o: 1 / 8 },
          { n: 'F#4', l: 1 / 16 },
          { l: 1 / 16 },
          { l: 1 / 4 },
          { n: 'B3', o: 1 / 4 },
          { n: 'B4', l: 1 / 8, i: PETAL_FALL_MARKER },
          { l: 1 / 2 },

          { n: 'F#3', o: 1 / 8 },
          { n: 'F#4', l: 1 / 8 },
          { n: 'B3', o: 1 / 8 },
          { n: 'B4', l: 1 / 8 },
          { n: 'C#4', o: 1 / 8 },
          { n: 'C#5', l: 1 / 8 },
          { n: 'D4', o: 1 / 4 },
          { n: 'D5', l: 1 / 4 },
          { n: 'A3', o: 1 / 4 },
          { n: 'A4', l: 1 / 4 },
          { n: 'D4', o: 1 / 4 },
          { n: 'D5', l: 1 / 4 },
          { n: 'A3', o: 1 / 4 },
          { n: 'A4', l: 1 / 4 },
          { n: 'E4', o: 1 / 4 },
          { n: 'E5', l: 1 / 4, i: PETAL_FALL_MARKER },

          { F: 1, T: 'sine', G: 0.5 },
          { n: 'E5', l: 1 / 16 },
          { n: 'F#5', l: 1 / 16 },
          { n: 'G5', l: 1 / 8 },
          { n: 'G5', l: 1 / 4 },
          { n: 'D5', l: 1 / 16 },
          { n: 'E5', l: 1 / 16 },
          { n: 'F#5', l: 1 / 8 },
          { n: 'F#5', l: 1 / 4 },
          { n: 'A5', l: 1 / 4 },
          { n: 'F#5', l: 1 / 16 },
          { n: 'A5', l: 1 / 16 },
          { n: 'B5', l: 1 / 2 },

          { G: 0.3 },
          { l: 3 / 8 },
          { n: 'F#3', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'F#4', l: 1 / 16 },
          { n: 'B3', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'B4', l: 1 / 16 },
          { n: 'C#4', o: 1 / 16, type: 'triangle', g: 0.1 },
          { n: 'C#5', l: 1 / 16 },
          { n: 'D4', o: 3 / 8, type: 'triangle', g: 0.1 },
          { n: 'D5', l: 3 / 8 },
          { n: 'C#4', o: 3 / 8, type: 'triangle', g: 0.1 },
          { n: 'C#5', l: 3 / 8, i: PETAL_FALL_MARKER },
          { l: 1 / 8 },
          { n: 'A4', l: 1 / 8 },
          { n: 'F#4', l: 3 / 8 },
          { n: 'G4', l: 1 / 16 },
          { n: 'F#4', l: 1 / 16 },
          { n: 'E4', l: 3 / 8 },
          { n: 'F#4', l: 1 / 16 },
          { n: 'E4', l: 1 / 16 },
          { n: 'D3', o: 1 / 4, type: 'triangle', g: 0.05 },
          { n: 'D4', l: 1 / 8 },
          { l: 1 / 8 },
          { n: 'D3', o: 1 / 4, type: 'triangle', g: 0.05 },
          { n: 'D4', l: 1 / 8 },
          { l: 7 / 8 },

          { F: 0.5, G: 0.3 },
          { n: 'D3', o: 1 / 8, g: 0.05 },
          { n: 'D4', l: 1 / 8, i: PETAL_FALL_MARKER },
          { n: 'E3', o: 1 / 8, g: 0.05 },
          { n: 'E4', l: 1 / 8 },
          { n: 'F#3', o: 1 / 4, g: 0.05 },
          { n: 'F#4', l: 1 / 4 },
          { n: 'A3', o: 1 / 4, g: 0.05 },
          { n: 'A4', l: 1 / 4 },
          { n: 'F#3', o: 1 / 8, g: 0.05 },
          { n: 'F#4', l: 1 / 8 },
          { n: 'E3', o: 1 / 8, g: 0.05 },
          { n: 'E4', l: 1 / 8 },
          { n: 'D3', o: 3 / 16, g: 0.05 },
          { n: 'D4', l: 3 / 16 },
          { n: 'E3', o: 1 / 16, g: 0.05 },
          { n: 'E4', l: 1 / 16 },
          { n: 'D3', o: 3 / 4, g: 0.05 },
          { n: 'D4', l: 3 / 4, i: PETAL_FALL_MARKER },

          { n: 'F#3', o: 1 / 8, t: 'triangle', g: 0.02, f: 0 },
          { n: 'F#4', l: 1 / 8 },
          { n: 'A4', o: 1 / 8, t: 'triangle', g: 0.02, f: 0 },
          { n: 'A4', l: 1 / 8 },
          { n: 'B4', o: 1 / 4, t: 'triangle', g: 0.02, f: 0 },
          { n: 'B4', l: 1 / 4 },
          { n: 'D5', o: 1 / 4, t: 'triangle', g: 0.02, f: 0 },
          { n: 'D5', l: 1 / 4 },
          { n: 'C#5', o: 1 / 4, t: 'triangle', g: 0.02, f: 0 },
          { n: 'C#5', l: 1 / 4 },
          { n: 'A4', o: 1 / 4, t: 'triangle', g: 0.02, f: 0 },
          { n: 'A4', l: 1 / 4 },
          { n: 'F#4', o: 3 / 8, t: 'triangle', g: 0.02, f: 0 },
          { n: 'F#4', l: 3 / 8 },
          { n: 'G4', o: 1 / 16, t: 'triangle', g: 0.02, f: 0 },
          { n: 'G4', l: 1 / 16 },
          { n: 'F#4', o: 1 / 16, t: 'triangle', g: 0.02, f: 0 },
          { n: 'F#4', l: 1 / 16 },
          { n: 'E4', o: 1 / 4, t: 'triangle', g: 0.02, f: 0 },
          { n: 'E4', l: 1 / 4, i: PETAL_FALL_MARKER },

          { n: 'D4', o: 1 / 8, g: 0.05 },
          { n: 'D4', l: 1 / 8 },
          { n: 'E4', o: 1 / 8, g: 0.05 },
          { n: 'E4', l: 1 / 8 },
          { n: 'F#4', o: 1 / 4, g: 0.05 },
          { n: 'F#4', l: 1 / 4 },
          { n: 'A4', o: 1 / 4, g: 0.05 },
          { n: 'A4', l: 1 / 4 },
          { n: 'F#4', o: 1 / 8, g: 0.05 },
          { n: 'F#4', l: 1 / 8 },
          { n: 'E4', o: 1 / 8, g: 0.05 },
          { n: 'E4', l: 1 / 8 },
          { n: 'D4', o: 3 / 16, g: 0.05 },
          { n: 'D4', l: 3 / 16 },
          { n: 'E4', o: 1 / 16, g: 0.05 },
          { n: 'E4', l: 1 / 16 },
          { n: 'D4', o: 3 / 4, g: 0.05 },
          { n: 'D4', l: 3 / 4, i: PETAL_FALL_MARKER },

          { n: 'F#3', o: 1 / 8, t: 'triangle', g: 0.02, f: 0 },
          { n: 'F#4', l: 1 / 8 },
          { n: 'A3', o: 1 / 8, t: 'triangle', g: 0.02, f: 0 },
          { n: 'A4', l: 1 / 8 },
          { n: 'B3', o: 1 / 2, t: 'triangle', g: 0.02, f: 0 },
          { n: 'B4', l: 1 / 2 },
          { n: 'A3', o: 1 / 4, t: 'triangle', g: 0.02, f: 0 },
          { n: 'A4', l: 1 / 4 },
          { n: 'F#3', o: 1 / 4, t: 'triangle', g: 0.02, f: 0 },
          { n: 'F#4', l: 1 / 4 },
          { n: 'F#3', o: 3 / 8, t: 'triangle', g: 0.02, f: 0 },
          { n: 'F#4', l: 3 / 8 },
          { n: 'G3', o: 1 / 16, t: 'triangle', g: 0.02, f: 0 },
          { n: 'G4', l: 1 / 16 },
          { n: 'F#3', o: 1 / 16, t: 'triangle', g: 0.02, f: 0 },
          { n: 'F#4', l: 1 / 16, i: PETAL_FALL_MARKER },
          { n: 'E3', o: 1 / 2, t: 'triangle', g: 0.02, f: 0 },
          { n: 'E4', l: 1 / 2 },

          { T: 'triangle', G: 0.2, F: 0.1 },
          { n: 'D2', t: 'sine', o: 3 / 4, g: 0.3 },
          { n: 'D3', o: 3 / 8, g: 0.1  },
          { n: 'A3', o: 3 / 8, g: 0.1  },
          { n: 'D4', l: 3 / 8 },
          { n: 'D4', l: 1 / 16 },
          { n: 'D4', l: 1 / 16 },
          { n: 'C2', t: 'sine', o: 3 / 4, g: 0.3 },
          { n: 'C3', o: 3 / 8, g: 0.1  },
          { n: 'B#3', o: 3 / 8, g: 0.1  },
          { n: 'C4', l: 3 / 8 },
          { n: 'C4', l: 1 / 16 },
          { n: 'C4', l: 1 / 16 },
          { n: 'D2', t: 'sine', o: 3 / 2, g: 0.3 },
          { n: 'D3', o: 3 / 4, g: 0.1  },
          { n: 'A3', o: 3 / 4, g: 0.1  },
          { n: 'D4', l: 3 / 4, i: PETAL_FALL_MARKER },
          { l: 1 / 8 },
          { n: 'G4', l: 1 / 16 },
          { n: 'A4', l: 1 / 16 },
          { n: 'A#2', t: 'sine', o: 3 / 4, g: 0.3 },
          { n: 'A#3', o: 3 / 8 },
          { n: 'A#4', l: 3 / 8, g: 0.1 },
          { n: 'A4', l: 1 / 16 },
          { n: 'G4', l: 1 / 16 },
          { n: 'F2', t: 'sine', o: 3 / 4, g: 0.3 },
          { n: 'F3', o: 3 / 8, g: 0.1 },
          { n: 'F4', l: 3 / 8 },
          { n: 'G4', l: 1 / 16 },
          { n: 'A4', l: 1 / 16, i: PETAL_FALL_MARKER },
          { n: 'G2', t: 'sine', o: 1, g: 0.3 },
          { n: 'G3', o: 1 / 2, g: 0.1 },
          { n: 'G4', l: 1 / 2 },
          { n: 'F4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'D2', t: 'sine', o: 3 / 4, g: 0.3 },
          { n: 'D3', o: 3 / 4, g: 0.1  },
          { n: 'A3', o: 3 / 4, g: 0.1  },
          { n: 'D4', l: 3 / 8 },
          { n: 'D4', l: 1 / 16 },
          { n: 'D4', l: 1 / 16 },
          { n: 'C2', t: 'sine', o: 3 / 4, g: 0.3 },
          { n: 'C3', o: 3 / 8, g: 0.1  },
          { n: 'B#3', o: 3 / 8, g: 0.1  },
          { n: 'C4', l: 3 / 8 },
          { n: 'C4', l: 1 / 16 },
          { n: 'C4', l: 1 / 16, i: PETAL_FALL_MARKER },
          { n: 'D2', t: 'sine', o: 3 / 2, g: 0.3 },
          { n: 'D3', o: 3 / 4, g: 0.1  },
          { n: 'A3', o: 3 / 4, g: 0.1  },
          { n: 'D4', l: 3 / 4 },
          { l: 1 / 8 },
          { n: 'G4', l: 1 / 16 },
          { n: 'A4', l: 1 / 16 },
          { n: 'A#2', t: 'sine', o: 3 / 4, g: 0.3 },
          { n: 'A#3', o: 3 / 8 },
          { n: 'A#4', l: 3 / 8 },
          { n: 'A4', l: 1 / 16 },
          { n: 'A#4', l: 1 / 16 },
          { n: 'C3', t: 'sine', o: 3 / 4, g: 0.2 },
          { n: 'C4', o: 3 / 8 },
          { n: 'C5', l: 3 / 8 },
          { n: 'A#4', l: 1 / 16 },
          { n: 'C5', l: 1 / 16 },
          { n: 'D3', t: 'sine', o: 2, g: 0.1 },
          { n: 'D4', o: 3 / 2},
          { n: 'D5', l: 1 },
        ],
      ],
    };

    const holdNotes = {
      tracks: [
        [
          { R: 1.8, G: 0.2, F: 0.5, T: 'sine' },
          { l: 2 },

          { l: 1 / 2 + 1 / 8 + 1 / 16 },
          { n: 'A4', l: 1 / 16 },

          { n: 'B4', l: 1 / 4 + 1 / 8 },
          { n: 'A4', l: 1 / 8 },
          { n: 'G4', l: 1 / 8 },
          { n: 'F#4', l: 1 / 8 },

          { n: 'G4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },

          { n: 'B4', l: 1 / 12 },
          { n: 'A4', l: 1 / 12 },
          { n: 'G4', l: 1 / 12 },
          { n: 'A4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 },

          { n: 'G4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },

          { n: 'C5', l: 1 / 4 + 1 / 8 },
          { n: 'A4', l: 1 / 8 },
          { n: 'B4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },
/* 7 */
          { n: 'A4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 },

          { n: 'G4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 },
          { n: 'G4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },

          { n: 'F#4', l: 1 / 4 },
          { l: 1 / 4 },
          { l: 1 / 8 + 1 / 16 },
          { n: 'A4', l: 1 / 16 },

          { n: 'B4', l: 1 / 4 },
          { n: 'A4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },
          { n: 'A4', l: 1 / 8 + 1 / 16 },
          { n: 'F#4', l: 1 / 16 },

          { n: 'G4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 8 + 1 / 16 },
          { n: 'B4', l: 1 / 16 },

          { n: 'A4', l: 1 / 4 },
          { n: 'A4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },
          { n: 'A4', l: 1 / 8 + 1 / 16 },
          { n: 'F#4', l: 1 / 16 },
/* 13 */
          { n: 'G4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },

          { n: 'B4', l: 1 / 8 },
          { n: 'C5', l: 1 / 4 },
          { n: 'A4', l: 1 / 8 },
          { n: 'B4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },

          { n: 'A4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 },

          { n: 'G4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 },
          { n: 'G4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },

          { n: 'F#4', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 4 + 1 / 8 },


          { n: 'G4', l: 1 / 4 + 1 / 8 },
          { n: 'G4', l: 1 / 8 },
          { n: 'A4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },

          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
/* 20 */
          { n: 'G4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 + 1 / 8 },
          { n: 'G4', l: 1 / 8 },

          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },

          { n: 'C5', l: 1 / 2 },
          { n: 'B4', l: 1 / 8 },
          { n: 'A4', l: 1 / 8 },

          { n: 'G4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 8 },

          { n: 'G4', l: 1 / 4 + 1 / 8 },
          { n: 'G4', l: 1 / 8 },
          { n: 'A4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },

          { n: 'F#4', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 4 + 1 / 8 },

          { n: 'G4', l: 1 / 4 + 1 / 8 },
          { n: 'G4', l: 1 / 8 },
          { n: 'A4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },
/* 27 */
          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 8 },

          { n: 'G4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 + 1 / 8 },
          { n: 'G4', l: 1 / 8 },

          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },

          { n: 'C5', l: 1 / 4 },
          { n: 'B4', l: 1 / 4 },
          { n: 'A4', l: 1 / 8 + 1 / 16 },
          { n: 'A4', l: 1 / 16 },

          { n: 'G4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },

          { n: 'G4', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 4 + 1 / 8 },

          { n: 'G4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 },
/* 34 */
          { n: 'E4', l: 1 / 4 },
          { l: 1 / 4 + 1 / 4 },
/* Volta 35-40 */
          { n: 'B5', o: 1 / 8 + 1 / 16 }, { n: 'B4', l: 1 / 8 + 1 / 16 },
          { n: 'C6', o: 1 / 16 }, { n: 'C5', l: 1 / 16 },
          { n: 'D6', o: 1 / 8 + 1 / 16 }, { n: 'D5', l: 1 / 8 + 1 / 16 },
          { n: 'C6', o: 1 / 16 }, { n: 'C5', l: 1 / 16 },
          { n: 'B5', o: 1 / 4 }, { n: 'B4', l: 1 / 4 },

          { n: 'B5', o: 1 / 2 + 1 / 4 }, { n: 'B4', l: 1 / 2 + 1 / 4 },

          { n: 'B5', o: 1 / 8 + 1 / 16 }, { n: 'B4', l: 1 / 8 + 1 / 16 },
          { n: 'C6', o: 1 / 16 }, { n: 'C5', l: 1 / 16 },
          { n: 'D6', o: 1 / 8 + 1 / 16 }, { n: 'D5', l: 1 / 8 + 1 / 16 },
          { n: 'C6', o: 1 / 16 }, { n: 'C5', l: 1 / 16 },
          { n: 'B5', o: 1 / 4 }, { n: 'B4', l: 1 / 4 },

          { n: 'B5', o: 1 / 2 + 1 / 4 }, { n: 'B4', l: 1 / 2 + 1 / 4 },

          { n: 'B5', o: 1 / 8 + 1 / 16 }, { n: 'B4', l: 1 / 8 + 1 / 16 },
          { n: 'C6', o: 1 / 16 }, { n: 'C5', l: 1 / 16 },
          { n: 'D6', o: 1 / 8 + 1 / 16 }, { n: 'D5', l: 1 / 8 + 1 / 16 },
          { n: 'C6', o: 1 / 16 }, { n: 'C5', l: 1 / 16 },
          { n: 'B5', o: 1 / 4 }, { n: 'B4', l: 1 / 4 },

          { n: 'B5', o: 1 / 2 + 1 / 4 }, { n: 'B4', l: 1 / 2 + 1 / 4 },
/* 41 */
          { n: 'F#4', l: 0, o: 1 / 2 + 1 / 4 },
          { n: 'F#5', l: 1 / 2 + 1 / 4 },
/* 42 */
          { n: 'B#4', l: 0, o: 1 / 2 + 1 / 4 },
          { n: 'B#5', l: 1 / 2 + 1 / 4 },
/* Volta 35-40 */
          { n: 'B5', o: 1 / 8 + 1 / 16 }, { n: 'B4', l: 1 / 8 + 1 / 16 },
          { n: 'C6', o: 1 / 16 }, { n: 'C5', l: 1 / 16 },
          { n: 'D6', o: 1 / 8 + 1 / 16 }, { n: 'D5', l: 1 / 8 + 1 / 16 },
          { n: 'C6', o: 1 / 16 }, { n: 'C5', l: 1 / 16 },
          { n: 'B5', o: 1 / 4 }, { n: 'B4', l: 1 / 4 },

          { n: 'B5', o: 1 / 2 + 1 / 4 }, { n: 'B4', l: 1 / 2 + 1 / 4 },

          { n: 'B5', o: 1 / 8 + 1 / 16 }, { n: 'B4', l: 1 / 8 + 1 / 16 },
          { n: 'C6', o: 1 / 16 }, { n: 'C5', l: 1 / 16 },
          { n: 'D6', o: 1 / 8 + 1 / 16 }, { n: 'D5', l: 1 / 8 + 1 / 16 },
          { n: 'C6', o: 1 / 16 }, { n: 'C5', l: 1 / 16 },
          { n: 'B5', o: 1 / 4 }, { n: 'B4', l: 1 / 4 },

          { n: 'B5', o: 1 / 2 + 1 / 4 }, { n: 'B4', l: 1 / 2 + 1 / 4 },

          { n: 'B5', o: 1 / 8 + 1 / 16 }, { n: 'B4', l: 1 / 8 + 1 / 16 },
          { n: 'C6', o: 1 / 16 }, { n: 'C5', l: 1 / 16 },
          { n: 'D6', o: 1 / 8 + 1 / 16 }, { n: 'D5', l: 1 / 8 + 1 / 16 },
          { n: 'C6', o: 1 / 16 }, { n: 'C5', l: 1 / 16 },
          { n: 'B5', o: 1 / 4 }, { n: 'B4', l: 1 / 4 },

          { n: 'B5', o: 1 / 2 + 1 / 4 }, { n: 'B4', l: 1 / 2 + 1 / 4 },
/* 43 */
          { n: 'F#4', o: 1 / 4 + 1 / 8 }, { n: 'F#5', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 4 + 1 / 8 },

          { n: 'B4', l: 1 / 4 },
          { n: 'A4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },
          { n: 'A4', l: 1 / 8 + 1 / 16 },
          { n: 'F#4', l: 1 / 16 },

          { n: 'G4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },

          { n: 'B4', l: 1 / 12 },
          { n: 'A4', l: 1 / 12 },
          { n: 'G4', l: 1 / 12 },
          { n: 'A4', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 8 },

          { n: 'G4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
/* 48 */
          { n: 'C5', l: 1 / 12 },
          { n: 'B4', l: 1 / 12 },
          { n: 'A4', l: 1 / 12 },
          { n: 'B4', l: 1 / 4 },
          { n: 'G4', l: 1 / 4 },

          { n: 'A4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 },

          { n: 'G4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 },
          { n: 'G4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },

          { n: 'F#4', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 4 + 1 / 8 },

          { n: 'G4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 + 1 / 8 },
          { n: 'G4', l: 1 / 8 },

          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
/* 54 */
          { n: 'G4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 + 1 / 8 },
          { n: 'G4', l: 1 / 8 },

          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },

          { n: 'C5', l: 1 / 4 },
          { n: 'B4', l: 1 / 4 },
          { n: 'A4', l: 1 / 8 + 1 / 16 },
          { n: 'A4', l: 1 / 16 },

          { n: 'G4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 8 },

          { n: 'G4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 },
          { n: 'G4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },

          { n: 'F#4', l: 1 / 4 + 1 / 8 },
          { n: 'B4', l: 1 / 4 + 1 / 8 },

          { n: 'B4', l: 1 / 4 + 1 / 8 },
          { n: 'A4', l: 1 / 4 },
          { n: 'G4', l: 1 / 8 },
/* 61 */
          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },

          { n: 'B4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 },
          { n: 'G4', l: 1 / 4 },

          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 8 },

          { n: 'G4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 },
          { n: 'G4', l: 1 / 4 },

          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 8 + 1 / 16 },
          { n: 'E4', l: 1 / 16 },

          { n: 'G4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 },
          { n: 'G4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },

          { n: 'E4', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 4 + 1 / 8 },
/* 68 */
          { n: 'G4', l: 1 / 4 + 1 / 8 },
          { n: 'G4', l: 1 / 8 },
          { n: 'A4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },

          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },

          { n: 'G4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 + 1 / 8 },
          { n: 'G4', l: 1 / 8 },

          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'B4', l: 1 / 8 },
          { n: 'C5', l: 1 / 8 },

          { n: 'C5', l: 1 / 4 + 1 / 8 },
          { n: 'B4', l: 1 / 8 },
          { n: 'A4', l: 1 / 4 },

          { n: 'G4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 8 },

          { n: 'G4', l: 1 / 4 + 1 / 8 },
          { n: 'G4', l: 1 / 8 },
          { n: 'A4', l: 1 / 8 },
          { n: 'G4', l: 1 / 16 + 1 / 32 },
          { n: 'G4', l: 1 / 32 },
/* 75 */
          { n: 'F#4', l: 1 / 2 },
          { n: 'A4', l: 1 / 8 },
          { n: 'B4', l: 1 / 8 },

          { n: 'B4', l: 1 / 4 + 1 / 8 },
          { n: 'A4', l: 1 / 4 },
          { n: 'G4', l: 1 / 8 },

          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 8 },

          { n: 'G4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 + 1 / 8 },
          { n: 'G4', l: 1 / 8 },

          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },

          { n: 'C5', l: 1 / 4 },
          { n: 'B4', l: 1 / 4 },
          { n: 'A4', l: 1 / 8 + 1 / 16 },
          { n: 'A4', l: 1 / 16 },

          { n: 'G4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 },
          { n: 'B4', l: 1 / 4 },
/* 82 */
          { n: 'B4', l: 1 / 4 + 1 / 8 },
          { n: 'B4', l: 1 / 4 },
          { n: 'B4', l: 1 / 8 },

          { n: 'A4', l: 1 / 4 + 1 / 8 },
          { n: 'G4', l: 1 / 8 },
          { n: 'F#4', l: 1 / 4 },
/* Volta 84-90 */
          { n: 'E4', l: 1 / 2 },
          { n: 'B4', l: 1 / 4 },

          { n: 'A4', l: 1 / 12 },
          { n: 'B4', l: 1 / 12 },
          { n: 'A4', l: 1 / 12 },
          { n: 'G4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 },

          { n: 'E4', l: 1 / 2 },
          { n: 'B4', l: 1 / 4 },

          { n: 'A4', l: 1 / 12 },
          { n: 'B4', l: 1 / 12 },
          { n: 'A4', l: 1 / 12 },
          { n: 'G4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 },

          { n: 'E4', l: 1 / 2 },
          { n: 'B4', l: 1 / 4 },
/* 89 */
          { n: 'B4', l: 1 / 12 },
          { n: 'C5', l: 1 / 12 },
          { n: 'B4', l: 1 / 12 },
          { n: 'A4', l: 1 / 4 },
          { n: 'G4', l: 1 / 4 },

          { n: 'G4', l: 1 / 8 + 1 / 16 },
          { n: 'A4', l: 1 / 16 },
          { n: 'B4', l: 1 / 4 },
          { n: 'G4', l: 1 / 4 },
/* 91 */
          { n: 'F#4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },
          { n: 'A4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 },
/* Volta 84-90 */
          { n: 'E4', l: 1 / 2 },
          { n: 'B4', l: 1 / 4 },

          { n: 'A4', l: 1 / 12 },
          { n: 'B4', l: 1 / 12 },
          { n: 'A4', l: 1 / 12 },
          { n: 'G4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 },

          { n: 'E4', l: 1 / 2 },
          { n: 'B4', l: 1 / 4 },

          { n: 'A4', l: 1 / 12 },
          { n: 'B4', l: 1 / 12 },
          { n: 'A4', l: 1 / 12 },
          { n: 'G4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 },

          { n: 'E4', l: 1 / 2 },
          { n: 'B4', l: 1 / 4 },
/* 89 */
          { n: 'B4', l: 1 / 12 },
          { n: 'C5', l: 1 / 12 },
          { n: 'B4', l: 1 / 12 },
          { n: 'A4', l: 1 / 4 },
          { n: 'G4', l: 1 / 4 },

          { n: 'G4', l: 1 / 8 + 1 / 16 },
          { n: 'A4', l: 1 / 16 },
          { n: 'B4', l: 1 / 4 },
          { n: 'G4', l: 1 / 4 },
/* 92 */
          { n: 'F#4', l: 1 / 8 + 1 / 16 },
          { n: 'G4', l: 1 / 16 },
          { n: 'A4', l: 1 / 4 },
          { n: 'A4', l: 1 / 8 },
          { n: 'B4', l: 1 / 8 },

          { n: 'B4', l: 1 / 4 + 1 / 8 },
          { n: 'A4', l: 1 / 4 },
          { n: 'G4', l: 1 / 8 },

          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },

          { n: 'G4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 + 1 / 8 },
          { n: 'G4', l: 1 / 8 },

/* 96 */
          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'B4', l: 1 / 8 },
          { n: 'C5', l: 1 / 8 },

          { n: 'C5', l: 1 / 4 + 1 / 8 },
          { n: 'B4', l: 1 / 8 },
          { n: 'A4', l: 1 / 4 },

          { n: 'G4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 8 },

          { n: 'G4', l: 1 / 4 + 1 / 8 },
          { n: 'G4', l: 1 / 8 },
          { n: 'A4', l: 1 / 8 },
          { n: 'G4', l: 1 / 16 + 1 / 32 },
          { n: 'G4', l: 1 / 32 },


          { n: 'F#4', l: 1 / 2 },
          { n: 'A4', l: 1 / 8 },
          { n: 'B4', l: 1 / 8 },

          { n: 'B4', l: 1 / 4 + 1 / 8 },
          { n: 'A4', l: 1 / 4 },
          { n: 'G4', l: 1 / 8 },

          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 8 },
/* 103 */
          { n: 'G4', l: 1 / 4 },
          { n: 'A4', l: 1 / 4 + 1 / 8 },
          { n: 'G4', l: 1 / 8 },

          { n: 'F#4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },
          { n: 'E4', l: 1 / 4 },

          { n: 'C5', l: 1 / 4 },
          { n: 'B4', l: 1 / 4 },
          { n: 'A4', l: 1 / 8 + 1 / 16 },
          { n: 'A4', l: 1 / 16 },

          { n: 'G4', l: 1 / 4 },
          { n: 'F#4', l: 1 / 4 },
          { n: 'B4', l: 1 / 4 },

          { n: 'B4', l: 1 / 4 + 1 / 8 },
          { n: 'B4', l: 1 / 4 },
          { n: 'B4', l: 1 / 8 },

          { n: 'A4', l: 1 / 4 + 1 / 8 },
          { n: 'E4', l: 1 / 4 + 1 / 8 },

          { n: 'A4', l: 1 / 4 },
          { n: 'B4', l: 1 / 2 },
/* 110 */
          { n: 'B5', l: 0, o: 1 / 8 + 1 / 16 },
          { n: 'B4', l: 1 / 8 + 1 / 16 },
          { n: 'C6', l: 0, o: 1 / 16 },
          { n: 'C5', l: 1 / 16 },
          { n: 'D6', l: 0, o: 1 / 8 + 1 / 16 },
          { n: 'D5', l: 1 / 8 + 1 / 16 },
          { n: 'C6', l: 0, o: 1 / 16 },
          { n: 'C5', l: 1 / 16 },
          { n: 'B5', l: 0, o: 1 / 4 },
          { n: 'B4', l: 1 / 4 },

          { n: 'B5', l: 0, o: 1 / 2 + 1 / 4 },
          { n: 'B4', l: 1 / 2 + 1 / 4 },

          { n: 'B5', l: 0, o: 1 / 8 + 1 / 16 },
          { n: 'B4', l: 1 / 8 + 1 / 16 },
          { n: 'C6', l: 0, o: 1 / 16 },
          { n: 'C5', l: 1 / 16 },
          { n: 'D6', l: 0, o: 1 / 8 + 1 / 16 },
          { n: 'D5', l: 1 / 8 + 1 / 16 },
          { n: 'C6', l: 0, o: 1 / 16 },
          { n: 'C5', l: 1 / 16 },
          { n: 'B5', l: 0, o: 1 / 4 },
          { n: 'B4', l: 1 / 4 },

          { n: 'B5', l: 0, o: 1 / 2 + 1 / 4 },
          { n: 'B4', l: 1 / 2 + 1 / 4 },
/* 114 */
          { n: 'B5', l: 0, o: 1 / 8 + 1 / 16 },
          { n: 'B4', l: 1 / 8 + 1 / 16 },
          { n: 'C6', l: 0, o: 1 / 16 },
          { n: 'C5', l: 1 / 16 },
          { n: 'D6', l: 0, o: 1 / 8 + 1 / 16 },
          { n: 'D5', l: 1 / 8 + 1 / 16 },
          { n: 'C6', l: 0, o: 1 / 16 },
          { n: 'C5', l: 1 / 16 },
          { n: 'B5', l: 0, o: 1 / 4 },
          { n: 'B4', l: 1 / 4 },

          { n: 'B5', l: 0, o: 1 / 2 + 1 / 4 },
          { n: 'B4', l: 1 / 2 + 1 / 4 },

          { n: 'F#5', l: 0, o: 1 / 2 + 1 / 4 },
          { n: 'F#4', l: 1 / 2 + 1 / 4 },

          { n: 'E5', l: 0, o: 1 },
          { n: 'E4', l: 1 },
        ],
        [
          { R: 1.8, G: 0.1, F: 1, T: 'sine' },
          { l: 2 },

          { l: 3 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'G2', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'B2', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'B2', l: 1 / 4 },

          { n: 'G2', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'B2', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'B2', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
/* 7 */
          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'G2', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'B2', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'B2', l: 1 / 4 },
/* 13 */
          { n: 'G2', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'B2', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'B2', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
/* 20 */
          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
/* 27 */
          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
/* 34 */
          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
/* Volta 35-40 */
          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'D3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'D3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
/* 41 */
          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
/* 42 */
          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
/* Volta 35-40 */
          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'D3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'D3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
/* 43 */
          { l: 3 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'G2', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'B2', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'B2', l: 1 / 4 },

          { n: 'G2', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'B2', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'B2', l: 1 / 4 },
/* 48 */
          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
/* 54 */
          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
/* 61 */
          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
/* 68 */
          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
/* 75 */
          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
/* 82 */
          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
/* Volta 84-90 */
          { n: 'E3', l: 1 / 4 },
          { n: 'G3', l: 1 / 4 },
          { n: 'B3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'G3', l: 1 / 4 },
          { n: 'B3', l: 1 / 4 },

          { n: 'D3', l: 1 / 4 },
          { n: 'G3', l: 1 / 4 },
          { n: 'B3', l: 1 / 4 },

          { n: 'D3', l: 1 / 4 },
          { n: 'G3', l: 1 / 4 },
          { n: 'B3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'A3', l: 1 / 4 },
          { n: 'C4', l: 1 / 4 },
/* 89 */
          { n: 'C3', l: 1 / 4 },
          { n: 'A3', l: 1 / 4 },
          { n: 'C4', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'G3', l: 1 / 4 },
          { n: 'B3', l: 1 / 4 },
/* 91 */
          { n: 'A2', l: 1 / 4 },
          { n: 'A3', l: 1 / 4 },
          { n: 'F3', l: 1 / 4 },

/* Volta 84-90 */
          { n: 'E3', l: 1 / 4 },
          { n: 'G3', l: 1 / 4 },
          { n: 'B3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'G3', l: 1 / 4 },
          { n: 'B3', l: 1 / 4 },

          { n: 'D3', l: 1 / 4 },
          { n: 'G3', l: 1 / 4 },
          { n: 'B3', l: 1 / 4 },

          { n: 'D3', l: 1 / 4 },
          { n: 'G3', l: 1 / 4 },
          { n: 'B3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'A3', l: 1 / 4 },
          { n: 'C4', l: 1 / 4 },
/* 89 */
          { n: 'C3', l: 1 / 4 },
          { n: 'A3', l: 1 / 4 },
          { n: 'C4', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'G3', l: 1 / 4 },
          { n: 'B3', l: 1 / 4 },
/* 92 */
          { n: 'A2', l: 1 / 4 },
          { n: 'A3', l: 1 / 4 },
          { n: 'F3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
/* 96 */
          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
/* 103 */
          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'A2', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },
          { n: 'E3', o: 1 / 4 }, { n: 'C3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },

          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
/* 110 */
          { n: 'E3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'D3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'D3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },
          { n: 'B3', o: 1 / 4 }, { n: 'G3', l: 1 / 4 },

          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
/* 114 */
          { n: 'C3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
          { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },

          { n: 'B2', l: 1 / 4 },
          { n: 'D#3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },
          { n: 'D3', o: 1 / 4 }, { n: 'F#3', o: 1 / 4 }, { n: 'A3', l: 1 / 4 },

          { n: 'B3', o: 1 / 4 }, { n: 'G3', o: 1 / 4 }, { n: 'E3', l: 1 / 4 },
        ],
      ]
    };

    function AudioModule() {
      this.audioCtx = null;
      this.lotrNotes = lotrNotes;
      this.holdNotes = holdNotes;
      this.playing = null;
    }

    function Track(notes, audioCtx, cb) {
      this.audioCtx = audioCtx;
      this.timePointer = this.audioCtx.currentTime;
      this.mainOscillatorType = 'sine';
      this.mainGain = 0.5;
      this.mainRate = 1;
      this.mainFadeRatio = 0.5;
      this.notes = notes;
      this.playCb = cb;
    }

    Track.prototype.play = function() {
      this.notes.forEach(params => this.playNote(params))
    };

    Track.prototype.playNote = function(params) {
      const length = params.l || 0;
      const frequency = noteFrequencyMap[params.n] || null;

      if (params.T) { this.mainOscillatorType = params.T; }
      if (typeof params.G === 'number') { this.mainGain = params.G; }
      if (typeof params.R === 'number') { this.mainRate = params.R; }
      if (typeof params.F === 'number') { this.mainFadeRatio = params.F; }
      if (frequency !== null) {
        const type = params.t || this.mainOscillatorType;
        const gain = params.g || this.mainGain;
        const rate = params.r || this.mainRate;
        const fadeRatio = typeof params.f === 'number' ? params.f : this.mainFadeRatio;
        const overplay = typeof params.o === 'number' ? params.o : 0;
        const fade = length * fadeRatio || 0;
        const detune = noteFrequencyMap[params.d] || null;
        const duration = (length + overplay + fade) * rate;
        const gainNode = this.audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, this.timePointer);
        gainNode.gain.linearRampToValueAtTime(gain, this.timePointer + 1 / 128);
        gainNode.connect(this.audioCtx.destination);

        const oscillator = this.audioCtx.createOscillator();
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, 0);
        oscillator.connect(gainNode);
        oscillator.start(this.timePointer);

        if (detune > 0) {
          oscillator.frequency.exponentialRampToValueAtTime(detune, this.timePointer + duration);
        }

        gainNode.gain.setValueAtTime(gain, this.timePointer + duration / 2);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.timePointer + duration);

        oscillator.stop(this.timePointer + duration);
        oscillator.onended = () => {
          if (typeof this.playCb === 'function') { this.playCb(params); }
          gainNode.disconnect();
          oscillator.disconnect();
        };
      }
      this.timePointer += length * this.mainRate;
    };
    AudioModule.prototype.play = function(song, cb) {
      this.stop();

      this.playing = song;
      this.audioCtx = new window.AudioContext();
      const tracks = song.tracks.map(notes => new Track(notes, this.audioCtx, cb));
      tracks.forEach(track => track.play());
    };
    AudioModule.prototype.stop = function() {
      if (this.audioCtx) {
        this.audioCtx.close();
        this.audioCtx = null;
        this.playing = null;
      }
    };

    AudioModule.prototype.handleAudioEvents = function(params) {
      switch (params.i) {
        case AUTO_RENDER_MARKER:
          buttonsModule.renderRepaintButton();
          buttonsModule.renderBlackButton();
          flowersModule.setAutoRender(true);
          break;
        case PETAL_FALL_MARKER:
          const camomiles = flowersModule.flowers.filter(flower => flower.type === CAMOMILE_FLOWER_TYPE);
          const camomile = rndOf(camomiles);
          if (camomile) { rndOf(camomile.petals).element.dispatchEvent(new Event('click', { bubbles: true })); }
          break;
        default:
          if (audioModule.playing === audioModule.lotrNotes) {
            if (!flowersModule.autoRender && params.n) {
              flowersModule.renderFlowers(1);
            }
          }
          break;
      }
    };

    return new AudioModule();
  })();

  const buttonsModule = (function () {
    function Buttons() {
      this.buttonPlay = E('button', { className: 'button button-play', textContent: '\u25b6' });
      this.buttonBlack = E('button', { className: 'button button-black' });
      this.buttonRepaint = E('button', { className: 'button button-repaint', textContent: '\u27f3' });
      this.buttonLike = E('button', {
        className: 'button button-like',
        innerHTML: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#fff"><path stroke-width="2px" d="M98 46c0-62-48-47-48-24C50-1 2-17 2 46c0 29 18 68 48 92 28-23 48-60 48-92z"/><path id="beat" stroke-width="1px" d="M2.92 58c3 12 45 24 47-25v70c1-34 25-34 26-9 1 10 5 10 13-7.9"/></svg>`,
      });
    }

    Buttons.prototype.renderPlayButton = function() {
      data.mainWrapper.appendChild(this.buttonPlay);
      Q(() => toggleClassName(this.buttonPlay, 'show', true), 1000);

      this.buttonPlay.addEventListener('click', e => {
        e.stopPropagation();
        Q(() => toggleClassName(this.buttonPlay, 'show', false))
          .Q(() => this.buttonPlay.remove(), 300);
        flowersModule.render();
        audioModule.play(audioModule.lotrNotes, audioModule.handleAudioEvents);
      });
    };
    Buttons.prototype.renderBlackButton = function() {
      const message = E('div', { className: 'button-black-message' }, this.buttonBlack);
      let isBlackMode = false;
      let toggleCount = 0;
      E('div', { className: 'button-black-glass' }, message);
      data.mainWrapper.appendChild(this.buttonBlack);
      Q(() => toggleClassName(this.buttonBlack, 'show', true), 100)
        .Q(() => S(this.buttonBlack, { opacity: 1 }), 100);

      this.buttonBlack.addEventListener('click', e => {
        e.stopPropagation();
        isBlackMode = !isBlackMode;
        toggleCount += 1;
        if (toggleCount === 1) {
          audioModule.play(audioModule.holdNotes, audioModule.handleAudioEvents);
        }
        Q(() => S(this.buttonBlack, { opacity: null }))
          .Q(() => toggleClassName(this.buttonBlack, 'show', false))
          .Q(() => {
            toggleClassName(message, 'back', isBlackMode);
            flowersModule.toggleBlack(isBlackMode);
          }, 1000)
          .Q(() => toggleClassName(this.buttonBlack, 'show', true), 10000);
      });
    };
    Buttons.prototype.renderRepaintButton = function() {
      let isFirstClick = true;
      data.mainWrapper.appendChild(this.buttonRepaint);
      Q(() => toggleClassName(this.buttonRepaint, 'show', true), 2000)
        .Q(() => S(this.buttonRepaint, { opacity: 1 }), 100);

      this.buttonRepaint.addEventListener('click', e => {
        e.stopPropagation();
        if (isFirstClick) {
          isFirstClick = false;
          Q(() => toggleClassName(this.buttonLike, 'show', false))
            .Q(() => this.buttonLike.remove(), 1000);
        }
        Q(() => S(this.buttonRepaint, { opacity: null }))
          .Q(() => toggleClassName(this.buttonRepaint, 'show', false))
          .Q(() => flowersModule.repaint())
          .Q(() => toggleClassName(this.buttonRepaint, 'show', true), 10000)
      });
    };

    return new Buttons();
  })();

  I(() => {
    initStyles();
    Q(() => S(data.mainWrapper, { willChange: 'background-color, box-shadow', transition: 'background-color 1s, box-shadow 1s' }))
      .Q(() => S(data.mainWrapper, { backgroundColor: bgColor, boxShadow: '0 0 max(50vw, 50vh) #000 inset' }), 100)
      .Q(() => buttonsModule.renderPlayButton(), 1000)
  });
}
