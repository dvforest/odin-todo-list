class Project {
    constructor(title, tasks = []){
        this.title = title;
        this.tasks = tasks;
    }

    addTask(task){
        this.tasks.push(task);
    }

    removeTask(index){
        this.tasks.splice(index, 1);
    }

    serialize(){
        return {
            title: this.title,
            tasks: this.tasks.map(t => t.serialize())
        };
    }
}

export {Project};