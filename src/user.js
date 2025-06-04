import { Project } from "./project.js";
import userImage from "./img/default-user.png";

class User {
    static defaultProject = "To Do";

    constructor(name){
        this.name = name;

        this.icon = userImage;

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