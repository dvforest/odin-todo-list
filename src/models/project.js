import { Task } from "./task";

class Project {
     static deserialize(data) {
        const project = new Project(data.title);
        project.tasks = data.tasks.map(t => Task.deserialize(t));
        return project;        
    }

    constructor(title, tasks = []){
        this.title = title;
        this.tasks = tasks;
    }

    addTask(task){
        this.tasks.push(task);
    }

    removeTask(task){
        this.tasks = this.tasks.filter(t => t !== task);
    }

    getTask(title){
        return this.projects.tasks.find(t => t.title === title);
    }

    serialize(){
        return {
            title: this.title,
            tasks: this.tasks.map(t => t.serialize())
        };
    }
}

export {Project};