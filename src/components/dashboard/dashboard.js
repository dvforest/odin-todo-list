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

        // Create list of elements for each task containing a checkbox and label
        const tasks = user.getTasks({date, project}).map( (t, index) => {
            const inputId = `task${index}`;
            return createEl("li", {
                children: [
                    createEl("input", { classes: ["task-checkbox"], attrs: {type: "checkbox", id: inputId} } ),
                    createEl("label", { classes: ["task-label"], text: t.title, attrs: {for: inputId} } ),
                ]
            })
        });

        // Create structure using created task list
        const structure = [
            createEl("h1", {text: "Today"}),
            createEl("h2", {text: "My Tasks"}),
            createEl("ul", {
                children: tasks
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