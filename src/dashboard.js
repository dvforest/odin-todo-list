import defaultUserImage from "./img/default-user.svg";
import taskSVG from "./img/task.svg";
import todaySVG from "./img/today.svg";
import upcomingSVG from "./img/upcoming.svg";
import projectsSVG from "./img/projects.svg";
import hashtagSVG from "./img/hashtag.svg";
import { Task } from "./task.js";
import {createEl} from "./domBuilder.js";
import {createModal} from "./modalFactory.js";

class Dashboard {
    constructor(user){
        this.user = user;
        this.currentPage = "";
    }

    get sidebar() { //Use getter method to ensure sidebar always reflects latest changes to user
        return {
            user: {
                    icon: this.user.icon || defaultUserImage, //set default icon if none selected
                    name: this.user.name,
                    id: "sidebar-user-section",
            },
            actions: {
                    id: "sidebar-actions-section",
                    list: [        
                        {
                            icon: taskSVG,
                            title: "Add a task",
                            className: "sidebar-add-task",
                            function: () => this.addTask(),
                        },
                        {
                            icon: todaySVG,
                            title: "Today",
                            className: "sidebar-today",
                            function: () => this.displayTodayTasks(),
                        },
                        {
                            icon: upcomingSVG,
                            title: "Upcoming",
                            className: "sidebar-upcoming",
                            function: () => this.displayUpcomingTasks(),
                        },
                    ],
            },
            projects: {
                icon: projectsSVG,
                title: "My Projects",
                id: "sidebar-projects-section",
                list: this.user.projects.map(project => ({
                                                    title: project.title,
                                                    icon: hashtagSVG,
                                                    function: () => this.displayProject(project.title),
                                                    })
                                        ),
            }
        };
    }

    clearHTML = (element) => {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    initSidebar = () => {
        const sidebarMenu = document.getElementById("sidebar-menu");
        Object.values(this.sidebar).forEach(section => {
            const el = createEl("div", {classes: ["sidebar-section"], attrs: {id: section.id}});
            sidebarMenu.appendChild(el);
        })
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
        const mainContent = document.getElementById("main-content");
        this.clearHTML(mainContent);
        
        // Create list of elements for each project containing a checkbox and label
        const taskList = this.sidebar.projects.list.map( (project, index) => {
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

    updateUser = () => {
        // Clear section
        let userSection = document.getElementById(this.sidebar.user.id);
        this.clearHTML(userSection);

        // Append user button with icon and text
        const btn = createEl("button", {
            classes: ["sidebar-button"],
            children: [
                createEl("img", {attrs: {src: this.sidebar.user.icon}}),
                createEl("div", {classes: ["sidebar-title", "sidebar-username"], text: this.sidebar.user.name}),
            ]
        });
        userSection.appendChild(btn);

    }

    updateActions = () => {
        // Clear section
        let actionsSection = document.getElementById(this.sidebar.actions.id);
        this.clearHTML(actionsSection);

        // Append a button for each action containing an icon and title
        this.sidebar.actions.list.forEach( (action) => {
            const btn = createEl("button", {
                classes: ["sidebar-button", action.className],
                children: [
                    createEl("img", {attrs: {src: action.icon}}),
                    createEl("div", {classes: ["sidebar-title"], text: action.title}),
                ]});
            btn.addEventListener("click", action.function);
            actionsSection.appendChild(btn);
        });
    }

    updateProjects = () => {
        // Clear section
        let projectsSection = document.getElementById(this.sidebar.projects.id);
        this.clearHTML(projectsSection);

        // Create a button for each project containing an icon and title
        const projectList = this.sidebar.projects.list.map( project => {
                const btn = createEl("button", {
                    classes:["sidebar-button"],
                    children: [
                        createEl("img", { attrs: {src: project.icon} }),
                        createEl("div", {classes: ["sidebar-title"], text: project.title}),
                    ],
                });
                btn.addEventListener("click", project.function);
                return btn;
            });

        // Create structure using project list
        const structure = [
            createEl("div", {classes: ["sidebar-inert-title"], text: this.sidebar.projects.title}),
            ...projectList
        ]

        //Append structure to project section
        projectsSection.append(...structure);
    }

    render = () => {
        this.initSidebar();
        this.updateUser();
        this.updateActions();
        this.updateProjects();
    }
}

export { Dashboard };