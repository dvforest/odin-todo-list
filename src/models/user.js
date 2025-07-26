import { Project } from "./project.js";
import { icon } from "../assets/icons.js";
import { Task } from "./task.js";

class User {
    static defaultProject = "To Do";

    static deserialize(data) {
        const user = new User(data.name, data.icon);
        user.projects = data.projects.map(p => Project.deserialize(p));
        return user;
    }

    constructor(name, icon = "defaultUser", projects = []){
        this.name = name;
        this.icon = icon,
        this.projects = projects;
        if (projects.length === 0){
            this.addProject(User.defaultProject);
        }
    }

    addProject(title, tasks = []){
        const project = new Project(title, tasks);
        this.projects.push(project);
    }

    removeProject(title){
        const index = this.projects.findIndex(p => p.title === title);
        if (index !== -1){
            this.projects.splice(index, 1);
        }
    }

    getProject(title){
        return this.projects.find(p => p.title === title);
    }

    addTask({title, description, dueDate, priority, isComplete, subtasks}, projectTitle){
        const project = this.getProject(projectTitle);
        const task = new Task(title, description, dueDate, priority, isComplete, subtasks, project);
        project.addTask(task);
    }

    editTask(task, {title, description, dueDate, priority, isComplete, subtasks}, projectTitle){
        const project = this.getProject(projectTitle);
        
        // Move task to new project if needed
        if (!project.tasks.includes(task)) {
            const oldProject = task.project;
            oldProject.removeTask(task);
            task.project = project;
            project.addTask(task);
        }

        // Update task properties
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        task.isComplete = isComplete;
        task.subtasks = subtasks;
    }

    getIcon(){
        return icon[this.icon];
    }

    getFilteredTasks({date = "any", project = "any"} = {}) {
        return this.projects
        .filter( p => project === "any" || p.title === project)
        .flatMap( p => 
            p.tasks.filter( t => date === "any" || t.dueDate === date)
        );
    }

    getTask(title){
        for (const project of this.projects) {
            const task = project.tasks.find(t => t.title === title);
            if (task) {
                return task;
            }
        }
    }

    serialize() {
        return {
            name: this.name,
            icon: this.icon,
            projects: this.projects.map(p => p.serialize()),
        };
    }
}

export {User};