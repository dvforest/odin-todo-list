import { Project } from "./project.js";

class User {
    static defaultProject = "To Do";

    constructor(name){
        this.name = name;
        this.projects = [];
        
        //Set default project
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