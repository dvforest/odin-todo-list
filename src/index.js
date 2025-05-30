import "./style.css";

import { User } from "./user.js";
import { Project } from "./projects.js";
import { Todo } from "./todo.js";

const user = new User("David");
const project = new Project("Work");
const task = new Todo("Submit report", "Finish draft by Friday", "2025-05-30", "Urgent", project);

user.addProject(project);
project.addTodo(task);

console.log(user);


