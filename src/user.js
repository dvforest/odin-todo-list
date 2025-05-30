class User {
    constructor(name){
        this.name = name;
        this.projects = [];
    }

    addProject(project){
        this.projects.push(project);
    }

    removeProject(index){
        this.projects.splice(index, 1);
    }
}

export {User};