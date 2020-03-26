const loader = function(data) {
  function Q(f, d) { const o = { Q, _: () => {} }, n = r => setTimeout(() => o._(f(r)), d); (!this || this === window) ? n() : (this._ = n); return o; }
  function E(t, a, p) { const e = document.createElement(t); Object.keys(a).forEach(k => e[k] = a[k]); p && p.append(e); return e; }
  function S(e, s) { Object.keys(s).forEach(k => e.style[k] = s[k]); }

  E('style', { textContent: `
    main {
      width: 100%;
      height: 100%;
      perspective: 800px;
      perspective-origin: 50% 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .message {
      font: max(28px, 4.5vw) 'courier new', monospace;
      color: transparent;
      text-shadow: 0 0 max(28px, 4.5vw) black;
      transition: text-shadow 1s linear;
      text-align: center;
      will-change: text-shadow;
    }
    .button {
      display: block;
      position: fixed;
      z-index: 2;
      border: none;
      outline: none;
      background: transparent;
      cursor: pointer;
      font: bold max(60px, 8vw) sans-serif;
      color: transparent;
      text-shadow: 0 0 max(10px, 2vw) white;
      transition: text-shadow 0.1s linear;
      will-change: text-shadow;
    }  
    .cube {
      width: min(45vw, 45vh);
      height: min(45vw, 45vh);
      max-width: 400px;
      max-height: 400px;
      transform-style: preserve-3d;
      animation: rotate 30s linear infinite;
      will-change: transform;
    }
    @keyframes rotate {
      0% {transform: rotateX(365deg) rotateY(-360deg);}
      100% {transform: rotateX(-355deg) rotateY(720deg);}
    }
    .cube .side {
      position: absolute;
      width: 100%;
      height: 100%;
      transition: transform 1.5s ease-in, opacity 0.5s;
      will-change: transform, opacity;
      font: bold min(30vh, 30vw) sans-serif;
    }

    .cube .side::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      box-shadow: 0 0 min(20vh, 20vw) min(1vh, 1vw) inset, 0 0 min(0.5vh, 0.5vw) min(0.1vh, 0.1vw) inset;
    }

    .cube a {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: transparent;
    }
    
    .cube video {
      position: absolute;
      display: block;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.5s;
      will-change: opacity;
    }`}, document.head);

  init();

  function init() {
    Q(() => S(data.mainWrapper, { transition: 'background-color 1s ', backgroundColor: 'black' }))
      .Q(() => checkPermissions(), 700)
  }

  function checkPermissions() {
    const message = E('div', { className: 'message', textContent: 'Please, allow camera\xA0usage' }, data.mainWrapper);

    Q(() => { message.isShown = true; S(message, { textShadow: '0 0 0 white' }); }, 200);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => handleSuccess(message, stream), () => handleError(message))
      .then(q => q.Q(renderView));
  }

  function handleSuccess(message, stream) {
    return Q(() => S(message, { textShadow: null }))
      .Q(() => message.remove(), message.isShown ? 1000 : 0)
      .Q(() => stream);
  }

  function handleError(message) {
    const isShown = message.isShown;

    return Q(() => isShown && S(message, { textShadow: null }))
      .Q(() => (message.innerHTML = 'Camera is not available :( </br> No money - no honey!'), isShown ? 1000 : 0)
      .Q(() => isShown && S(message, { textShadow: '0 0 0 white' }))
      .Q(() => S(message, { textShadow: null }), 4000)
      .Q(() => message.remove(), 1000)
      .Q(() => null);
  }

  function renderView(stream) {
    Q(createCube)
      .Q(cubeData => {
        stream && createPlayButton(stream, cubeData);
        createMadnessButton();
      }, 5000);
  }

  function createCube() {
    const documentFragment = document.createDocumentFragment(),
      cube = E('div', { className: 'cube' }, documentFragment);

    const cubeData = [],
      sideParams = {
        left: { background: 'rgba(200, 0, 0, 0.7)', transform: 'translateX(-50%) rotateY(-90deg)' },
        right: { background: 'rgba(200, 200, 0, 0.7)', transform: 'translateX(50%) rotateY(90deg)' },
        back: { background: 'rgba(0, 0, 200, 0.7)', transform: 'rotateY(90deg) translateX(50%) rotateY(90deg)' },
        front: { background: 'rgba(0, 200, 0, 0.7)', transform: 'rotateY(90deg) translateX(-50%) rotateY(-90deg)' },
        top: { background: 'rgba(0, 200, 200, 0.7)', transform: 'translateY(-50%) rotateX(90deg)' },
        bottom: { background: 'rgba(200, 0, 200, 0.7)', transform: 'translateY(50%) rotateX(-90deg)' }
      };

    Object.keys(sideParams).forEach((key, index) => {
      const style = sideParams[key],
        side = E('div', { className: `side text` }, cube),
        text = E('a', { textContent: index + 1 }, side),
        video = E('video', {}, side);
      S(side, { background: style.background, opacity: 0, transform: 'scale(0.1)' });
      S(text, { textShadow: `min(0.5vh, 0.5vw) min(0.5vh, 0.5vw) min(3vh, 3vw) ${style.background}, 0 0 0 rgba(0, 0, 0, 0.5)` });
      S(video, { opacity: 0 });
      cubeData.push({ side, text, video, style });
    });

    data.mainWrapper.append(documentFragment);

    cubeData.reduce((q, data) =>
      q.Q(() => S(data.side, { transform: data.style.transform, opacity: 1 }), 280), Q(() => {}));

    return cubeData;
  }

  function createPlayButton(stream, cubeData) {
    const videoList = cubeData.map(data => data.video);

    videoList.forEach(video => video.srcObject = stream);
    initButton('left', isActive => {
      videoList.forEach(video => {
        isActive ? video.play() : video.pause();
        S(video, { opacity: isActive ? 1 : 0 });
      });
    });
  }

  function createMadnessButton() {
    initButton('right', isActive => {
      S(data.mainWrapper, { perspective: isActive ? '100px' : null });
    });
  }

  function initButton(side, action) {
    const button = E('button', { className: 'button', textContent: '\u25ef' }, data.mainWrapper);

    S(button, { [side]: 'max(20px, 2vw)', top: 'max(20px, 2vw)', textShadow: '0 0 max(10px, 2vw) black', transitionDuration: '0.5s' });
    Q(() => S(button, { textShadow: '0 0 0 white' }), 100)
      .Q(() => S(button, { transitionDuration: null }), 500)
      .Q(() => {
        button.isActive = false;
        button.addEventListener('click', () => {
          button.isActive = !button.isActive;
          Q(() => S(button, { textShadow: null }), 100)
            .Q(() => {
              button.textContent = button.isActive ? '\u25c9' : '\u25ef';
              S(button, { textShadow: '0 0 0 white' });
            }, 100);
          action(button.isActive);
        });
      });
  }
};
