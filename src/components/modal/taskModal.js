import { Task } from "../../models/task.js";
import { createModal } from "./modal.js";
import { createEl } from "../../utils/domBuilder.js"
import { icon } from "../../assets/icons.js";

export function createTaskModal(user, task = null) {
    const projects = user.projects.map(project => project.title);

    // Form content
    const titleInput = createEl("input", { classes: ["modal-input-text"], attrs: { type: "text", placeholder: "Title" } });
    const descriptionInput = createEl("input", { classes: ["modal-input-text", "modal-input-text-large"], attrs: { type: "text", placeholder: "Description" } });
    const dueDateWrapper = createEl("div", {classes: ["modal-flex-wrapper"], children: [
        createEl("label", { classes: ["modal-input-label"], text: "Due", attrs: { for: "task-due-date" } }),
        createEl("input", { classes: ["modal-input-date"], attrs: { type: "date", id: "task-due-date" } }),
    ]});

    // Priority selection content
    const prioritySelect = createEl("select", { classes: ["modal-input-select"], attrs: { name: "priority", id: "task-priority" } });
    Task.validPriorities.forEach(priority => {
        const option = createEl("option", { text: priority, attrs: { value: priority } });
        prioritySelect.appendChild(option);
    });
    const prioritySelectWrapper = createEl("div", {classes: ["modal-flex-wrapper"], children: [
        createEl("label", { classes: ["modal-input-label"], text: "Priority", attrs: { for: "task-priority" } }),
        prioritySelect,
    ]});

    // Project selection content
    const projectSelect = createEl("select", { classes: ["modal-input-select"], attrs: { name: "project", id: "project-select" } });
    projects.forEach(title => {
        const option = createEl("option", { text: title, attrs: { value: title } });
        projectSelect.appendChild(option);
    });
    const projectSelectWrapper = createEl("div", {classes: ["modal-flex-wrapper"], children: [
        createEl("label", { classes: ["modal-input-label"], text: "Project", attrs: { for: "task-project" } }),
       projectSelect,
    ]});

    // Add button content
    const addBtn = createEl("button", { classes: ["modal-button"], children: [
        createEl("img", {attrs: {src: icon.task}}),
        createEl("div", {classes: ["button-label"], text: "Add"}),
    ]});

    // Use all content to create modal
    const modal = createModal({ 
        content: [
            createEl("div", { classes: ["task-modal-wrapper"] , children: [
                createEl("h1", { text: "New Task" }),
                titleInput,
                descriptionInput,
                dueDateWrapper,
                prioritySelectWrapper,
                projectSelectWrapper,
                addBtn,
            ]}),
        ] 
    });

    // Add events
    addBtn.addEventListener("click", () => {
        const taskData = {
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            dueDate: dueDateInput.value,
            priority: prioritySelect.value,
            project: projectSelect.value,
        };
        if (taskData.title) {
            const project = user.getProject(taskData.project);
            user.addTask(new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority, project));
            modal.handleClose();
        }
    });
}