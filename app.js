class Note {                                            //creating the class
    constructor(id, title, text) {                      //declaring the parameters
      this.id = id;                                     //
      this.title = title;
      this.text = text;  
    }
}

class App {
    constructor() {
        //localStorage.setItem("test", JSON.stringify(["123"]));
        //console.log(JSON.parse(localStorage.getItem("test")));
        this.notes = JSON.parse(localStorage.getItem("notes")) || [];
        this.selectedNoteId = "";
        this.miniSidebar = true;

        this.$activeForm = document.querySelector(".active-form");      //$ is a selector in JS
        this.$activeFormCloseBtn = document.querySelector("#active-form-close-btn");
        this.$inactiveForm = document.querySelector(".inactive-form");
        this.$noteTitle = document.querySelector("#note-title");
        this.$noteText = document.querySelector("#note-text");
        this.$notes = document.querySelector(".notes");
        this.$form = document.querySelector("#form");
        this.$modal = document.querySelector(".modal");
        this.$modalForm = document.querySelector("#modal-form");
        this.$modalTitle = document.querySelector("#modal-title");
        this.$modalText = document.querySelector("#modal-text");
        this.$closeModalBtn = document.querySelector("#modal-btn");
        this.$sidebar = document.querySelector(".sidebar");
        this.$sidebarActiveItem = document.querySelector(".active-item");

        this.addEventListeners();
        this.displayNote();
    }

    addEventListeners() {
        document.body.addEventListener("click", (event) => {
            this.handleFormClick(event);
            this.closeModal(event);
            this.openModal(event);
            this.handleArchiving(event);
        })

        this.$form.addEventListener("submit", (event) => {
            event.preventDefault();
        })

        this.$sidebar.addEventListener("mouseover", (event) => {
            this.handleToggleSidebar();
        })

        this.$sidebar.addEventListener("mouseout", (event) => {
            this.handleToggleSidebar();
        })
    }

    handleFormClick(event) {
        const isActiveFormClickedOn = this.$activeForm.contains(event.target);
        const isInactiveFormClickedOn = this.$inactiveForm.contains(event.target);
        const isActiveFormButtonClickedOn = this.$activeFormCloseBtn.contains(event.target);
        const title = this.$noteTitle.value;
        const text = this.$noteText.value;

        if (isInactiveFormClickedOn) {
            this.openActiveForm();
        } else if (!isInactiveFormClickedOn && !isActiveFormClickedOn || !isInactiveFormClickedOn && isActiveFormButtonClickedOn) {      //!isActiveFormClickedOn stops form from closing on every click before user is done
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

    openModal(event) {
        const $selectedNote = event.target.closest(".note")
        if($selectedNote && !event.target.closest(".archive")) {
            this.selectedNoteId = $selectedNote.id;                             //accessing id for ediing purposes
            this.$modalTitle.value = $selectedNote.children[1].innerHTML;       //accessing html title
            this.$modalText.value = $selectedNote.children[2].innerHTML;        //accessing html text
            this.$modal.classList.add("open-modal");
        } else {
            return;
        }
    }

    closeModal(event) {
        const isModalFormClickedOn = this.$modalForm.contains(event.target);
        const isCloseModalBtnClickedOn = this.$closeModalBtn.contains(event.target);
        if((!isModalFormClickedOn || isCloseModalBtnClickedOn) && this.$modal.classList.contains("open-modal")) {
            event.preventDefault();
            this.editNote(this.selectedNoteId, { title: this.$modalTitle.value, text: this.$modalText.value });
            this.$modal.classList.remove("open-modal");
        }
    }

    handleArchiving(event) {
        const $selectedNote = event.target.closest(".note");
        if($selectedNote && event.target.closest(".archive")) {
            this.selectedNoteId = $selectedNote.id;
            this.deleteNote(this.selectedNoteId);
        } else {
            return;
        }
    }

    addNote({ title, text }) {
        if(text != "") {
            const newNote = new Note(cuid(), title, text);      //creating variable and declaring parameters
            this.notes = [...this.notes, newNote];           //creating pathway to array storage
            this.render();
        }
    }

    editNote(id, { title, text }) {
        this.notes = this.notes.map((note) => {
            if(note.id == id) {
                note.title = title;
                note.text = text;
            }
            return note;
        });
        this.render();
    }

    handleMouseOverNote(element) {
        const $note = document.querySelector("#" + element.id);
        const $checkNote = $note.querySelector(".tick");
        const $noteFooter = $note.querySelector(".note-footer");
        $checkNote.style.visibility = "visible";
        $noteFooter.style.visibility = "visible";
    }

    handleOnMouseOut(element) {
        const $note = document.querySelector("#" + element.id);
        const $checkNote = $note.querySelector(".tick");
        const $noteFooter = $note.querySelector(".note-footer");
        $checkNote.style.visibility = "hidden";
        $noteFooter.style.visibility = "hidden";
    }

    handleToggleSidebar() {
        if(this.miniSidebar) {
            this.$sidebar.style.width = "250px";
            this.$sidebar.classList.add("sidebar-hover");
            this.$sidebarActiveItem.classList.add("sidebar-active-item");
            this.miniSidebar = false;
        } else {
            this.$sidebar.style.width = "80px";
            this.$sidebar.classList.remove("sidebar-hover");
            this.$sidebarActiveItem.classList.remove("sidebar-active-item");
            this.miniSidebar = true;
        }
    }

    saveNotes() {
        localStorage.setItem("notes", JSON.stringify(this.notes));
    }

    render() {
        this.saveNotes();
        this.displayNote();
    }

    displayNote() {
        this.$notes.innerHTML = this.notes.map(
            (note) => 
                `
                <div class="note" id="${note.id}" onmouseover="app.handleMouseOverNote(this)" onmouseout="app.handleOnMouseOut(this)">
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
                            <div class="tooltip archive">
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
        this.notes = this.notes.filter((note) => note.id != id);
        this.render();
    }
}

const app = new App();
