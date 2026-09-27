document.addEventListener('DOMContentLoaded', () => {
    const powerBtn = document.getElementById('powerBtn');
    const themeBtn = document.getElementById('themeBtn');
    const fontBtn = document.getElementById('fontBtn');
    const sfxToggle = document.getElementById('sfxToggle');
    const sfxIcon = document.getElementById('sfxIcon');

    const channelKnob = document.getElementById('channelKnob');
    const volumeKnob = document.getElementById('volumeKnob');
    const chButtons = document.querySelectorAll('.ch-btn');

    const glitchOverlay = document.getElementById('glitchOverlay');
    const staticNoise = document.getElementById('staticNoise');

    const channels = {
        '0': document.getElementById('channel-off'),
        '1': document.getElementById('channel-home'),
        '2': document.getElementById('channel-about'),
        '3': document.getElementById('channel-projects'),
        '4': document.getElementById('channel-skills'),
        '5': document.getElementById('channel-contact'),
        'error': document.getElementById('channel-error')
    };

    let isPowerOn = true;
    let currentChannel = '1';
    let currentThemeIdx = 0;
    let currentFontIdx = 0;

    const themes = ['theme-indian-retro', 'theme-classic-crt', 'theme-vaporwave'];
    const fonts = ['', 'font-press-start', 'font-dotgothic'];

    /* =========================================================
       SOUND ENGINE — synthesized with the Web Audio API.
       No external audio files, so nothing to fetch or break.
       Sounds only ever start from a user gesture (click), which
       also keeps us safely inside browser autoplay policies.
    ========================================================= */
    let audioCtx = null;
    let sfxEnabled = true;

    function getCtx() {
        if (!audioCtx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (AC) audioCtx = new AC();
        }
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        return audioCtx;
    }

    function masterGain(ctx, peak, attack, release, delay = 0) {
        const g = ctx.createGain();
        const t0 = ctx.currentTime + delay;
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(peak, t0 + attack);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + release);
        g.connect(ctx.destination);
        return { gain: g, t0 };
    }

    function playClick(freq = 1400, dur = 0.045, vol = 0.18) {
        if (!sfxEnabled) return;
        const ctx = getCtx();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.value = freq;
        const { gain, t0 } = masterGain(ctx, vol, 0.002, dur);
        osc.connect(gain);
        osc.start(t0);
        osc.stop(t0 + dur + 0.05);
    }

    function playKnobTick() {
        if (!sfxEnabled) return;
        const ctx = getCtx();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
        const { gain, t0 } = masterGain(ctx, 0.14, 0.001, 0.06);
        osc.connect(gain);
        osc.start(t0);
        osc.stop(t0 + 0.08);
    }

    function playPowerThunk(turningOn) {
        if (!sfxEnabled) return;
        const ctx = getCtx();
        if (!ctx) return;
        // mechanical click
        playClick(turningOn ? 2200 : 900, 0.06, 0.22);
        // CRT degauss / power hum sweep
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        const start = turningOn ? 80 : 600;
        const end = turningOn ? 600 : 60;
        osc.frequency.setValueAtTime(start, ctx.currentTime + 0.05);
        osc.frequency.exponentialRampToValueAtTime(end, ctx.currentTime + 0.35);
        const { gain, t0 } = masterGain(ctx, 0.12, 0.02, 0.4, 0.05);
        osc.connect(gain);
        osc.start(t0);
        osc.stop(t0 + 0.5);
    }

    function playStaticBurst(duration = 0.4) {
        if (!sfxEnabled) return;
        const ctx = getCtx();
        if (!ctx) return;
        const bufferSize = Math.floor(ctx.sampleRate * Math.min(duration, 0.6));
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1);

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const bandpass = ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 2200;
        bandpass.Q.value = 0.6;

        const g = ctx.createGain();
        const t0 = ctx.currentTime;
        g.gain.setValueAtTime(0.16, t0);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + Math.min(duration, 0.6));

        noise.connect(bandpass);
        bandpass.connect(g);
        g.connect(ctx.destination);
        noise.start(t0);
        noise.stop(t0 + Math.min(duration, 0.6) + 0.05);
    }

    function initAudioOnFirstGesture() {
        getCtx();
        document.removeEventListener('click', initAudioOnFirstGesture);
    }
    document.addEventListener('click', initAudioOnFirstGesture, { once: true });

    // Sound toggle button
    sfxToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sfxEnabled = !sfxEnabled;
        sfxToggle.classList.toggle('muted', !sfxEnabled);
        sfxIcon.innerHTML = sfxEnabled ? '&#128266;' : '&#128263;';
        if (sfxEnabled) playClick(1600, 0.04, 0.15);
    });

    // Initialize
    powerBtn.classList.add('on');
    switchChannel('1', true);

    // --- TV CONTROLS ---

    // Power
    powerBtn.addEventListener('click', () => {
        isPowerOn = !isPowerOn;
        powerBtn.classList.toggle('on', isPowerOn);
        playPowerThunk(isPowerOn);
        document.body.classList.toggle('tv-off', !isPowerOn);

        if (!isPowerOn) {
            playStatic(0.4);
            setTimeout(() => {
                hideAllChannels();
                channels['0'].classList.remove('hidden');
                channels['0'].querySelector('.power-off-dot').classList.add('power-off-anim');
            }, 100);
        } else {
            channels['0'].classList.add('hidden');
            channels['0'].querySelector('.power-off-dot').classList.remove('power-off-anim');
            switchChannel(currentChannel);
        }
    });

    // Theme Switch
    themeBtn.addEventListener('click', () => {
        if (!isPowerOn) return;
        playClick(1100, 0.05, 0.16);
        document.body.classList.remove(themes[currentThemeIdx]);
        currentThemeIdx = (currentThemeIdx + 1) % themes.length;
        document.body.classList.add(themes[currentThemeIdx]);
        triggerGlitch();
    });

    // Font Switch
    fontBtn.addEventListener('click', () => {
        if (!isPowerOn) return;
        playClick(1300, 0.05, 0.16);
        if (fonts[currentFontIdx]) document.body.classList.remove(fonts[currentFontIdx]);
        currentFontIdx = (currentFontIdx + 1) % fonts.length;
        if (fonts[currentFontIdx]) document.body.classList.add(fonts[currentFontIdx]);
        triggerGlitch();
    });

    // Knobs (Visual Rotation + Logic)
    let knobRotation = 0;
    channelKnob.addEventListener('click', () => {
        if (!isPowerOn) return;
        playKnobTick();
        knobRotation += 45;
        channelKnob.style.transform = `rotate(${knobRotation}deg)`;

        let nextChannel = parseInt(currentChannel) + 1;
        if (isNaN(nextChannel) || nextChannel > 5) nextChannel = 1;
        switchChannel(nextChannel.toString());
    });

    let volRotation = 0;
    volumeKnob.addEventListener('click', () => {
        playKnobTick();
        volRotation += 30;
        volumeKnob.style.transform = `rotate(${volRotation}deg)`;
    });

    // Numpad Buttons
    chButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!isPowerOn) return;
            playClick();
            const ch = e.target.dataset.ch;
            switchChannel(ch);
        });
    });

    // Button visual press down simulation for non-active states
    const all3dBtns = document.querySelectorAll('.btn3d, .knob3d');
    all3dBtns.forEach(btn => {
        btn.addEventListener('mousedown', () => btn.classList.add('pressed'));
        btn.addEventListener('mouseup', () => btn.classList.remove('pressed'));
        btn.addEventListener('mouseleave', () => btn.classList.remove('pressed'));
        btn.addEventListener('touchstart', () => btn.classList.add('pressed'), { passive: true });
        btn.addEventListener('touchend', () => btn.classList.remove('pressed'), { passive: true });
        btn.addEventListener('touchcancel', () => btn.classList.remove('pressed'), { passive: true });
    });

    // --- LOGIC ---

    function hideAllChannels() {
        Object.values(channels).forEach(ch => {
            if (ch) ch.classList.add('hidden');
        });
    }

    function switchChannel(chKey, skipEffect = false) {
        if (!isPowerOn && !skipEffect) return;

        // Ensure channel exists
        if (!channels[chKey]) chKey = 'error';
        currentChannel = chKey;

        if (!skipEffect) {
            playStatic(0.5);
        }

        setTimeout(() => {
            hideAllChannels();
            channels[chKey].classList.remove('hidden');
        }, skipEffect ? 0 : 250);
    }

    function playStatic(durationSeconds) {
        staticNoise.classList.add('active');
        triggerGlitch();
        playStaticBurst(durationSeconds);
        setTimeout(() => {
            staticNoise.classList.remove('active');
        }, durationSeconds * 1000);
    }

    function triggerGlitch() {
        glitchOverlay.classList.remove('active');
        void glitchOverlay.offsetWidth; // Force reflow
        glitchOverlay.classList.add('active');
    }
});
