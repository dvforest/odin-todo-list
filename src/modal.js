import { Task } from "./task.js";

class Modal {
    constructor(){
        this.backdrop = document.createElement("div");
        this.backdrop.classList.add("modal-backdrop");
        this.backdrop.addEventListener("click", this.close.bind(this));
        document.body.appendChild(this.backdrop);

        this.box = document.createElement("div");
        this.box.classList.add("modal-box");
        document.body.appendChild(this.box);
    }

    close = () => {
        this.backdrop.remove();
        this.box.remove();
    }
}

class TaskModal extends Modal {
    constructor(projects, onSubmit){
        super();

        const h1 = document.createElement("h1");
        h1.textContent = "New Task";
        this.box.appendChild(h1);

        this.title = document.createElement("input");
        this.title.type = "text";
        this.title.classList.add("modal-input-text");
        this.box.appendChild(this.title);

        this.description = document.createElement("input");
        this.description.type = "text";
        this.description.classList.add("modal-input-text");
        this.box.appendChild(this.description);

        this.dueDate = document.createElement("input");
        this.dueDate.type = "date";
        this.dueDate.classList.add("modal-input-date");
        this.box.appendChild(this.dueDate);

        this.priority = document.createElement("select");
        this.priority.name = "priority";
        this.priority.id = "priority-select";
        Task.validPriorities.forEach( priority => {
            const option = document.createElement("option");
            option.textContent = priority;
            option.value = priority;
            this.priority.appendChild(option);
        })
        this.box.appendChild(this.priority);

        this.project = document.createElement("select");
        this.project.name = "project";
        this.project.id = "project-select";
        projects.forEach(title => {
            const option = document.createElement("option");
            option.textContent = title;
            option.value = title;
            this.project.appendChild(option);
        });
        this.box.appendChild(this.project);

        const addBtn = document.createElement("button");
        addBtn.textContent = "Add";
        addBtn.classList.add("modal-button", "modal-button-add");
        addBtn.addEventListener("click", () => this.addTask(onSubmit));
        this.box.appendChild(addBtn);
    }

    addTask(onSubmit){
        const taskData = {
            title: this.title.value.trim(),
            description: this.description.value.trim(),
            dueDate: this.dueDate.value,
            priority: this.priority.value,
            project: this.project.value,
        };
        if (taskData.title){
            console.log(taskData);
            onSubmit(taskData);
            this.close();
        }
    }
}


export { TaskModal };