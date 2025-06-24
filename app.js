class Note {                                            //creating the class
    constructor(id, title, text) {                      //declaring the parameters
      this.id = id;                                     //
      this.title = title;
      this.text = text;  
    }
}

class App {
    constructor() {
        this.notes = [new Note(1, "Test title", "Test text")];                                //creating the array to store varaibles

        this.$activeForm = document.querySelector(".active-form");      //$ is a selector in JS
        this.$inactiveForm = document.querySelector(".inactive-form");
        this.$noteTitle = document.querySelector("#note-title");
        this.$noteText = document.querySelector("#note-text");
        this.$notes = document.querySelector(".notes");
        this.$form = document.querySelector("#form");

        this.addEventListeners();
        this.displayNote();
    }

    addEventListeners() {
        document.body.addEventListener("click", (event) => {
            this.handleFormClick(event);
        })
        this.$form.addEventListener("submit", (event) => {
            event.preventDefault();
            const title = this.$noteTitle.value;
            const text = this.$noteText.value;
            this.addNote({ title, text });
            this.closeActiveForm();
        })
    }

    handleFormClick(event) {
        const isActiveFormClickedOn = this.$activeForm.contains(event.target);
        const isInactiveFormClickedOn = this.$inactiveForm.contains(event.target);
        const title = this.$noteTitle.value;
        const text = this.$noteText.value;

        if(isInactiveFormClickedOn) {
            this.openActiveForm();
        }
        else if(!isInactiveFormClickedOn && !isActiveFormClickedOn) {
            this.addNote({ title, text });
            this.closeActiveForm();
        }
    }
    
    openActiveForm() {
        this.$inactiveForm.style.display = "none";
        this.$activeForm.style.display = "block";
        this.$noteText.focus();
    }

    closeActiveForm() {
        this.$inactiveForm.style.display = "block";
        this.$activeForm.style.display = "none";
        this.$noteText.value = "";
        this.$noteTitle.value = "";
    }

    addNote({title, text}) {                        //declaring method
        if(text != "") {
            const newNote = new Note(cuid(), title, text);      //creating variable and declaring parameters
            this.notes = [...this.notes, newNote]           //creating pathway to array storage
            this.displayNote();
        }
    }

    editNote(id, {title, text}) {
        this.notes = this.notes.map((note) => {
            if(note.id == id) {
                note.title = title;
                note.text = text;
            }
            return note;
        });
    }

    displayNote() {
        this.$notes.innerHTML = this.notes.map(
            (note) => 
        `
        <div class="note" id="${note.id}">
            <span class="material-symbols-outlined hover small-icon tick">check_circle</span>
            <div class="note-title2">${note.title}</div>
            <div class="note-text2">${note.text}</div>
            <div class="note-footer">
                <div class="tooltip">
                        <span class="material-symbols-outlined hover small-icon">palette</span>
                        <span class="tooltip-text">Background options</span>
                    </div>
                    <div class="tooltip">
                        <span class="material-symbols-outlined hover small-icon">add_alert</span>
                        <span class="tooltip-text">Remind me</span>
                    </div>
                    <div class="tooltip">
                        <span class="material-symbols-outlined hover small-icon">person_add</span>
                        <span class="tooltip-text">Collaborator</span>
                    </div>
                    <div class="tooltip">
                        <span class="material-symbols-outlined hover small-icon">image</span>
                        <span class="tooltip-text">Add image</span>
                    </div>
                    <div class="tooltip">
                        <span class="material-symbols-outlined hover small-icon">archive</span>
                        <span class="tooltip-text">Archive</span>
                    </div>
                    <div class="tooltip">
                        <span class="material-symbols-outlined hover small-icon">more_vert</span>
                        <span class="tooltip-text">More</span>
                    </div>
                </div>
            </div>
        </div>
        `
        ).join("");     //concatenates the elements of an array into a tring , using the specified separator
    }
    
    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id != id)
    }
}

const app = new App();
