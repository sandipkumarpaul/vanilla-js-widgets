// Stopwatch: counts up in 3-second steps, stops automatically at 30 seconds,
// and can be paused/resumed or reset.
(function stopwatchModule() {
    const STEP_SECONDS = 3;
    const LIMIT_SECONDS = 30;

    const display = document.getElementById('stopwatchDisplay');
    const progress = document.getElementById('swProgress');
    const progressFill = document.getElementById('swProgressFill');
    const statusEl = document.getElementById('swStatus');
    const startBtn = document.getElementById('swStart');
    const stopBtn = document.getElementById('swStop');
    const resetBtn = document.getElementById('swReset');

    let currentTime = 0;
    let timerId = null;

    function isRunning() {
        return timerId !== null;
    }

    function render(status) {
        display.textContent = currentTime;
        progressFill.style.width = (currentTime / LIMIT_SECONDS) * 100 + '%';
        progress.setAttribute('aria-valuenow', currentTime);
        startBtn.disabled = isRunning() || currentTime >= LIMIT_SECONDS;
        stopBtn.disabled = !isRunning();
        if (status) statusEl.textContent = status;
    }

    function clearTimer() {
        clearInterval(timerId);
        timerId = null;
    }

    function tick() {
        currentTime = Math.min(currentTime + STEP_SECONDS, LIMIT_SECONDS);

        if (currentTime >= LIMIT_SECONDS) {
            clearTimer();
            render(`⏹ Stopped — reached ${LIMIT_SECONDS} seconds`);
            return;
        }
        render(`⏱ Running … ${currentTime}s`);
    }

    function startTimer() {
        if (isRunning() || currentTime >= LIMIT_SECONDS) return;
        timerId = setInterval(tick, STEP_SECONDS * 1000);
        render(`▶ Running … ${currentTime}s`);
    }

    function pauseTimer() {
        if (!isRunning()) return;
        clearTimer();
        render(`⏸ Paused at ${currentTime}s`);
    }

    function resetTimer() {
        clearTimer();
        currentTime = 0;
        render('⟲ Reset to 0');
    }

    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    render('⏹ Ready');
})();
