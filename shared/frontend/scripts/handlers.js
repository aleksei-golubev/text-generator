function setHandlers() {
    document.querySelector('.text-container').addEventListener('dblclick', (e) => {
        if (e.target.classList.contains('origin')) {
            toggleTranlsation(e.target.parentElement.querySelector('.translation'));
        }
    });

    setAlternativeTranslationLinks();
}

function toggleTranlsation(el) {
    el.style.display = el.style.display == '' || el.style.display == 'none'  ? 'inline' : 'none';
}

function toggleAllTranslations() {
    document.querySelectorAll('.translation')
            .forEach((el) => el.style.display = $('translationSwitch').checked ? 'inline' : 'none');
}


function checkResults(maxScore) {
    let answers = document.querySelectorAll(".question>.options input[value='1']:checked");
    let answersWrong = document.querySelectorAll(".question>.options input[type='checkbox'][value='0']:checked");
    $('testResult').innerText=`${answers.length - answersWrong.length}/${maxScore}`;
    $('testResultDialog').showModal();
}

function closeResults() {
    $('testResultDialog').close();
}

function play() {
    const voices = window.app.synth.getVoices().filter(v => v.lang == 'es-ES');
    let voice = voices.find(v => v.name.substring(0, 14) == 'Google español');
    
    if (!voice) voice = voices[0];
    
    if (voice) {
        togglePlayStop();
        
        const sentences = [
            $('generatedText').querySelector('.title .origin'),
            ...$('generatedText').querySelectorAll('.sentence .origin')
        ];
        sentences.forEach(s => {
            let utter = new SpeechSynthesisUtterance(s.innerText);
            utter.voice = voice;
            window.app.synth.speak(utter);
        });

        let x = setInterval(() => {
            if (!window.app.synth.speaking) {
                togglePlayStop();
                clearInterval(x);
            }
        }, 100);
    }
}

function stop() {
    if (window.app.synth.speaking) {
        window.app.synth.cancel();
    }
}

function togglePlayStop() {
    [$('play').style.display, $('stop').style.display] = [$('stop').style.display, $('play').style.display];
}

function setAlternativeTranslationLinks() {
    $('deepL').href += getEncodedOrigin();
    $('yandex').href += getEncodedOrigin();
    $('google').href += getEncodedOrigin();
}

function getEncodedOrigin() {
    let origin = `${$qs('.header h2.origin').innerText}`;

    $qsAll('.paragraph').forEach(paragraph => {
        origin += `\n${[...paragraph.querySelectorAll('.sentence .origin')].map(sentence => sentence.innerText).join(' ')}`;
    });

    return encodeURIComponent(origin);
}