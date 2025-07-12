import { Task } from "../models/task.js";
import { createEl, clearHTML } from "../utils/domBuilder.js";
import { createModal } from "./modalFactory.js";
import { getSidebarData } from "../data/sidebarData.js";
import { createSidebar, updateSection } from "./sidebar.js";

export function createDashboard(user) {
    const appContainer = document.querySelector(".app-container");
    const sidebar = createSidebar(
                        getSidebarData( user,
                                        {
                                            displayTaskModal: () => displayAddTaskModal(),
                                            displayTodayTasks: () => displayTodayTasks(),
                                            displayUpcomingTasks: () => displayUpcomingTasks(),
                                            displayProject: (name) => displayProject(name),
                                        }
                        ), 
                        appContainer);
    const mainContent = createEl("div", {classes: ["main-content"]});
    appContainer.appendChild(mainContent);

    let currentPage = null;
    const setCurrentPage = (page) => { currentPage = page; };
    const getCurrentPage = () => currentPage;

    const displayAddTaskModal = () => {
        const projects = user.projects.map(project => project.title);

        // Create form content
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

        // Create modal using content
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

        // Events
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

    const displayTodayTasks = () => {
        clearHTML(mainContent);

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
        mainContent.append(...structure);

        setCurrentPage("todayTasks");

    }

    const displayUpcomingTasks = () => {
       console.log("Display Upcoming Tasks");
    }

    const displayProject = (name) => {
        console.log(`Display Project ${name}`);
    }

    return {
        getSidebar: () => sidebar,
        getMainContent: () => mainContent
    };

}