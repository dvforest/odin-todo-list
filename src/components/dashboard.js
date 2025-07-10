import { Task } from "../models/task.js";
import { createEl, clearHTML } from "../utils/domBuilder.js";
import { createModal } from "./modalFactory.js";
import { getSidebarData } from "../data/sidebarData.js";
import { createSidebar, updateSection } from "./sidebar.js";

class Dashboard {
    constructor(user){
        const appContainer = document.querySelector(".app-container");
        this.user = user;
        this.currentPage = null;
        this.sidebar = createSidebar(
                            getSidebarData( user,
                                            {
                                                addTask: () => this.addTask(),
                                                displayTodayTasks: () => this.displayTodayTasks(),
                                                displayUpcomingTasks: () => this.displayUpcomingTasks(),
                                                displayProject: (name) => this.displayProject(name),
                                            }
                            ), 
                            appContainer);
        appContainer.appendChild(createEl("div", {classes: ["main-content"]}));
    }

    addTask= () => {
        const projects = this.user.projects.map(project => project.title);

        // Create form elements
        const titleInput = createEl("input", { classes: ["modal-input-text"], attrs: { type: "text", placeholder: "Title" } });
        const descriptionInput = createEl("input", { classes: ["modal-input-text"], attrs: { type: "text", placeholder: "Description" } });
        const dueDateInput = createEl("input", { classes: ["modal-input-date"], attrs: { type: "date" } });

        // Priority select
        const prioritySelect = createEl("select", { classes: [], attrs: { name: "priority", id: "priority-select" } });
        Task.validPriorities.forEach(priority => {
            const option = createEl("option", { text: priority, attrs: { value: priority } });
            prioritySelect.appendChild(option);
        });

        // Project select
        const projectSelect = createEl("select", { classes: [], attrs: { name: "project", id: "project-select" } });
        projects.forEach(title => {
            const option = createEl("option", { text: title, attrs: { value: title } });
            projectSelect.appendChild(option);
        });

        // Add button
        const addBtn = createEl("button", { classes: ["modal-button", "modal-button-add"], text: "Add" });

        // Modal content
        const content = [
            createEl("h1", { text: "New Task" }),
            titleInput,
            descriptionInput,
            dueDateInput,
            prioritySelect,
            projectSelect,
            addBtn,
        ];

        // Show modal
        const { handleClose } = createModal({ content }, () => {});

        // Add button event
        addBtn.addEventListener("click", () => {
            const taskData = {
                title: titleInput.value.trim(),
                description: descriptionInput.value.trim(),
                dueDate: dueDateInput.value,
                priority: prioritySelect.value,
                project: projectSelect.value,
            };
            if (taskData.title) {
                const project = this.user.getProject(taskData.project);
                this.user.addTask(new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority, project));
                this.updateProjects();
                handleClose();
            }
        });
    }

    displayTodayTasks = () => {
        // Clear main content
        const mainContent = document.querySelector(".main-content");
        clearHTML(mainContent);

        // Create list of elements for each project containing a checkbox and label
        const taskList = this.user.projects.map( (project, index) => {
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

    }

    displayUpcomingTasks = () => {
       console.log("Display Upcoming Tasks");
    }

    displayProject = (name) => {
        console.log(`Display Project ${name}`);
    }
}

export { Dashboard };