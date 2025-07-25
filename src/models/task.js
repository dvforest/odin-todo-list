class Task {
    static validPriorities = ["Low", "Moderate", "Urgent"];

    static deserialize(data) {
        const task = new Task(data.title, data.description, data.dueDate, data.priority, data.isComplete, data.subtasks);
        return task;        
    }

    constructor(title, description, dueDate, priority, isComplete = false, subtasks = [], project){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = isComplete;
        this.subtasks = subtasks;
        this.project = project;
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

    serialize() {
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            subtasks: this.subtasks,
            isComplete: this.isComplete,
        };
    }
}

export {Task};