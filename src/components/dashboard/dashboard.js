import { Task } from "../../models/task.js";
import { createEl, clearHTML } from "../../utils/domBuilder.js";
import { createModal } from "../modal/modal.js";
import { getSidebarData } from "../sidebar/sidebarData.js";
import { createSidebar } from "../sidebar/sidebar.js";

export function createDashboard(user) {
    const appContainer = document.querySelector(".app-container");
    const sidebar = createSidebar(
                        getSidebarData( user,
                                        {
                                            displayAddTaskModal: () => displayAddTaskModal(),
                                            displayTodayTasks: () => displayTodayTasks(),
                                            displayUpcomingTasks: () => displayUpcomingTasks(),
                                            displayProject: (name) => displayProject(name),
                                        }
                        ), 
                        appContainer);
    const mainArea = createEl("div", {classes: ["dashboard-main-area"]});
    appContainer.appendChild(mainArea);

    let currentPage = null;
    const setCurrentPage = (page) => { currentPage = page; };
    const getCurrentPage = () => currentPage;

    function displayAddTaskModal() {
        const projects = user.projects.map(project => project.title);

        // Form content
        const titleInput = createEl("input", { classes: ["modal-input-text"], attrs: { type: "text", placeholder: "Title" } });
        const descriptionInput = createEl("input", { classes: ["modal-input-text"], attrs: { type: "text", placeholder: "Description" } });
        const dueDateInput = createEl("input", { classes: ["modal-input-date"], attrs: { type: "date" } });

        // Priority selection content
        const prioritySelect = createEl("select", { classes: [], attrs: { name: "priority", id: "priority-select" } });
        Task.validPriorities.forEach(priority => {
            const option = createEl("option", { text: priority, attrs: { value: priority } });
            prioritySelect.appendChild(option);
        });

        // Project selection content
        const projectSelect = createEl("select", { classes: [], attrs: { name: "project", id: "project-select" } });
        projects.forEach(title => {
            const option = createEl("option", { text: title, attrs: { value: title } });
            projectSelect.appendChild(option);
        });

        // Add button content
        const addBtn = createEl("button", { classes: ["modal-button", "modal-button-add"], text: "Add" });

        // Use all content to create modal
        const modal = createModal({ 
            content: [
                createEl("h1", { text: "New Task" }),
                titleInput,
                descriptionInput,
                dueDateInput,
                prioritySelect,
                projectSelect,
                addBtn,
            ] 
        });

        // Add events
        addBtn.addEventListener("click", () => {
            const taskData = {
                title: titleInput.value.trim(),
                description: descriptionInput.value.trim(),
                dueDate: dueDateInput.value,
                priority: prioritySelect.value,
                project: projectSelect.value,
            };
            if (taskData.title) {
                const project = user.getProject(taskData.project);
                user.addTask(new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority, project));
                sidebar.updateSection("projects");
                modal.handleClose();
            }
        });
    }

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