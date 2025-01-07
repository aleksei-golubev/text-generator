export function text(paragraphs) {
    let result = "<div class='text'>";

    paragraphs.forEach(paragraph => {
        result += `<div class='paragraph'>
            ${sentences(paragraph)}
        </div>`;
    });

    return result + '</div>';
}

function sentences(paragraph) {
    let result = '';
    paragraph.forEach(sentence => {
        result += `<div class='sentence'>
            <div class='origin'>${sentence.origin}</div>
            <div class='translation'>${sentence.translation}</div>
        </div> `;
    });
    return result;
}