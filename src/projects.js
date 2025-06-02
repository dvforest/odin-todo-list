class Project {
    constructor(title){
        this.title = title;
        this.tasks = [];
    }

    addTask(task){
        task.project = this;
        this.tasks.push(task);
    }

    removeTask(index){
        this.tasks.splice(index, 1);
    }
}

export {Project};