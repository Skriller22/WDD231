document.querySelectorAll("button").forEach(function(button) {
    button.addEventListener("click", function() {
        const e = new AudioContext();
        if (e.state !== "running")
            return;

        const t = e.currentTime;
        for (const [n, i] of [[880, 0], [1318.5, .12]]) {
            const r = e.createOscillator();
            const s = e.createGain();
            r.type = "sine";
            r.frequency.value = n;
            s.gain.setValueAtTime(1e-4, t + i);
            s.gain.exponentialRampToValueAtTime(.25, t + i + .01);
            s.gain.exponentialRampToValueAtTime(1e-4, t + i + 1.4);
            r.connect(s).connect(e.destination);
            r.start(t + i);
            r.stop(t + i + 1.5);
        }
    });
});