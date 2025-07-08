import { createEl, clearHTML } from "./domBuilder";
import {createModal} from "./modalFactory.js";

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
        sidebar[name] = sections[name];
    });

    // Update each section
    Object.keys(sections).forEach(name => {
        updateSection(sections[name].el, sections[name].data);
    })

    return sidebar;
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