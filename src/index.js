import "./style.css";

import { User } from "./models/user.js";
import { createDashboard } from "./components/dashboard/dashboard.js";
import { save, load } from "./utils/storageManager.js";

const user = new User("David");
user.addProject("Work");
user.addTask({title: "Submit report", description: "Finish draft by Friday", dueDate: "2026-05-30", priority: "Urgent"}, "Work");
save("userData", user);

//const user = load("userData", User);
//user.addTask({title: "Finish email", description: "Write to Gavan", dueDate: "2025-07-20", priority: "Moderate"}, "Work");

const dashboard = createDashboard(user);
