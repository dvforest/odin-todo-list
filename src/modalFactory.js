import { createEl } from "./domBuilder.js";

export function createModal({content = []} = {}, onClose = () => {}) {
    const closeBtn = createEl("button", {classes: ["modal-close"], text: "X"});
    const backdrop = createEl("div", { classes: ["modal-backdrop"] });
    const box = createEl("div", { classes: ["modal-box"], children: [closeBtn, ...content] });
    document.body.append(backdrop, box);

    const handleClose = () => {
        backdrop.remove();
        box.remove();
        onClose();
    }

    closeBtn.addEventListener("click", handleClose);
    backdrop.addEventListener("click", handleClose);
    
    return {backdrop, box, handleClose};
}