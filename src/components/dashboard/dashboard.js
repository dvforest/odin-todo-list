import { createEl, clearHTML } from "../../utils/domBuilder.js";
import { createTaskModal } from "../modal/taskModal.js";
import { getSidebarData } from "../sidebar/sidebarData.js";
import { createSidebar } from "../sidebar/sidebar.js";
import { format } from "date-fns";

export function createDashboard(user) {
    const appContainer = document.querySelector(".app-container");
    const sidebar = createSidebar(
                        getSidebarData( user,
                                        {
                                            addTask: () => createTaskModal(user, {type: "new"}),
                                            todayTasks: () => displayTasks({date: format(new Date, "yyyy-MM-dd")}),
                                            upcomingTasks: () => displayTasks(),
                                            project: (title) => displayTasks({project: title}),
                                        }
                        ), 
                        appContainer);
    const mainArea = createEl("div", {classes: ["dashboard-main-area"]});
    appContainer.appendChild(mainArea);

    let currentPage = null;
    const setCurrentPage = (page) => { currentPage = page; };
    const getCurrentPage = () => currentPage;

    function displayTasks({date = "any", project = "any"} = {}) {
        clearHTML(mainArea);

        // Create header row for grid
        const headerRow = createEl("li", {
            classes: ["task-row", "task-header"],
            children: [
                createEl("div", { classes: ["task-col", "task-col-checkbox"], text: "" }),
                createEl("div", { classes: ["task-col", "task-col-title"], text: "Title" }),
                createEl("div", { classes: ["task-col", "task-col-desc"], text: "Description" }),
                createEl("div", { classes: ["task-col", "task-col-date"], text: "Due Date" }),
                createEl("div", { classes: ["task-col", "task-col-priority"], text: "Priority" }),
            ]
        });

        // Create list of elements for each task as grid rows
        const tasks = user.getTasks({date, project}).map((t, index) => {
            const inputId = `task${index}`;
            return createEl("li", {
                classes: ["task-row"],
                children: [
                    createEl("div", { classes: ["task-col", "task-col-checkbox"], children: [
                        createEl("input", { classes: ["task-checkbox"], attrs: {type: "checkbox", id: inputId} })
                    ]}),
                    createEl("div", { classes: ["task-col", "task-col-title"], text: t.title }),
                    createEl("div", { classes: ["task-col", "task-col-desc"], text: t.description || "" }),
                    createEl("div", { classes: ["task-col", "task-col-date"], text: t.dueDate || "" }),
                    createEl("div", { classes: ["task-col", "task-col-priority"], text: t.priority || "" }),
                ]
            });
        });

        // Create structure using created task list
        const structure = [
            createEl("h1", {text: "Today"}),
            createEl("h2", {text: "My Tasks"}),
            createEl("ul", {
                classes: ["task-list"],
                children: [headerRow, ...tasks]
            })
        ];

        // Append structure to main content
        mainArea.append(...structure);

        setCurrentPage("todayTasks");

    }

    return {
        getSidebar: () => sidebar.getEl(),
        getMainArea: () => mainArea
    };

}