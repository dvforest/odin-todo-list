class Task {
    static validPriorities = ["low", "moderate", "urgent"];

    constructor(title, description, dueDate, priority, project){
        this.title = title;
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
        if (Task.validPriorities.includes(value)){ //Check if new priority is valid
            this._priority = value;
            return;
        }
        throw new Error(`${value} is invalid. Please choose a valid priority between: ${Task.validPriorities.toString()}`);
    }

    get priority() {
        return this._priority;
    }
}

export {Task};