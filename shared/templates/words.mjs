export function words(list) {
    let result = '';

    if (list && list.length > 0) {
        result = `
            <div class='words'>
                <h3 class="oswald-mod">Aprende las palabras</h3>
                <div class='list'>`;

        list.forEach(word => {
            result += `<div class='word'>
                <div class='origin'>${word.origin}</div>
                <div class='translation'>${word.translation}</div>
            </div> `;
        });

        result += '</div></div>';
    }

    return result;
}