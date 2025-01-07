import { generateId } from "../utils.mjs";

export function questions(list) {
    const maxScrore = list.reduce((accV, curr) => accV + curr.correct.length, 0);

    return `<div class='questions'>
                <h3 class="oswald-mod">Responde a las preguntas</h3>
                ${questionsList(list)}
                <div class='results'>
                    <button onclick='checkResults(${maxScrore})' class="roboto-flex-mod">Comprobar resultados</button>
                    <dialog id='testResultDialog'>
                        Resultados
                        <div id='testResult' class='oswald-mod'></div>
                        <button onclick='closeResults()' class="roboto-flex-mod">Cerrar</button>
                    </dialog>
                </div>
            </div>`;
}

function questionsList(list) {
    let n = 0;
    return list.map(question => questionsItem(question, ++n)).join(' ');
}

function questionsItem(question, n) {
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