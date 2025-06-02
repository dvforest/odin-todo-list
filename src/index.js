import "./style.css";

import { User } from "./user.js";
import { Project } from "./project.js";
import { Task } from "./task.js";

const user = new User("David");
const project = new Project("Work");
const task = new Task("Submit report", "Finish draft by Friday", "2025-05-30", "Urgent", project);

user.addProject(project);
project.addTask(task);

console.log(user);


