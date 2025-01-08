export function header(title, tags, level) {
    return `<div class='header'>
                <div class='title oswald-mod'>
                    <h2 class='origin'>${title.origin}</h2>
                    <h2 class='translation'>${title.translation}</h2>
                </div>
                <div class='subtitle'>
                    Etiquetas: <i>${tags.join('</i>, <i>')}</i></br>
                    Nivel: ${level} | ${speechSynthButtons()} | ${translationSwitch()} | ${alternativeTranslations()}
                </div>
            </div>`;
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

function alternativeTranslations() {
    return `Alternativa: <a href="https://www.deepl.com/es/translator#es/ru/" id='deepL' target='_blank'>DeepL</a>,
            <a href="https://translate.yandex.ru/?source_lang=es&target_lang=ru&text=" id='yandex' target='_blank'>Yandex</a>,
            <a href="https://translate.google.com/?hl=es&sl=es&tl=ru&text=" id='google' target='_blank'>Google</a>`;
}