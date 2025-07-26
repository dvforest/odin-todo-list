import { Task } from "../../models/task.js";
import { createModal } from "./modal.js";
import { createEl } from "../../utils/domBuilder.js"
import { icon } from "../../assets/icons.js";
import { getTaskModalData } from "./taskModalData.js";

export function createTaskModal(user, { type = "new", task = null, project = null } = {}) {
    const taskModalData = type === "edit"
        ? getTaskModalData(user).edit
        : getTaskModalData(user).new;
    const projects = user.projects.map(project => project.title);

    // Title
    const titleInput = createEl("input", { classes: ["modal-input-text"], attrs: { type: "text", placeholder: "Title" } });
    
    // Description
    const descriptionInput = createEl("textarea", { classes: ["modal-input-text-area"], attrs: { rows: 5, placeholder: "Description" } });
    
    // Due Date
    const today = new Date().toISOString().split("T")[0];
    const dueDateInput = createEl("input", { classes: ["modal-input-date"], attrs: { type: "date", id: "task-due-date", value: today } });
    const dueDateWrapper = createEl("div", {classes: ["modal-flex-wrapper"], children: [
        createEl("label", { classes: ["modal-input-label"], text: "Due", attrs: { for: "task-due-date" } }),
        dueDateInput,
    ]});

    // Priority select
    const prioritySelect = createEl("select", { classes: ["modal-input-select"], attrs: { name: "priority", id: "task-priority" } });
    Task.validPriorities.forEach(priority => {
        const option = createEl("option", { text: priority, attrs: { value: priority } });
        prioritySelect.appendChild(option);
    });
    const prioritySelectWrapper = createEl("div", {classes: ["modal-flex-wrapper"], children: [
        createEl("label", { classes: ["modal-input-label"], text: "Priority", attrs: { for: "task-priority" } }),
        prioritySelect,
    ]});

    // Project select
    const projectSelect = createEl("select", { classes: ["modal-input-select"], attrs: { name: "project", id: "project-select" } });
    projects.forEach(title => {
        const option = createEl("option", { text: title, attrs: { value: title } });
        projectSelect.appendChild(option);
    });
    const projectSelectWrapper = createEl("div", {classes: ["modal-flex-wrapper"], children: [
        createEl("label", { classes: ["modal-input-label"], text: "Project", attrs: { for: "task-project" } }),
       projectSelect,
    ]});

    // Button
    const addBtn = createEl("button", { classes: ["modal-button"], children: [
        createEl("img", {attrs: {src: taskModalData.icon}}),
        createEl("div", {classes: ["button-label"], text: taskModalData.submitText}),
    ]});

    // Create modal
    const modal = createModal({ 
        content: [
            createEl("div", { classes: ["task-modal-wrapper"] , children: [
                createEl("h1", { text: taskModalData.title }),
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
        if (!taskData.title) return; // Prevent empty titles

        // Prepare arguments for submit
        const args = type === "edit"
        ? [task, taskData, taskData.project]
        : [taskData, taskData.project];

        taskModalData.submit(...args);
        modal.handleClose();
    });

    // Prefill if editing task
        if (type === "edit") {
            titleInput.value = task.title;
            descriptionInput.value = task.description;
            dueDateInput.value = task.dueDate;
            prioritySelect.value = task.priority;
            projectSelect.value = task.project.title;
        }
}