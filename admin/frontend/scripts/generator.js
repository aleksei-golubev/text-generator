document.addEventListener('DOMContentLoaded', () => {
    createAppContext();
});

function createAppContext() {
    window.app = {
        synth: window.speechSynthesis,
        source: '/text',
        renderer: new TGRenderer()
    };
}

function generateText() {
    $('generate').disabled = true;
    $('loader').style.display = 'block';
    $('generatedText').style.display = 'none';
    fetch(`${app.source}?topic=${encodeURIComponent($('topic').value)}&level=${encodeURIComponent($('level').value)}`)
        .then(r => r.json())
        .then(r => {
            showText(r);
            setHandlers();
            $('generate').disabled = false;
            $('loader').style.display = 'none';
            $('generatedText').style.display = 'block';
        });
}

function showText(r) {
    $('generatedText').innerHTML = window.app.renderer.render(r);
}