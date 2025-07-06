import { createEl, clearHTML } from "./domBuilder";

export function createSidebar(sidebarData, container) {

    // Create container
    const sidebar = createEl("nav",{classes: ["sidebar-container"]});
    container.appendChild(sidebar);
    
    // Create all sections
    const sections = {};
    Object.keys(sidebarData).forEach(name => {
        sections[name] = {
            el: createEl("div", {classes: ["sidebar-section"]}),
            data: sidebarData[name],
        }
        sidebar.appendChild(sections[name].el);
    });

    // Update each section
    Object.keys(sections).forEach(name => {
        updateSection(sections[name].el, sections[name].data);
    })

    return sidebar, sections;
}

export function updateSection(sectionEl, sectionData) {
    
        // Clear section
        clearHTML(sectionEl);

        // Add title if exists
        if (sectionData.title){
            const title = createEl("div", {classes: ["sidebar-title"], text: sectionData.title})
            sectionEl.appendChild(title);
        }

        // Add icon and label inside a button for each element of the section
        sectionData.elements.forEach( (el) => {
            const btn = createEl("button", {
                classes: ["sidebar-button", ...el.classList],
                children: [
                    createEl("img", {attrs: {src: el.icon}}),
                    createEl("div", {classes: ["sidebar-label"], text: el.label}),
                ]});
            
            // Add click action if applicable
            if (el.onClick) btn.addEventListener("click", el.onClick);
            
            sectionEl.appendChild(btn);
        });
}

addTask= () => {
    const projects = this.user.projects.map(project => project.title);

    // Create form elements
    const titleInput = createEl("input", { classes: ["modal-input-text"], attrs: { type: "text", placeholder: "Title" } });
    const descriptionInput = createEl("input", { classes: ["modal-input-text"], attrs: { type: "text", placeholder: "Description" } });
    const dueDateInput = createEl("input", { classes: ["modal-input-date"], attrs: { type: "date" } });

    // Priority select
    const prioritySelect = createEl("select", { classes: [], attrs: { name: "priority", id: "priority-select" } });
    Task.validPriorities.forEach(priority => {
        const option = createEl("option", { text: priority, attrs: { value: priority } });
        prioritySelect.appendChild(option);
    });

    // Project select
    const projectSelect = createEl("select", { classes: [], attrs: { name: "project", id: "project-select" } });
    projects.forEach(title => {
        const option = createEl("option", { text: title, attrs: { value: title } });
        projectSelect.appendChild(option);
    });

    // Add button
    const addBtn = createEl("button", { classes: ["modal-button", "modal-button-add"], text: "Add" });

    // Modal content
    const content = [
        createEl("h1", { text: "New Task" }),
        titleInput,
        descriptionInput,
        dueDateInput,
        prioritySelect,
        projectSelect,
        addBtn,
    ];

    // Show modal
    const { handleClose } = createModal({ content }, () => {});

    // Add button event
    addBtn.addEventListener("click", () => {
        const taskData = {
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            dueDate: dueDateInput.value,
            priority: prioritySelect.value,
            project: projectSelect.value,
        };
        if (taskData.title) {
            const project = this.user.getProject(taskData.project);
            this.user.addTask(new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority, project));
            this.updateProjects();
            handleClose();
        }
    });
}

displayTodayTasks = () => {
    // Clear main content
    const mainContent = document.getElementById("main-content");
    clearHTML(mainContent);
    
    // Create list of elements for each project containing a checkbox and label
    const taskList = this.sidebar.projects.list.map( (project, index) => {
        const inputId = `project${index}`;
        return createEl("li", {
            children: [
                createEl("input", { classes: ["project-checkbox"], attrs: {type: "checkbox", id: inputId} } ),
                createEl("label", { classes: ["project-label"], text: project.title, attrs: {for: inputId} } ),
            ]
        })
    });

    // Create structure using created task list
    const structure = [
        createEl("h1", {text: "Today"}),
        createEl("h2", {text: "My Projects"}),
        createEl("ul", {
            children: taskList
        })
    ];

    // Append structure to main content
    mainContent.append(...structure);

}

displayUpcomingTasks = () => {
    console.log("Display Upcoming Tasks");
}

displayProject = (name) => {
    console.log(`Display Project ${name}`);
}