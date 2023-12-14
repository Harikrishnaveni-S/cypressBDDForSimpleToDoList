Feature: To-Do-List

    Testing To-DO-List Functionalities

    Scenario: Add Task - Success
        Given I open the to-do-list web app url
        When I provided the value in the task input and clicked the add button
        Then I should see the added task gets listed under the input field

    Scenario: Add Task - alert
        Given I open the to-do-list web app url
        When I leave task input field as empty and clicked the add button
        Then I should see a popup with an alert message

    Scenario: Add Task - empty
        Given I open the to-do-list web app url
        When I provided the value in the task input and clicked the add button and repeated the steps to add multiple tasks
        Then I got the count of the tasks listed and tried to add an empty task and checked whether the list remains unchanged

    Scenario: Add Task - reset
        Given I open the to-do-list web app url
        When I added a task
        Then I should see the task input field got cleared automatically

    Scenario: Complete Task
        Given I open the to-do-list web app url
        When I added a task and clicked that listed task
        Then I should see the task marked as complete indicated with a strikethrough line

    Scenario: Delete Task - pending
        Given I open the to-do-list web app url
        When I added a task and clicked the delete icon right to the task listed
        Then I should see the task got removed from the list

    Scenario: Delete Task - completed
        Given I open the to-do-list web app url
        When I added a task and marked the task as completed
        Then I clicked the delete icon right to the task and should see the task got removed from the list

    Scenario: Data Persistence - reload
        Given I open the to-do-list web app url
        When I added the tasks and marked some task as completed and reloaded the page
        Then I should see the tasks list data retained
        When I deleted a task and reloaded the page
        Then I should see the tasks list retained as per last action regardless of page reload

    Scenario: Data Persistence - revisit
        Given I open the to-do-list web app url
        When I added the tasks and marked some task as completed and revisited the page
        Then I should see the tasks data got retained
        When I deleted a task and revisited the page
        Then I should see the tasks list retained as per last action regardless of page revisit

    Scenario: Reopen Task
        Given I open the to-do-list web app url
        When I added a task and marked the task as completed and again clicked the task
        Then I should see the task got reopened
