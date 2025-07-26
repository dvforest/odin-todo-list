import { createEl, clearHTML } from "../../utils/domBuilder.js";
import { createTaskModal } from "../modal/taskModal.js";
import { getSidebarData } from "../sidebar/sidebarData.js";
import { createSidebar } from "../sidebar/sidebar.js";
import { format } from "date-fns";
import { icon } from "../../assets/icons.js";

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
                createEl("div", { classes: ["task-col", "task-col-edit"], text: ""}),
            ]
        });

        // Create list of elements for each task as grid rows
        const tasks = user.getFilteredTasks({date, project}).map((t, index) => {
            const inputId = `task${index}`;
            const editBtn = createEl("button", { classes: ["task-edit-btn"], children: [
                                createEl("img", { classes: ["task-edit-img"], attrs: {src: icon.edit }})
                            ]});
            editBtn.addEventListener("click", () => createTaskModal(user, {type: "edit", task: t, project: t.project}));
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
                    createEl("div", { classes: ["task-col", "task-col-edit"], children: [ editBtn ]}),
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