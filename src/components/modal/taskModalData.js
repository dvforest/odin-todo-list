import { icon } from "../../assets/icons.js";

export function getTaskModalData(user) {
    return {
        new: {
            title: "New Task",
            submitText: "Add",
            icon: icon.add,
            submit: (taskData, projectTitle) => user.addTask(taskData, projectTitle),
        },
        edit: {
            title: "Edit Task",
            submitText: "Confirm",
            icon: icon.edit,
            submit: (task, taskData, projectTitle) => user.editTask(task, taskData, projectTitle),
        }
    };
}