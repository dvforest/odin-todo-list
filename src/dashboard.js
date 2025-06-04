import defaultUserImage from "./img/default-user.png";
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
                    class: "add-task",
                    function: () => this.addTask(),
                },
                {
                    icon: todaySVG,
                    title: "Today",
                    class: "today",
                    function: () => this.displayTodayTasks(),
                },
                {
                    icon: upcomingSVG,
                    title: "Upcoming",
                    class: "upcoming",
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
        const sidebarDiv = document.querySelector(".sidebar");

        // User Name
        const userDiv = document.createElement("div");
        userDiv.classList.add("user-container");
        sidebarDiv.appendChild(userDiv);
        
        const userIcon = document.createElement("img");
        userIcon.classList.add("user-icon");
        userIcon.src = this.sidebar.user.icon;
        userDiv.appendChild(userIcon);

        const userName = document.createElement("div");
        userName.classList.add("user-name");
        userName.textContent = this.sidebar.user.name;
        userDiv.appendChild(userName);
        
        // Actions
        const actionsDiv = document.createElement("ul");
        actionsDiv.classList.add("actions-container");
        sidebarDiv.appendChild(actionsDiv);

        this.sidebar.actions.forEach( (action) => {
            const li = document.createElement("li");
            li.classList.add(action.class);
            li.classList.add("action-item");
            actionsDiv.appendChild(li);

            const icon = document.createElement("img");
            icon.classList.add("action-icon");
            icon.src = action.icon;
            li.appendChild(icon);

            const title = document.createElement("div");
            title.classList.add("action-title");
            title.textContent = action.title;
            li.appendChild(title);

            li.addEventListener("click", action.function);
        });

        // Projects

        const projectsDiv = document.createElement("div");
        projectsDiv.classList.add("projects-container");
        sidebarDiv.appendChild(projectsDiv);

        const projectsTitle = document.createElement("div");
        projectsTitle.classList.add("projects-title");
        projectsTitle.textContent = this.sidebar.projects.title;
        projectsDiv.appendChild(projectsTitle);

        this.sidebar.projects.list.forEach((project) => {
            const li = document.createElement("li");
            li.classList.add("project-item");
            projectsDiv.appendChild(li);

            const icon = document.createElement("img");
            icon.src = project.icon;
            icon.classList.add("project-icon");
            li.appendChild(icon);

            const title = document.createElement("div");
            title.textContent = project.title;
            title.classList.add("project-title");
            li.appendChild(title);

            li.addEventListener("click", project.function);
        });
    }
}

export { Dashboard };