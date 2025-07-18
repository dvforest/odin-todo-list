import { createEl, clearHTML } from "../../utils/domBuilder.js";
import { createTaskModal } from "../modal/taskModal.js";
import { getSidebarData } from "../sidebar/sidebarData.js";
import { createSidebar } from "../sidebar/sidebar.js";

export function createDashboard(user) {
    const appContainer = document.querySelector(".app-container");
    const sidebar = createSidebar(
                        getSidebarData( user,
                                        {
                                            addTask: () => createTaskModal(user, {type: "new"}),
                                            todayTasks: () => displayTodayTasks(),
                                            upcomingTasks: () => displayUpcomingTasks(),
                                            project: (name) => displayProject(name),
                                        }
                        ), 
                        appContainer);
    const mainArea = createEl("div", {classes: ["dashboard-main-area"]});
    appContainer.appendChild(mainArea);

    let currentPage = null;
    const setCurrentPage = (page) => { currentPage = page; };
    const getCurrentPage = () => currentPage;

    function displayTodayTasks() {
        clearHTML(mainArea);

        // Create list of elements for each project containing a checkbox and label
        const taskList = user.projects.map( (project, index) => {
            const inputId = `project${index}`;
            return createEl("li", {
                children: [
                    createEl("input", { classes: ["project-checkbox"], attrs: {type: "checkbox", id: inputId} } ),
                    createEl("label", { classes: ["project-label"], text: project.title, attrs: {for: inputId} } ),
                ]
            })
        });

        // Create structure using created task list
        const structure = [
            createEl("h1", {text: "Today"}),
            createEl("h2", {text: "My Projects"}),
            createEl("ul", {
                children: taskList
            })
        ];

        // Append structure to main content
        mainArea.append(...structure);

        setCurrentPage("todayTasks");

    }

    function displayUpcomingTasks() {
       console.log("Display Upcoming Tasks");
    }

    function displayProject(name) {
        console.log(`Display Project ${name}`);
    }

    return {
        getSidebar: () => sidebar.getEl(),
        getMainArea: () => mainArea
    };

}