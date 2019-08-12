
// Task Object
class Task {
    id: number;
    text: string;
    complete: boolean;
    time: number;

    constructor(id: number, text: string, complete: boolean, time: number) {
        this.id = id;
        this.text = text;
        this.complete = complete;
        this.time = time;
    }

}

// handles all the data
class Model {
    tasks: Task[];
    constructor() {

        this.tasks = [
            { id: 1, text: "Message back Morehead", complete: false, time: 15},
            { id: 2, text: "Finish adding transcripts to site", complete: false, time: 80},
        ]

    }

    addTask(input: string) {
        let currTask = {
            id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1,
            text: input,
            complete: false,
            time: 20,
        }

        this.tasks.push(currTask);
    }

    editTaskText(id: number, updatedInput: string) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? {id: task.id, text: updatedInput, complete: task.complete, time: task.time} : task,
        )
    }

    editTaskTime(id: number, updatedTime: number) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? {id: task.id, text: task.text, complete: task.complete, time: updatedTime} : task,
        )
    }

    deleteTask(id: number) {
        this.tasks = this.tasks.filter(task =>
           task.id !== id 
        )
    }

    toggleTask(id: number) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? {id: task.id, text: task.text, complete: !task.complete, time: task.time} : task,
        )
    }
}

// handles the DOM, HTML, and CSS
class View {
    app: any;
    title: any;
    input: any;
    submitButton: any;
    form: any;
    taskList: any;

    constructor() {
        this.app = this.getElement("#root");
        this.title = this.createElement("h1");
        this.title.textContent = "My Planner";
        this.form = this.createElement("form");
        this.input = this.createElement("input");
        this.input.type = "text";
        this.input.placehold = "Add Task";
        this.input.name = "task";
        this.submitButton = this.createElement("button");
        this.submitButton.textContent = "Submit";
        this.taskList = this.createElement("ul", "todo-list");
        this.form.append(this.input, this.submitButton);
        this.app.append(this.title, this.form, this.taskList);
    }

    createElement(tag: any, className?: any) {
        let element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }

        return element;
    }

    getElement(selector: any) {
        let element = document.querySelector(selector);
        return element;
    }

    private getTaskText() {
        return this.input.value;
    }

    private resetInput() {
        this.input.value = "";
    }

    displayTasks(tasks: Task[]) {
        while (this.taskList.firstChild) {
            this.taskList.removeChild(this.taskList.firstChild);
        }

        if (tasks.length === 0) {
            let p = this.createElement("p");
            p.textContent = "No tasks yet! Start dumping your thoughts!";
            this.taskList.append(p);
        } else {
            tasks.forEach(task =>{
                let li = this.createElement("li");
                li.id = task.id;

                let checkbox = this.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = task.complete;

                let span = this.createElement("span");
                span.contentEditable = true;
                span.classList.add("editable");

                if (task.complete) {
                    let strike = this.createElement("s");
                    strike.textContent = task.text;
                    span.append(strike);
                } else {
                    span.textContent = task.text;
                }

                let deleteButton = this.createElement("button", "delete");
                deleteButton.textContent = "Delete";
                li.append(checkbox, span, deleteButton);

                this.taskList.append(li);
            })
        }
    }
}

class Controller {
     model: Model;
     view: View;
    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
    }
}

let app = new Controller(new Model(), new View());