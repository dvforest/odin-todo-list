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

    set priority(value) {
         
        value = value.toLowerCase().trim(); //Remove any caps or whitespace

        if (Todo.validPriorities.includes(value)){ //Check if new priority is valid
            this._priority = value;
            return;
        }
        throw new Error(`${value} is invalid. Please choose a valid priority between: ${Todo.validPriorities.toString()}`);
    }

    get priority() {
        return this._priority;
    }
}

export {Todo};