
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
    onTaskListChanged: any;

    constructor() {
        
        this.tasks = JSON.parse(localStorage.getItem("tasks")!) || [];

    }

    addTask(input: string) {
        let currTask = {
            id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1,
            text: input,
            complete: false,
            time: 20,
        }

        this.tasks.push(currTask);
        this.onTaskListChanged(this.tasks);
        this.updateLocalStorage(this.tasks);
    }

    editTaskText(id: number, updatedInput: string) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { id: task.id, text: updatedInput, complete: task.complete, time: task.time } : task,
        )

        this.onTaskListChanged(this.tasks);
        this.updateLocalStorage(this.tasks);
    }

    editTaskTime(id: number, updatedTime: number) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { id: task.id, text: task.text, complete: task.complete, time: updatedTime } : task,
        )

        this.onTaskListChanged(this.tasks);
        this.updateLocalStorage(this.tasks);
    }

    deleteTask(id: number) {
        this.tasks = this.tasks.filter(task =>
            task.id !== id
        )

        this.onTaskListChanged(this.tasks);
        this.updateLocalStorage(this.tasks);
    }

    toggleTask(id: number) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { id: task.id, text: task.text, complete: !task.complete, time: task.time } : task,
        )

        this.onTaskListChanged(this.tasks);
        this.updateLocalStorage(this.tasks);
    }

    bindTaskListChanged(callback: any) {
        this.onTaskListChanged = callback;
        this.updateLocalStorage(this.tasks);
    }

    private updateLocalStorage(tasks: Task[]) {
        this.onTaskListChanged(tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}


// handles the DOM, HTML, and CSS
class View {
    app: HTMLElement;
    title: HTMLElement;
    input: HTMLElement;
    submitButton: HTMLButtonElement;
    form: HTMLElement;
    taskList: HTMLElement;

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
            p.textContent = "No tasks yet! Start dumping your to-dos!";
            this.taskList.append(p);
        } else {
            tasks.forEach(task => {
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

    bindAddTask(handler: (arg0: any) => void) {
        this.form.addEventListener("submit", (e: any) => {
            e.preventDefault();

            if (this.getTaskText()) {
                handler(this.getTaskText());
                this.resetInput();
            }
        
        })
    }

    bindDeleteTask(handler: (arg0: number) => void) {
        this.taskList.addEventListener("click", (e: any) => {
            if (e.target!.className === "delete") {
                let id = parseInt(e.target.parentElement.id);

                handler(id);
            }
        })
    }

    bindToggleTask(handler: (arg0: number) => void) {
        this.taskList.addEventListener("change", (e: any) => {
            if (e.target!.type === "checkbox") {
                let id = parseInt(e.target.parentElement.id);

                handler(id);
            }
        })
    }
}

class Controller {

    model: Model;
    view: View;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
        this.onTaskListChanged(this.model.tasks);
        this.view.bindAddTask(this.handleAddTask);
        this.view.bindDeleteTask(this.handleDeleteTask);
        this.view.bindToggleTask(this.handleToggleTask);
        this.model.bindTaskListChanged(this.onTaskListChanged);
    }

    onTaskListChanged = (tasks: Task[]) => {
        this.view.displayTasks(tasks);
    }

    handleAddTask = (input: string) => {
        this.model.addTask(input);
        
    }

    handleEditTaskText = (id: number, input: string) => {
        this.model.editTaskText(id, input);
    }

    handleEditTaskTime = (id: number, time: number) => {
        this.model.editTaskTime(id, time);
    }

    handleDeleteTask = (id: number) => {
        this.model.deleteTask(id);
    }

    handleToggleTask = (id: number) => {
        this.model.toggleTask(id);
    }

    
    
}

let app = new Controller(new Model(), new View());