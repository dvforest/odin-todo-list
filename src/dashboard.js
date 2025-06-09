import defaultUserImage from "./img/default-user.svg";
import taskSVG from "./img/task.svg";
import todaySVG from "./img/today.svg";
import upcomingSVG from "./img/upcoming.svg";
import projectsSVG from "./img/projects.svg";
import hashtagSVG from "./img/hashtag.svg";

class Dashboard {
    constructor(user){
        this.user = user;
    }

    get sidebar() { //User getter method to ensure sidebar always reflects latest changes to user
        return {
            user: {
                    icon: this.user.icon || defaultUserImage, //set default icon if none selected
                    name: this.user.name,
            },
            actions: [        
                {
                    icon: taskSVG,
                    title: "Add a task",
                    className: "add-task",
                    function: () => this.addTask(),
                },
                {
                    icon: todaySVG,
                    title: "Today",
                    className: "today",
                    function: () => this.displayTodayTasks(),
                },
                {
                    icon: upcomingSVG,
                    title: "Upcoming",
                    className: "upcoming",
                    function: () => this.displayUpcomingTasks(),
                },
            ],
            projects: {
                icon: projectsSVG,
                title: "My Projects",
                //Extract projects and map to new array containing just the title and a function call
                list: this.user.projects.map(project => ({
                                                    title: project.title,
                                                    icon: hashtagSVG,
                                                    function: () => this.displayProject(project.title),
                                                    })
                                        ),
            }
        };
    }

    displaySidebar = () => {
        console.log("Display Sidebar");
    }

    addTask= () => {
        console.log("Add Task");
    }

    displayTodayTasks = () => {
        console.log("Display Today's Tasks");
    }

    displayUpcomingTasks = () => {
       console.log("Display Upcoming Tasks");
    }

    displayProject = (name) => {
        console.log(`Display Project ${name}`);
    }

    render = () => {
        const sidebarMenu = document.querySelector(".sidebar-menu");
        

        // User Name
        const userSection = document.createElement("div");
        userSection.classList.add("sidebar-section");
        sidebarMenu.appendChild(userSection);

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

        
        // Actions
        const actionsSection = document.createElement("div");
        actionsSection.classList.add("sidebar-section");
        sidebarMenu.appendChild(actionsSection);

        this.sidebar.actions.forEach( (action) => {
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

        // Projects

        const projectsSection = document.createElement("div");
        projectsSection.classList.add("sidebar-section");
        sidebarMenu.appendChild(projectsSection);

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
}

export { Dashboard };