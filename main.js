document.addEventListener('DOMContentLoaded', function() {
    const scene = document.querySelector('a-scene');
    const splash = document.querySelector('#splash');
    const loading = document.querySelector('#splash .loading');
    const startButton = document.querySelector('#splash .start-button');

    const emitEvent = (eventName, listeners) => {
        listeners.forEach((listener) => {
            const el = document.querySelector(listener);
            el.emit(eventName);
        })
    };

    const activateSoundsForTouch = () => {
    	const sounds = document.querySelectorAll('a-sound')
        sounds.forEach((soundEl) => {
            soundEl.components.sound.playSound();
            soundEl.components.sound.stopSound();
        })
    };

    scene.addEventListener('loaded', function (e) {
        setTimeout(function () {
                loading.style.display = 'none';
                splash.style.backgroundColor = 'rgba(34, 149, 214, 0.5)';
                startButton.style.opacity = 1;
            }, 1000);
    });

    startButton.addEventListener('click', function (e) {
        activateSoundsForTouch();
        splash.style.display = 'none';
        emitEvent('scene-started', ['#building-glb']);
    });


});

