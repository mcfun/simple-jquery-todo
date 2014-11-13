/**
 *  Basic todo list with jQuery.
 *
 *  Author: Ian McCunn
 */

$(document).ready(function () {


    var taskInput = $('#new-task'); //new-task input
    var addButton = $('#new-task-button'); // new-task button
    var incompleteTasksHolder = $('#todo-items'); //incomplete-tasks
    var completedTasksHolder = $('#completed-tasks'); //completed-tasks


    /**
     * Creates DOM elements for single todo item (<li><input><label><input><button></li>)
     * @param  {string} taskString The text of the todo item.
     * @return {obj}            The li todo item.
     */
    var createNewTaskElement = function (taskString) {

        // Create DOM Elements for List Item
        var listItem = document.createElement('li');
        var checkBox = document.createElement('input');
        var label = document.createElement('label');
        var taskInput = document.createElement('input');
        var deleteButton = document.createElement('button');

        //Set elements' classes and attributes
        $(listItem).attr('class', 'item incomplete-task');
        $(checkBox).attr('type', 'checkbox');
        $(taskInput).attr('class', 'item-text-input');
        $(deleteButton).attr('class', 'g-task-button delete');
        $(deleteButton).html('X');

        // Set the input value to and label to taskString
        $(label).html(taskString);
        $(taskInput).attr('value', taskString);

        // Append all elements for one li todo
        $(listItem).append(checkBox);
        $(listItem).append(label);
        $(listItem).append(taskInput);
        $(listItem).append(deleteButton);

        return listItem;
    };


    /**
     * Appends the li to the DOM.
     */
    var addItem = function () {

        //Create a new list item with the text from #new-task:
        var listItem = createNewTaskElement($(taskInput).val());

        //Append listItem to incompleteTasksHolder
        $(incompleteTasksHolder).append(listItem);
        bindTaskEvents(listItem);
        $(taskInput).select();
    };


    /**
     * Delete todo item.
     * @return {none} 
     */
    var deleteItem = function () {
        console.log('Todo Removed.');
        $(this).parent().remove();
    };


    /**
     * Shows the label's 
     * @return {[type]} [description]
     */
    var editTask = function () {
        console.log("Edit todo...");

        var listItem = $(this).parent();
        var editInput = $(listItem).children(".item-text-input");
        var label = $(listItem).children("label");

        var containsClass = $(listItem).hasClass("editMode");

        // add editMode class to list item
        if (containsClass) {
            $(label).html($(editInput).val());
        } else {
            $(editInput).attr('value', $(label).html());
        }

        //Toggle .editMode on the list item
        $(listItem).toggleClass("editMode");
        $(editInput).select();
    };


    /**
     * Set todo item as complete.
     * @return {noone}
     */
    var todoCompleted = function () {
        var listItem = $(this).parent();
        $(completedTasksHolder).append(listItem);
        bindCheckboxEvent(listItem);
        console.log('Todo Item set as complete.');
    };


    /**
     * Set todo item as incomplete. Append to #todo-items.
     * @return {}
     */
    var todoIncomplete = function () {
        var listItem = $(this).parent();
        $(incompleteTasksHolder).append(listItem);
        bindCheckboxEvent(listItem);
        console.log("Todo Item set as incomplete.");
    };


    /**
     * Binds events to interactable DOM elements.
     * 
     * @param  {obj} taskListItem The entire todo container as a <li>
     * @return {none}
     */
    var bindTaskEvents = function (taskListItem) {
        console.log("Bind list item events");

        // select taskListItem's children
        var textInput = $(taskListItem).children("input.item-text-input");
        var deleteButton = $(taskListItem).children("button.delete");
        var label = $(taskListItem).children("label");

        // set click handler on label to edit task item
        $(label).on('click', editTask);
        $(textInput).on('blur', editTask);

        // bind deleteTask to delete button
        $(deleteButton).on('click', deleteItem);

        // remove previous function binding to the checkbox and add the other
        // (complete or incomplete)
        bindCheckboxEvent(taskListItem);
    };


    // Isolate binding of checkbox event because the callback will be different depending 
    // on what container it is in (completed or incompleted).
    // 
    var bindCheckboxEvent = function (taskListItem) {
        var box = $(taskListItem).children("input[type=checkbox]");
        if ($(box).prop('checked')) {
            $(box).unbind('change');
            $(box).on('change', todoIncomplete);
        } else {
            $(box).unbind('change');
            $(box).on('change', todoCompleted);
        }
    };


    // Sets the date in the todo list
    var setDateInList = function () {
        // add date
        var curDate = new Date();
        $('#date').html((curDate.getMonth() + 1) + '/' + curDate.getDate() + '/' + curDate.getFullYear());
    };

    //Set the click handler to the addTask function
    $(addButton).on('click', addItem);

    setDateInList();

    // Bind keyup 'Enter' to todo item Input
    $(taskInput).keypress("keyup", function (e) {
        if (e.keyCode === 13) {

            addItem();
            $(this).val('Enter a new task...');
            $(this).select();
        }
    });

    // Ready to go
    $(taskInput).focus();

});