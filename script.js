let titles = [];
let notes = [];
let titlesBin = [];
let notesBin = [];

load();



function render() {
    let addedNotes = document.getElementById('addedNotes');
    addedNotes.innerHTML = '';

    for (let i = 0; i < titles.length; i++) {
        addedNotes.innerHTML += `

        <div id="addedNote(${i})" class="added-notes" >
                <b>${titles[i]}:</b><br>
                ${notes[i]}
                <div class="note-icons-container">
                     <img onclick="highLightNote(${i})" class="note-icons" src="./img/white-star.png">
                     <img onclick="moveToBin(${i})" class="note-icons" src="./img/trash.png">
                </div>
        </div>
     
        `;
     titleInput.innerHTML += '';

    }
}


function renderBin() {
    let removedNotes = document.getElementById('removedNotes');
    removedNotes.innerHTML = '';

    for (let i = 0; i < titlesBin.length; i++) {
        removedNotes.innerHTML += `

        <div id="removedNote(${i})" class="removed-notes">
        <b>${titlesBin[i]}:</b><br>
        ${notesBin[i]}
        <div class="note-icons-container">
          <img onclick="restore(${i})" class="note-icons" src="./img/previous.png">
          <img onclick="deletePermanantly(${i})" class="note-icons" src="./img/cross.png">
          </div>
        </div>
        `;

    }
}


function openEnterNoteInput() {
    let titleInput = document.getElementById('titleInput');
    titleInput.innerHTML = '';
    titleInput.innerHTML += `
        <input id="title" class="title-input" placeholder="Tilte" >
        <textarea id="note" class="note-input" placeholder="Enter note..." ></textarea>
        <button onclick="enterNote()" class="enter-button button-adjust">Enter</button>
     `;
}

function enterNote() {
    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;

    if (title == '' || note == '') {
        throw new Error('please enter note');
    }

    titles.push(title);
    notes.push(note);
    render();
    save();
}
function moveToBin(i) {
    let deletedTitle = titles.splice(i, 1)[0];
    let deletedNote = notes.splice(i, 1)[0];
    titlesBin.push(deletedTitle);
    notesBin.push(deletedNote);
    render();
    save();
}

function restore(i) {
    let restoredTitle = titlesBin.splice(i, 1)[0];
    let restoredNotes = notesBin.splice(i, 1)[0];
    titles.push(restoredTitle);
    notes.push(restoredNotes);
    renderBin();
    save();
}



function highLightNote(i) {
    let highLightedNote = document.getElementById(`addedNote(${i})`);
    highLightedNote.classList.toggle('highlight-note');

}


function save() {
    let titlesAsText = JSON.stringify(titles);
    let notesAsText = JSON.stringify(notes);

    localStorage.setItem('titles', titlesAsText);
    localStorage.setItem('notes', notesAsText);

    let titlesBinAsText = JSON.stringify(titlesBin);
    let notesBinAsText = JSON.stringify(notesBin);

    localStorage.setItem('titlesBin', titlesBinAsText);
    localStorage.setItem('notesBin', notesBinAsText);
}
function load() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');

    if (titlesAsText && notesAsText) {

        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }

    let titlesBinAsText = localStorage.getItem('titlesBin');
    let notesBinAsText = localStorage.getItem('notesBin');


    if (titlesBinAsText && notesBinAsText) {

        titlesBin = JSON.parse(titlesBinAsText);
        notesBin = JSON.parse(notesBinAsText);
    }
}


function deletePermanantly(i) {
    titlesBin.splice(i, 1);
    notesBin.splice(i, 1);
    renderBin();
    save();
}

function openMenu() {
    document.getElementById('menu').classList.toggle('transform-X');
}














