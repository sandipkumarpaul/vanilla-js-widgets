// Fortune Generator: shows a random fortune and lets the user cycle
// through text colour, background colour, border colour and font presets.
(function fortuneModule() {
    const fortunes = [
        "True wisdom comes not from knowledge, but from understanding.",
        "The only way to do great work is to love what you do.",
        "In the middle of difficulty lies opportunity.",
        "The best time to plant a tree was 20 years ago. The second best time is now.",
        "It does not matter how slowly you go as long as you do not stop.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Life is what happens when you're busy making other plans.",
        "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        "The way to get started is to quit talking and begin doing.",
        "Your time is limited, so don't waste it living someone else's life.",
        "The only thing we have to fear is fear itself.",
        "To be or not to be, that is the question."
    ];

    const colourSets = {
        font: ['#0b2b44', '#8a1a3a', '#1a6a4a', '#6a3a8a', '#b13e3e', '#2c5f8a'],
        bg: ['#eef4fa', '#fce8e8', '#e8f5ee', '#f5eee8', '#f0eaf5', '#e0edf5'],
        border: ['#2c5f8a', '#b13e3e', '#1a7a5a', '#8a6a1a', '#6a3a8a', '#3a6a8a']
    };

    const sizeFamilyOptions = [
        { size: '1.15rem', family: "'Segoe UI', Tahoma, sans-serif" },
        { size: '1.5rem', family: "Georgia, serif" },
        { size: '1.05rem', family: "'Courier New', monospace" },
        { size: '1.8rem', family: "'Trebuchet MS', sans-serif" },
        { size: '1.25rem', family: "Palatino, 'Palatino Linotype', serif" }
    ];

    const box = document.getElementById('fortuneBox');
    const textEl = document.getElementById('fortuneText');

    let fortuneIdx = -1;
    let fontIdx = 0;
    let bgIdx = 0;
    let borderIdx = 0;
    let sizeIdx = 0;

    // Picks a random fortune, never the same one twice in a row.
    function pickRandomFortune() {
        let idx;
        do {
            idx = Math.floor(Math.random() * fortunes.length);
        } while (idx === fortuneIdx && fortunes.length > 1);
        fortuneIdx = idx;
        textEl.textContent = fortunes[idx];
    }

    function applyFortuneStyles() {
        const opt = sizeFamilyOptions[sizeIdx];
        box.style.color = colourSets.font[fontIdx];
        box.style.backgroundColor = colourSets.bg[bgIdx];
        box.style.borderColor = colourSets.border[borderIdx];
        box.style.fontSize = opt.size;
        box.style.fontFamily = opt.family;
    }

    document.getElementById('btnNewFortune').addEventListener('click', pickRandomFortune);

    document.getElementById('btnFontColor').addEventListener('click', function () {
        fontIdx = (fontIdx + 1) % colourSets.font.length;
        applyFortuneStyles();
    });

    document.getElementById('btnBgColor').addEventListener('click', function () {
        bgIdx = (bgIdx + 1) % colourSets.bg.length;
        applyFortuneStyles();
    });

    document.getElementById('btnBorderColor').addEventListener('click', function () {
        borderIdx = (borderIdx + 1) % colourSets.border.length;
        applyFortuneStyles();
    });

    document.getElementById('btnFontSize').addEventListener('click', function () {
        sizeIdx = (sizeIdx + 1) % sizeFamilyOptions.length;
        applyFortuneStyles();
    });

    pickRandomFortune();
    applyFortuneStyles();
})();
