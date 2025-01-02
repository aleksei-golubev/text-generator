document.addEventListener('DOMContentLoaded', () => {
    createAppContext();
});

function createAppContext() {
    window.app = {
        synth: window.speechSynthesis,
        source: '/text'
    };
}

function $(id) {
    return document.getElementById(id);
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
    $('generatedText').innerHTML = render(r);
}

function setHandlers() {
    document.querySelector('.text-container').addEventListener('dblclick', (e) => {
        if (e.target.classList.contains('origin')) {
            toggleTranlsation(e.target.parentElement.querySelector('.translation'));
        }
    })
}

function toggleTranlsation(el) {
    el.style.display = el.style.display == '' || el.style.display == 'none'  ? 'inline' : 'none';
}

function toggleAllTranslations() {
    document.querySelectorAll('.translation')
            .forEach((el) => el.style.display = $('translationSwitch').checked ? 'inline' : 'none');
}

function render(r) {
    let maxScrore = r.questions.reduce((accV, curr) => accV + curr.correct.length, 0);

    return `<div class='text-container noselect'>
        <div class='header'>
            <div class='title oswald-mod'>
                <h2 class='origin'>${r.title.origin}</h2>
                <h2 class='translation'>${r.title.translation}</h2>
            </div>
            <div class='subtitle'>
                ${tags(r.tags)} </br>
                Nivel: ${r.level} | ${speechSynthButtons()} | ${translationSwitch()}
            </div>
        </div>
        <div class='body'>
            <div class='text'>
                ${renderParagraphs(r.text)}
            </div>
            <div class='addition'>
                <div class='questions'>
                    <h3 class="oswald-mod">Responde a las preguntas</h3>
                    ${renderQuestions(r.questions)}
                    <div class='results'>
                        <button onclick='checkResults(${maxScrore})' class="roboto-flex-mod">Comprobar resultados</button>
                        <dialog id='testResultDialog'>
                            Resultados
                            <div id='testResult' class='oswald-mod'></div>
                            <button onclick='closeResults()' class="roboto-flex-mod">Cerrar</button>
                        </dialog>
                    </div>
                </div>
                ${r.words && r.words.length > 0 ? renderWords(r.words) : ''}
            </div>
        </div>
    </div>`;
}

function tags(elems) {
    return `Etiquetas: <i>${elems.join('</i>, <i>')}</i>`; 
}

function speechSynthButtons() {
    return `<div class='synth'>
                Texto a voz: 
                <span class='speech-play-button svg-button' id="play" onclick="play()" style="display:inline-block;"></span>
                <span class="speech-stop-button svg-button" id="stop" onclick="stop()" style="display:none;"></span>
            </div>`;
}

function translationSwitch() {
    return `Traducción: 
    <label class="switch" onclick="toggleAllTranslations()">
        <input type="checkbox" id="translationSwitch" />
        <span class="on-off"></span>
    </label>`;
}

function renderParagraphs(text) {
    let result = '';

    text.forEach(it => {
        result += `<div class='paragraph'>
            ${renderSentences(it)}
        </div>`
    });

    return result;

}

function renderSentences(paragraph) {
    let result = '';
    paragraph.forEach(it => {
        result += `<div class='sentence'>
            <div class='origin'>${it.origin}</div>
            <div class='translation'>${it.translation}</div>
        </div> `;
    });

    return result;
}

function renderWords(words) {
    let result = `
        <div class='words'>
            <h3 class="oswald-mod">Aprende las palabras</h3>
            <div class='list'>`;

    words.forEach(it => {
        result += `<div class='word'>
            <div class='origin'>${it.origin}</div>
            <div class='translation'>${it.translation}</div>
        </div> `;
    });

    result += '</div></div>';

    return result;
}

function renderQuestions(questions) {
    let n = 0;
    return `${
        questions.map(q => renderQuestion(q, ++n)).join(' ')
    }`;
}

function renderQuestion(question, n) {
    let result = `<div class='question'>`;

    result += `<div class='text'>${question.question}</div>`
    result += `<div class='options'>`;

    if (question.correct.length > 1) {
        question.options.forEach((option) => {
            const id = generateId();
            result +=`<input type='checkbox' value='${question.correct.includes(option.id) ? 1 : 0}' id='checkbox${id}' /><label for='checkbox${id}'>${option.answer}</label><br/>`;
        });
    } else {
        question.options.forEach((option) => {
            const id = generateId();
            result +=`<input type='radio' name='question${n}' value='${question.correct.includes(option.id) ? 1 : 0}'id='radio${id}' /><label for='radio${id}'>${option.answer}</label><br/>`;
        });
    }

    result += '</div></div>';

    return result;
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

function generateId() {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let id = '';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}