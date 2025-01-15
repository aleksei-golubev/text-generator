document.addEventListener('DOMContentLoaded', () => {
    createAppContext();
});

function createAppContext() {
    window.app = {
        source: '/dialog'
    };
}


function generateDialog() {
    showHideForm();
    $('generate').disabled = true;
    $('loader').style.display = 'block';
    $('generatedText').style.display = 'none';
    fetch(app.source, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            context: $('context').value,
            place: $('place').value,
            level: $('level').value,
            persons: [
                {
                    role: $('role1').value,
                    mood: $('mood1').value,
                    sex: $('gender1').value,
                    description: $('description1').value
                },
                {
                    role: $('role2').value,
                    mood: $('mood2').value,
                    sex: $('gender2').value,
                    description: $('description2').value
                }
            ]
        })
    })
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

function showHideForm() {
    let gfs = $('dialogGeneratorForm').style;
    gfs.display = gfs.display && gfs.display === 'none' ? 'block' : 'none';
    $('showHide').innerText = gfs.display === 'none' ? 'Show form' : 'Hide form';
}


// Objeto con los estados de ánimo
const moods = {
    "happy": "Feliz",
    "angry": "Enojado",
    "neutral": "Neutral",
    "sad": "Triste",
    "excited": "Emocionado",
    "calm": "Calmado",
    "anxious": "Ansioso",
    "bored": "Aburrido",
    "confused": "Confundido",
    "surprised": "Sorprendido",
    "hopeful": "Esperanzado",
    "frustrated": "Frustrado",
    "embarrassed": "Avergonzado",
    "relaxed": "Relajado",
    "pensive": "Pensativo"
};

function setPlaces() {
    // Llenado del selector de lugares
    const placeSelect = $('place');
    for (const [key, value] of Object.entries(places)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = value.name;
        placeSelect.appendChild(option);
    }
}

// Función para actualizar los roles del lugar seleccionado
function updateRoles() {
    const selectedPlace = $('place').value;
    const roleSelect1 = $('role1');
    const roleSelect2 = $('role2');

    // Limpiar opciones anteriores
    roleSelect1.innerHTML = '';
    roleSelect2.innerHTML = '';

    // Actualizar roles
    const roles = places[selectedPlace]?.roles || {};
    for (const [key, value] of Object.entries(roles)) {
        const option1 = document.createElement('option');
        option1.value = key;
        option1.textContent = value;
        roleSelect1.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = key;
        option2.textContent = value;
        roleSelect2.appendChild(option2);
    }
}

// Función para actualizar los estados de ánimo
function updateMoods() {
    const moodSelect1 = $('mood1');
    const moodSelect2 = $('mood2');

    // Limpiar opciones anteriores
    moodSelect1.innerHTML = '';
    moodSelect2.innerHTML = '';

    // Actualizar estados de ánimo
    for (const [key, value] of Object.entries(moods)) {
        const option1 = document.createElement('option');
        option1.value = key;
        option1.textContent = value;
        moodSelect1.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = key;
        option2.textContent = value;
        moodSelect2.appendChild(option2);
    }
}