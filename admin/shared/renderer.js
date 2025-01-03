(function(exports) {
    class TGRenderer {
        render(r) {
            let maxScrore = r.questions.reduce((accV, curr) => accV + curr.correct.length, 0);
        
            return `<div class='text-container noselect'>
                <div class='header'>
                    <div class='title oswald-mod'>
                        <h2 class='origin'>${r.title.origin}</h2>
                        <h2 class='translation'>${r.title.translation}</h2>
                    </div>
                    <div class='subtitle'>
                        ${this.tags(r.tags)} </br>
                        Nivel: ${r.level} | ${this.speechSynthButtons()} | ${this.translationSwitch()}
                    </div>
                </div>
                <div class='body'>
                    <div class='text'>
                        ${this.renderParagraphs(r.text)}
                    </div>
                    <div class='addition'>
                        <div class='questions'>
                            <h3 class="oswald-mod">Responde a las preguntas</h3>
                            ${this.renderQuestions(r.questions)}
                            <div class='results'>
                                <button onclick='checkResults(${maxScrore})' class="roboto-flex-mod">Comprobar resultados</button>
                                <dialog id='testResultDialog'>
                                    Resultados
                                    <div id='testResult' class='oswald-mod'></div>
                                    <button onclick='closeResults()' class="roboto-flex-mod">Cerrar</button>
                                </dialog>
                            </div>
                        </div>
                        ${r.words && r.words.length > 0 ? this.renderWords(r.words) : ''}
                    </div>
                </div>
            </div>`;
        }

        tags(elems) {
            return `Etiquetas: <i>${elems.join('</i>, <i>')}</i>`; 
        }
        
        speechSynthButtons() {
            return `<div class='synth'>
                        Texto a voz: 
                        <span class='speech-play-button svg-button' id="play" onclick="play()" style="display:inline-block;"></span>
                        <span class="speech-stop-button svg-button" id="stop" onclick="stop()" style="display:none;"></span>
                    </div>`;
        }
        
        translationSwitch() {
            return `Traducción: 
            <label class="switch" onclick="toggleAllTranslations()">
                <input type="checkbox" id="translationSwitch" />
                <span class="on-off"></span>
            </label>`;
        }
        
        renderParagraphs(text) {
            let result = '';
        
            text.forEach(it => {
                result += `<div class='paragraph'>
                    ${this.renderSentences(it)}
                </div>`
            });
        
            return result;
        
        }
        
        renderSentences(paragraph) {
            let result = '';
            paragraph.forEach(it => {
                result += `<div class='sentence'>
                    <div class='origin'>${it.origin}</div>
                    <div class='translation'>${it.translation}</div>
                </div> `;
            });
        
            return result;
        }
        
        renderWords(words) {
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
        
        renderQuestions(questions) {
            let n = 0;
            return `${
                questions.map(q => this.renderQuestion(q, ++n)).join(' ')
            }`;
        }
        
        renderQuestion(question, n) {
            let result = `<div class='question'>`;
        
            result += `<div class='text'>${question.question}</div>`
            result += `<div class='options'>`;
        
            if (question.correct.length > 1) {
                question.options.forEach((option) => {
                    const id = this.generateId();
                    result +=`<input type='checkbox' value='${question.correct.includes(option.id) ? 1 : 0}' id='checkbox${id}' /><label for='checkbox${id}'>${option.answer}</label><br/>`;
                });
            } else {
                question.options.forEach((option) => {
                    const id = this.generateId();
                    result +=`<input type='radio' name='question${n}' value='${question.correct.includes(option.id) ? 1 : 0}'id='radio${id}' /><label for='radio${id}'>${option.answer}</label><br/>`;
                });
            }
        
            result += '</div></div>';
        
            return result;
        }

        generateId() {
            const chars = 'abcdefghijklmnopqrstuvwxyz';
            let id = '';
            for (let i = 0; i < 5; i++) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        }
    }

    exports.TGRenderer = TGRenderer;
})(typeof module !== 'undefined' ? module.exports : window);