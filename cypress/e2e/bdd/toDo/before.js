
beforeEach(() => {

    cy.fixture('task.json').then(function (ToDoJson) {
        this.ToDoJson = ToDoJson
    })
})
