import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import task from "../../pageObjects/task";

const Task = new task();

Given('I open the to-do-list web app url', function () {
    cy.visit(Cypress.env('url'))
})

//Add Task
//Verify user can able to add a task
When('I provided the value in the task input and clicked the add button', function () {
    Task.getToDoListForm().should('be.visible')
    Task.getToDoListFormTitle().should('have.text', this.ToDoJson.TC0001.title)
    Task.getTaskInput().type(this.ToDoJson.TC0001.taskValue)
    Task.getTaskAddButton().click()
})
Then('I should see the added task gets listed under the input field', function () {
    Task.getAddedTask(this.ToDoJson.TC0001.taskValue).should('exist')
    cy.screenshot({ capture: 'runner', overwrite: true })
})


//Verify alert is shown when user try to add empty task
When('I leave task input field as empty and clicked the add button', function () {
    Task.getToDoListForm().should('be.visible')
    Task.getToDoListFormTitle().should('have.text', this.ToDoJson.TC0002.title)
    Task.getTaskInput().focus()
    Task.getTaskAddButton().click()
})
Then('I should see a popup with an alert message', function () {
    cy.on('window:alert', (txt) => {
        expect(txt).to.equal(this.ToDoJson.TC0002.alertMessage)
    })
    cy.screenshot({ capture: 'runner', overwrite: true })
})

// Verify that the task list remains unchanged
When('I provided the value in the task input and clicked the add button and repeated the steps to add multiple tasks', function () {

    this.ToDoJson.TC0003.tasks.forEach((task) => {
        cy.addTask(task)
    })
})
Then('I got the count of the tasks listed and tried to add an empty task and checked whether the list remains unchanged', function () {
    Task.getlistItems().its('length').then((itemCount) => {
        let initialTaskCount = itemCount
        Task.getTaskInput().focus()
        Task.getTaskAddButton().click()
        Task.getlistItems().should('have.length', initialTaskCount)
        cy.screenshot({ capture: 'runner', overwrite: true })
    })
})

//Verify input field got cleared after adding a task
When('I added a task', function () {
    Task.getToDoListForm().should('be.visible')
    Task.getToDoListFormTitle().should('have.text', this.ToDoJson.TC0004.title)
    Task.getTaskInput().type(this.ToDoJson.TC0004.taskValue)
    Task.getTaskAddButton().click()
    Task.getAddedTask(this.ToDoJson.TC0004.taskValue).should('exist')
})
Then('I should see the task input field got cleared automatically', function () {
    Task.getTaskInput().should('be.empty')
    cy.screenshot({ capture: 'runner', overwrite: true })
})

//Complete Task
//Verify user can able to mark a task as complete by clicking on the task
When('I added a task and clicked that listed task', function () {
    Task.getToDoListForm().should('be.visible')
    Task.getToDoListFormTitle().should('have.text', this.ToDoJson.TC0005.title)
    Task.getTaskInput().type(this.ToDoJson.TC0005.taskValue)
    Task.getTaskAddButton().click()
    Task.getAddedTask(this.ToDoJson.TC0005.taskValue).should('not.have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')
    Task.getAddedTask(this.ToDoJson.TC0005.taskValue).click()
})
Then('I should see the task marked as complete indicated with a strikethrough line', function () {
    Task.getAddedTask(this.ToDoJson.TC0005.taskValue).should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')
    cy.screenshot({ capture: 'runner', overwrite: true })
})


//Delete Task
//Verify user can able to delete a pending task
When('I added a task and clicked the delete icon right to the task listed', function () {
    Task.getToDoListForm().should('be.visible')
    Task.getToDoListFormTitle().should('have.text', this.ToDoJson.TC0006.title)
    Task.getTaskInput().type(this.ToDoJson.TC0006.taskValue)
    Task.getTaskAddButton().click()
    Task.getDeleteTask(this.ToDoJson.TC0006.taskValue).click()
})

Then('I should see the task got removed from the list', function () {
    Task.getAddedTask(this.ToDoJson.TC0006.taskValue).should('not.exist')
    cy.screenshot({ capture: 'runner', overwrite: true })
})

//Verify user can able to delete a completed task
When('I added a task and marked the task as completed', function () {
    Task.getToDoListForm().should('be.visible')
    Task.getToDoListFormTitle().should('have.text', this.ToDoJson.TC0007.title)
    Task.getTaskInput().type(this.ToDoJson.TC0007.taskValue)
    Task.getTaskAddButton().click()
    Task.getAddedTask(this.ToDoJson.TC0007.taskValue).click()
    Task.getAddedTask(this.ToDoJson.TC0007.taskValue).should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')
})

Then('I clicked the delete icon right to the task and should see the task got removed from the list', function () {
    Task.getDeleteTask(this.ToDoJson.TC0007.taskValue).click()
    Task.getAddedTask(this.ToDoJson.TC0007.taskValue).should('not.exist')
    cy.screenshot({ capture: 'runner', overwrite: true })

})

//DataPersistence
//Verify data persistence on page reload
When('I added the tasks and marked some task as completed and reloaded the page', function () {
    this.ToDoJson.TC0008.tasks.forEach((task) => {
        cy.addTask(task)
    })
    Task.getAddedTask(this.ToDoJson.TC0008.tasks[3]).click()
    cy.reload()

})

Then('I should see the tasks list data retained', function () {
    this.ToDoJson.TC0008.tasks.forEach((task) => {
        Task.getAddedTask(task).should('exist')
    })
    Task.getAddedTask(this.ToDoJson.TC0008.tasks[3]).should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')
})

When('I deleted a task and reloaded the page', function () {
    Task.getDeleteTask(this.ToDoJson.TC0008.tasks[1]).click()
    cy.reload()
})

Then('I should see the tasks list retained as per last action regardless of page reload', function () {
    Task.getDeleteTask(this.ToDoJson.TC0008.tasks[1]).should('not.exist')
    cy.screenshot({ capture: 'runner', overwrite: true })
})


//	Verify data persistence on closing and opening the web page
When('I added the tasks and marked some task as completed and revisited the page', function () {
    this.ToDoJson.TC0009.tasks.forEach((task) => {
        cy.addTask(task)
    })
    Task.getAddedTask(this.ToDoJson.TC0009.tasks[3]).click()
    cy.reload()
})

Then('I should see the tasks data got retained', function () {
    cy.visit(Cypress.env('url'))
    this.ToDoJson.TC0009.tasks.forEach((task) => {
        Task.getAddedTask(task).should('exist')
    })
    Task.getAddedTask(this.ToDoJson.TC0009.tasks[3]).should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')
})

When('I deleted a task and revisited the page', function () {
    Task.getDeleteTask(this.ToDoJson.TC0009.tasks[1]).click()
    cy.visit(Cypress.env('url'))
})

Then('I should see the tasks list retained as per last action regardless of page revisit', function () {
    Task.getDeleteTask(this.ToDoJson.TC0009.tasks[1]).should('not.exist')
    cy.screenshot({ capture: 'runner', overwrite: true })
})

//Reopen Task
//Verify user can able to reopen a completed task
When('I added a task and marked the task as completed and again clicked the task', function () {
    Task.getToDoListForm().should('be.visible')
    Task.getToDoListFormTitle().should('have.text', this.ToDoJson.TC0010.title)
    Task.getTaskInput().type(this.ToDoJson.TC0010.taskValue)
    Task.getTaskAddButton().click()
    Task.getAddedTask(this.ToDoJson.TC0010.taskValue).click()
    Task.getAddedTask(this.ToDoJson.TC0010.taskValue).should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')
    Task.getAddedTask(this.ToDoJson.TC0010.taskValue).click()
})

Then('I should see the task got reopened', function () {
    Task.getAddedTask(this.ToDoJson.TC0010.taskValue).should('not.have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')
    cy.screenshot({ capture: 'runner', overwrite: true })
})