export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = <HTMLTemplateElement>document.getElementById(templateId);
        this.hostElement = <T>document.getElementById(hostElementId);

        const importedElement = <DocumentFragment>document.importNode(this.templateElement.content, true);
        this.element = <U>importedElement.firstElementChild;

        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }

    private attach(isInsertAtBegining: boolean) {
        this.hostElement.insertAdjacentElement(isInsertAtBegining ? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
};
