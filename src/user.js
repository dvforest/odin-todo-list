import { Project } from "./project.js";
import { Dashboard } from "./dashboard.js";

class User {
    static defaultProject = "To Do";

    constructor(name){
        this.name = name;

        this.icon = "img/user.png";

        this.projects = [];
        this.addProject(new Project(User.defaultProject));
    }

    addProject(project){
        this.projects.push(project);
    }

    removeProject(index){
        this.projects.splice(index, 1);
    }
}

export {User};