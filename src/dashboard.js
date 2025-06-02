class Dashboard {
    constructor(user){
        this.user = user;
    }

    get sidebar() { //User getter method to ensure sidebar always reflects latest changes to user
        return {
            user: {
                    icon: this.user.icon || "img/default-user.svg", //set default icon if none selected
                    name: this.user.name,
            },
            actions: [        
                {
                    icon: "img/task.svg",
                    title: "Add a task",
                    function: () => this.addTask(),
                },
                {
                    icon: "img/today.svg",
                    title: "Today",
                    function: () => this.displayTodayTasks(),
                },
                {
                    icon: "img/upcoming.svg",
                    title: "Upcoming",
                    function: () => this.displayUpcomingTasks(),
                },
            ],
            projects: {
                icon: "img/projects.svg",
                title: "My Projects",

                //Extract project titles and map to new array containing just the title and a function call
                list: this.user.projects.map(project => ({
                                                    title: project.title,
                                                    function: () => this.displayProject(project.title),
                                                    })
                                        ),
            }
        };
    }

    displaySidebar = () => {
        //Display sidebar
    }

    addTask= () => {
        //Display new task modal;
    }

    displayTodayTasks = () => {
        //Display tasks for today 
    }

    displayUpcomingTasks = () => {
        //Display upcoming tasks
    }

    displayProject = (name) => {
        //Display project by name
    }
}

export {Dashboard};