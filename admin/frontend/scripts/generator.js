document.addEventListener('DOMContentLoaded', () => {
    createAppContext();
});

function createAppContext() {
    window.app = {
        synth: window.speechSynthesis,
        source: '/text'
    };
}

function generateText() {
    $('generate').disabled = true;
    $('loader').style.display = 'block';
    $('generatedText').style.display = 'none';
    fetch(`${app.source}?topic=${encodeURIComponent($('topic').value)}&level=${encodeURIComponent($('level').value)}`)
        .then(r => r.text())
        .then(content => {
            showText(content);
            $('generate').disabled = false;
            $('loader').style.display = 'none';
            $('generatedText').style.display = 'block';
        });
}

function showText(content) {
    $('generatedText').innerHTML = content;
    setHandlers();
}