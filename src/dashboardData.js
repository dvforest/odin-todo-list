import { icon } from "./icons.js";

export function getSidebarData(user, clickActions) {
    return {
        user: {
            title: null,
            elements: [
                {
                    icon: user.icon,
                    label: user.name,
                    classList: ["sidebar-username"],
                    onClick: null,
                }
            ]
        },
        actions: {
            title: null,
                elements: [        
                    {
                        icon: icon.task,
                        label: "Add a task",
                        classList: ["sidebar-add-task"],
                        onClick: clickActions.addTask,
                    },
                    {
                        icon: icon.today,
                        label: "Today",
                        classList: ["sidebar-today"],
                        onClick: clickActions.displayTodayTasks,
                    },
                    {
                        icon: icon.upcoming,
                        label: "Upcoming",
                        classList: ["sidebar-upcoming"],
                        onClick: clickActions.displayUpcomingTasks,
                    },
                ],
        },
        projects: {
            title: "My Projects",
            elements: user.projects.map( project => (
                {
                    label: project.title,
                    icon: icon.hashtag,
                    classList: ["sidebar-project"],
                    onClick: clickActions.displayProject(project.title),
                })
            ),
        }   
    }
}