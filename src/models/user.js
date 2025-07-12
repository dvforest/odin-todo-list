import { Project } from "./project.js";
import { icon } from "../assets/icons.js";
import { Task } from "./task.js";

class User {
    static defaultProject = "To Do";

    constructor(name){
        this.name = name;
        this.icon = "defaultUser";
        this.projects = [];
        this.addProject(new Project(User.defaultProject));
    }

    addProject(title, tasks = []){
        const project = new Project(title, tasks);
        this.projects.push(project);
    }

    removeProject(title){
        const index = this.projects.findIndex(p => p.title === title);
        if (index !== -1){
            this.projects.splice(index, 1);
        }
    }

    getProject(title){
        return this.projects.find(p => p.title === title);
    }

    addTask({title, description, dueDate, priority, isComplete, subtasks}, projectTitle){
        const task = new Task(title, description, dueDate, priority, isComplete, subtasks);
        const project = this.getProject(projectTitle);
        project.addTask(task);
    }

    getIcon(){
        return icon[this.icon];
    }

    serialize() {
        return {
            name: this.name,
            icon: this.icon,
            projects: this.projects.map(p => p.serialize()),
        };
    }
}

export {User};