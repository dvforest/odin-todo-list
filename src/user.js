import { Project } from "./project.js";
import userImage from "./img/default-user.svg";

class User {
    static defaultProject = "To Do";

    constructor(name){
        this.name = name;

        this.icon = userImage;

        this.projects = [];
        this.tasks = [];
        this.addProject(new Project(User.defaultProject));
    }

    addProject(project){
        this.projects.push(project);
    }

    removeProject(title){
        const index = this.projects.findIndex(project => project.title === title);
        if (index !== -1){
            this.projects.splice(index, 1);
        }
    }

    getProject(title){
        return this.projects.find(project => project.title === title);
    }

    addTask(task){
        this.tasks.push(task);
        task.project.addTask(task);
    }
}

export {User};