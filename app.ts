
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

    addTask(input: string, inputTime: number) {
        let currTask = {
            id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1,
            text: input,
            complete: false,
            time: inputTime === undefined ? 20 : inputTime,
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
    input: HTMLInputElement;
    submitButton: HTMLButtonElement;
    submitButton2: HTMLButtonElement;
    form: HTMLElement;
    form2: HTMLElement;
    taskList: HTMLElement;
    time: HTMLInputElement;
    finalMessage: HTMLElement;
    timeFreeQuestion: HTMLElement;
    hours: HTMLInputElement;
    minutes: HTMLInputElement;
    totalTime: number;
    tempTaskText: string;
    tempTaskTime: number;

    constructor() {
        this.app = this.getElement("#root");
        this.title = this.createElement("h1");
        this.title.textContent = "My Planner";
        this.title.style.textAlign = "center";
        this.form = this.createElement("form");

        this.input = this.createElement("input");
        this.input.type = "text";
        this.input.placeholder = "Add Task";
        this.input.name = "task";

        this.time = this.createElement("input");
        this.time.type = "number";
        this.time.placeholder = "20 mins";
        this.time.name = "time";

        this.submitButton = this.createElement("button");
        this.submitButton.textContent = "Submit";
        this.taskList = this.createElement("ul", "todo-list");

        this.timeFreeQuestion = this.createElement("h3");
        this.form2 = this.createElement("form");
        this.timeFreeQuestion.type = "text";
        this.timeFreeQuestion.textContent = "How much freetime do you have right now?";
        this.timeFreeQuestion.name = "freetime";

        this.hours = document.createElement("input");
        this.hours.type = "number";
        this.hours.placeholder = "hours"
        this.minutes = document.createElement("input");
        this.minutes.type = "number";
        this.minutes.placeholder = "minutes";
        this.submitButton2 = this.createElement("button");
        this.submitButton2.textContent = "Calculate Time for Tasks!"
        this.totalTime = 0;
        this.finalMessage = document.createElement("p");
        

        this.form2.append(this.timeFreeQuestion, this.hours, this.minutes, this.submitButton2);
        this.form.append(this.input, this.time, this.submitButton);
        this.app.append(this.title, this.form, this.taskList, this.timeFreeQuestion, this.finalMessage, this.form2);
        this.tempTaskText = "";
        this.tempTaskTime = 0;
        this.updateTempState();

        
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


    displayTasks(tasks: Task[]) {
        while (this.taskList.firstChild) {
            this.taskList.removeChild(this.taskList.firstChild);
        }

        if (tasks.length === 0) {
            let p = this.createElement("p");
            p.textContent = "No tasks yet? Start dumping your to-dos!";
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

                let setTime = this.createElement("input");
                setTime.type = "number";
                setTime.value = task.time; 

                let timeText = this.createElement("p");
                timeText.innerText = " "; // add word "mins" later

                if (task.complete) {
                    let strike = this.createElement("s");
                    strike.textContent = task.text;
                    span.append(strike);
                } else {
                    span.textContent = task.text;
                }

                let deleteButton = this.createElement("button", "delete");
                deleteButton.textContent = "Delete";
                li.append(checkbox, span, setTime, timeText, deleteButton);

                this.taskList.append(li);
            })
        }
    }

    bindAddTask(handler: (arg0: any) => void) {
        this.form.addEventListener("submit", (e: any) => {
            e.preventDefault();

            if (this.getTaskText() && this.getTaskTime()) {
                handler(this.getTaskText(), this.getTaskTime());
                this.resetInput();
                this.resetTime();
            } 
           
        
        })
    }

    bindCalcTime = (handler: any) => {
        
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

    bindEditTaskTime = (handler: (arg0: number, arg1: number) => void) => {
        this.taskList.addEventListener("focusout", (e: event) => {
            if (this.tempTaskTime) {
                let id = parseInt(e.target.parentElement.id);

                handler(id, this.tempTaskTime);
                this.tempTaskTime = 20;
            }
        })
    }

    private updateTempState() {
        this.taskList.addEventListener("input", (e: event) => {
            if (e.target.className === "editable" && e.target.type === "text") {
                this.tempTaskText = e.target.innerText;
                
            } else if (e.target.type === "number") {
                this.tempTaskTime = e.target.value;
            } 
        })

        this.form2.addEventListener("submit", (e: any) => {
            e.preventDefault();



            this.finalMessage.textContent = "You should be able to complete " + this.totalTime + " tasks today!";
        })
    }


    private getTaskText() {
        return this.input.value;
    }

    private getTaskTime() {
        return this.time.value;
    }

    private resetInput() {
        this.input.value = "";
    }

    private resetTime() {
        this.time.value = "";
    }

    bindEditTaskText(handler: (arg0: number, arg1: string) => void) {
        this.taskList.addEventListener("focusout", (e: event) => {
            if (this.tempTaskText) {
                let id = parseInt(e.target.parentElement.id);

                handler(id, this.tempTaskText);
                this.tempTaskText = "";
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
        this.view.bindEditTaskText(this.handleEditTaskText);
        this.view.bindEditTaskTime(this.handleEditTaskTime);
    }

    onTaskListChanged = (tasks: Task[]) => {
        this.view.displayTasks(tasks);
    }

    handleAddTask = (input: string, time: number) => {
        if (time === undefined) {
            time = 20;
        }
        this.model.addTask(input, time);
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