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
    }
    addNote(id, {title, text}) {                         //declaring method
        const newNote = new Note(id, title, text);      //creating variable and declaring parameters
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
