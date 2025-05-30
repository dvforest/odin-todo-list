class Todo {
    static validPriorities = ["low", "moderate", "urgent"];

    constructor(task, description, dueDate, priority, project){
        this.task = task;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.subtasks = [];
        this.isComplete = false;
    }

    addSubtask(subtask){
        this.subtasks.push(subtask);
    }

    removeSubtask(index){
        this.subtasks.splice(index, 1);
    }

    toggleComplete() {
    this.isComplete = !this.isComplete;
}
}

export {Todo};