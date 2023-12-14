class task {

    getToDoListForm() {
        return cy.get('[data-container-testid="to-do"]')
    }

    getToDoListFormTitle() {
        return cy.get('[data-text-testid="title"]')
    }

    getTaskInput() {
        return cy.get('[data-input-testid="taskInput"]')
    }

    getTaskAddButton() {
        return cy.get('[data-clickable-testid="addTask"]')
    }

    getAddedTask(taskvalue) {
        return cy.get('[data-clickable-testid="' + taskvalue + '"]')
    }

    getlistItems() {
        return cy.get('[data-list-testid="task-list"]').find('li')
    }

    getDeleteTask(taskvalue) {
        return cy.get('[data-clickable-testid="delete ' + taskvalue + '"]')
    }

}

export default task