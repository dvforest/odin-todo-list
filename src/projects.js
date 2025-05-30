class Project {
    constructor(title){
        this.title = title;
        this.todos = [];
    }

    addTodo(todo){
        todo.project = this;
        this.todos.push(todo);
    }

    removeTodo(index){
        this.todos.splice(index, 1);
    }
}

export {Project};