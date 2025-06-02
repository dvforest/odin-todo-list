class Dashboard {
    static sidebar = [
        {
            icon: "img/task.svg",
            title: "Add a task",
            type: "Action",
            function: () => Dashboard.addTask(),
        },
        {
            icon: "img/today.svg",
            title: "Today",
            type: "Action",
            function: () => Dashboard.displayTodayTasks(),
        },
        {
            icon: "img/today.svg",
            title: "Upcoming",
            type: "Action",
            function: () => Dashboard.displayUpcomingTasks(),
        },
        {
            icon: "img/projects.svg",
            title: "My Projects",
            type: "Section",
        }
    ]

    static addTask(){
        //Display new task modal;
    }

    static displayTodayTasks(){
        //Display tasks for today 
    }

    static displayUpcomingTasks(){
        //Display upcoming tasks
    }
}

export {Dashboard};