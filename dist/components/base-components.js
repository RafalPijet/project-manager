export class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedElement = document.importNode(this.templateElement.content, true);
        this.element = importedElement.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(isInsertAtBegining) {
        this.hostElement.insertAdjacentElement(isInsertAtBegining ? 'afterbegin' : 'beforeend', this.element);
    }
}
;
