class Note {                                            //creating the class
    constructor(id, title, text) {                      //declaring the parameters
      this.id = id;                                     //
      this.title = title;
      this.text = text;  
    }
}

class App {
    constructor() {
        this.notes = [];                                //creating the array to store varaibles

        this.$activeForm = document.querySelector(".active-form");      //$ is a selector in JS
        this.$inactiveForm = document.querySelector(".inactive-form");
        this.$noteTitle = document.querySelector("#note-title");
        this.$noteText = document.querySelector("#note-text");


        this.addEventListeners();
    }

    addEventListeners() {
        document.body.addEventListener("click", (event) => {
            this.handleFormClick(event);
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
    }

    addNote({title, text}) {                        //declaring method
        const newNote = new Note(cuid(), title, text);      //creating variable and declaring parameters
        this.notes = [...this.notes, newNote]           //creating pathway to array storage
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

    displayNote(id) {
        this.notes.map(note => console.log(`
            ID: ${note.id}
            Title: ${note.title}
            Text: ${note.text}
            `))
    }
    
    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id != id)
    }
}

const app = new App();
