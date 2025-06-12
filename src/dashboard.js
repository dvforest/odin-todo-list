import defaultUserImage from "./img/default-user.svg";
import taskSVG from "./img/task.svg";
import todaySVG from "./img/today.svg";
import upcomingSVG from "./img/upcoming.svg";
import projectsSVG from "./img/projects.svg";
import hashtagSVG from "./img/hashtag.svg";
import radioBoxBlankSVG from "./img/radiobox-blank.svg";

class Dashboard {
    constructor(user){
        this.user = user;
    }

    get sidebar() { //User getter method to ensure sidebar always reflects latest changes to user
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
            const element = document.createElement("div");
            element.classList.add("sidebar-section");
            element.id = section.id;
            sidebarMenu.appendChild(element);
        })
    }

    addTask= () => {
        console.log("Add Task");
    }

    displayTodayTasks = () => {
        const mainContent = document.getElementById("main-content");
        this.clearHTML(mainContent);

        const h1 = document.createElement("h1");
        h1.textContent = "Today";
        mainContent.appendChild(h1);
    
        const h2 = document.createElement("h2");
        h2.textContent = "My Projects";
        mainContent.appendChild(h2);

        const ul = document.createElement("ul");
        mainContent.appendChild(ul);

        this.sidebar.projects.list.forEach( (project, index) => {
            const li = document.createElement("li");
            ul.appendChild(li);

            const input = document.createElement("input");
            input.type = "checkbox";
            input.id = `project${index}`;
            li.appendChild(input);

            const label = document.createElement("label");
            label.htmlFor = input.id;
            label.textContent = project.title;
            li.appendChild(label);
        });

    }

    displayUpcomingTasks = () => {
       console.log("Display Upcoming Tasks");
    }

    displayProject = (name) => {
        console.log(`Display Project ${name}`);
    }

    updateUser = () => {

        let userSection = document.getElementById(this.sidebar.user.id);
        this.clearHTML(userSection);

        const userBtn = document.createElement("button");
        userBtn.classList.add("sidebar-button");
        userSection.appendChild(userBtn);
        
        const userIcon = document.createElement("img");
        userIcon.src = this.sidebar.user.icon;
        userBtn.appendChild(userIcon);

        const userName = document.createElement("div");
        userName.classList.add("sidebar-title", "sidebar-username");
        userName.textContent = this.sidebar.user.name;
        userBtn.appendChild(userName);

    }

    updateActions = () => {

        let actionsSection = document.getElementById(this.sidebar.actions.id);
        this.clearHTML(actionsSection);

        this.sidebar.actions.list.forEach( (action) => {
            const actionBtn = document.createElement("button");
            actionBtn.classList.add("sidebar-button", action.className);
            actionsSection.appendChild(actionBtn);

            const icon = document.createElement("img");
            icon.src = action.icon;
            actionBtn.appendChild(icon);

            const title = document.createElement("div");
            title.classList.add("sidebar-title");
            title.textContent = action.title;
            actionBtn.appendChild(title);

            actionBtn.addEventListener("click", action.function);
        });
    }

    updateProjects = () => {

        let projectsSection = document.getElementById(this.sidebar.projects.id);
        this.clearHTML(projectsSection);

        const projectsTitle = document.createElement("div");
        projectsTitle.classList.add("sidebar-inert-title");
        projectsTitle.textContent = this.sidebar.projects.title;
        projectsSection.appendChild(projectsTitle);

        this.sidebar.projects.list.forEach((project) => {
            const projectBtn = document.createElement("button");
            projectBtn.classList.add("sidebar-button");
            projectsSection.appendChild(projectBtn);

            const icon = document.createElement("img");
            icon.src = project.icon;
            projectBtn.appendChild(icon);

            const title = document.createElement("div");
            title.textContent = project.title;
            title.classList.add("sidebar-title");
            projectBtn.appendChild(title);

            projectBtn.addEventListener("click", project.function);
        });
    }

    render = () => {
        this.initSidebar();
        this.updateUser();
        this.updateActions();
        this.updateProjects();
    }
}

export { Dashboard };