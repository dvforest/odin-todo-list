import "./style.css";

import { User } from "./models/user.js";
import { Project } from "./models/project.js";
import { Task } from "./models/task.js";
import { createDashboard } from "./components/dashboard/dashboard.js";

const user = new User("David");
user.addProject("Work");
user.addTask({title: "Submit report", description: "Finish draft by Friday", dueDate: "2025-05-30", priority: "Urgent"}, "Work");
const dashboard = createDashboard(user);
console.log(user.serialize());


