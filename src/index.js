import "./styles/style.css";

import { User } from "./models/user.js";
import { Project } from "./models/project.js";
import { Task } from "./models/task.js";
import { Dashboard } from "./components/dashboard.js";

const user = new User("David");
const project = new Project("Work");
const task = new Task("Submit report", "Finish draft by Friday", "2025-05-30", "Urgent", project);
user.addProject(project);
user.addTask(task);
const dashboard = new Dashboard(user);


