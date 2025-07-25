import { icon } from "../../assets/icons.js";

export function getTaskModalData(user) {
    return {
        new: {
            title: "New Task",
            submitText: "Add",
            icon: icon.add,
            submit: () => user.addTask(taskData, projectTitle),
        },
        edit: {
            title: "Edit Task",
            submitText: "Confirm",
            icon: icon.edit,
            submit: () => user.editTask(task, taskData, projectTitle),
        }
    };
}