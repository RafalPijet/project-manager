/// <reference path="base-components.ts"/>
/// <reference path="../util/validation.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../state/project-state.ts"/>

namespace App {
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;
    
        constructor() {
            super('project-input', 'app', true, 'user-input');
            this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title');
            this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description');
            this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people');
            this.configure();
        }
    
        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }
    
        private gatherUserInput(): [string, string, number] | void {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
    
            if (!validate({value: enteredTitle, required: true, minLength: 5, maxLength: 10}) ||
                !validate({value: enteredDescription, required: true, minLength: 5}) ||
                !validate({value: +enteredPeople, required: true, min: 1, max: 5})
            ) {
                alert('Invalid input, please try again!')
            } else {
                return [enteredTitle, enteredDescription, +enteredPeople]
            }
        }
    
        private clearInputs() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        }
     
        @Autobind
        private submitHandler(event: Event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
    
            if (Array.isArray(userInput)) {
                const [title, desc, amount] = userInput;
                projectState.addProject(title, desc, amount, ProjectStatus.Active);
                this.clearInputs();
            }
        };
    
        renderContent() {}
    }
}