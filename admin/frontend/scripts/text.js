document.addEventListener('DOMContentLoaded', () => {
    createAppContext();
    setHandlers();
});

function createAppContext() {
    window.app = {
        synth: window.speechSynthesis,
    };
}