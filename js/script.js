{
    let tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    };

    const toggleTaskDone = (editIndex) => {
        tasks = [
            ...tasks.slice(0, editIndex),
            !tasks[editIndex].done ? { ...tasks[editIndex], done: true } : { ...tasks[editIndex], done: false },
            ...tasks.slice(editIndex + 1),
        ];
        render();
    };

    const bindTaskButtonEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const doneButtons = document.querySelectorAll(".js-done");

        doneButtons.forEach((doneButton, editIndex) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(editIndex);
            });
        });
    };

    const renderTaskContent = () => {
        let htmlTextString = "";
        for (const task of tasks) {
            htmlTextString += `
            <li class="taskList__item js-taskListItem ${task.done ? "js-taskListItemDone" : ""}">
                <button class="taskList__button taskList__button--done js-done">
                    ${task.done ? "✔" : "&nbsp;"}
                </button>
                <span class="taskList__span js-taskContent ${task.done ? "taskList__span--done" : ""}" >
                    ${task.content}
                </span>
                <button class="taskList__button taskList__button--remove js-remove">
                    🗑
                </button>            
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlTextString;
    };

    const toggleDoneTasks = () => {
        const taskListItemsDone = document.querySelectorAll(".js-taskListItemDone");
        const buttonListSpan = document.querySelector(".js-buttonListSpan");
        taskListItemsDone.forEach((taskListItemDone) => {
            taskListItemDone.classList.toggle("taskList__item--hidden");
            buttonListSpan.innerText = taskListItemDone.classList.contains("taskList__item--hidden") ? "Pokaż" : "Ukryj";
        });
    };

    const toggleDoneTasksButtons = buttonList => {
        if (!tasks.length) { buttonList.classList.add("buttonList--hidden"); }
        else { buttonList.classList.remove("buttonList--hidden"); };
    };

    const bindTaskDoneButtonEvents = buttonList => {
        toggleDoneTasksButtons(buttonList);

        const toggleDoneTasksButton = document.querySelector(".js-toggleDoneTasksButton");
        toggleDoneTasksButton.addEventListener("click", toggleDoneTasks);
    };

    const renderTaskDoneButtons = (buttonList) => {
        let htmlButtonString = "";
        htmlButtonString = `
        <li class="buttonList__item">
            <button class="buttonList__button js-toggleDoneTasksButton">
               <span class="js-buttonListSpan">Ukryj</span> ukończone
            </button>
        </li>
        <li class="buttonList__item">
            <button class="buttonList__button js-doneAllTasksButton" disabled="false">
                Ukończ wszystkie
            </button>
        </li>`;
        buttonList.innerHTML = htmlButtonString;
        bindTaskDoneButtonEvents(buttonList);
    };

    const render = () => {
        const buttonList = document.querySelector(".js-buttonList");
        renderTaskContent();
        renderTaskDoneButtons(buttonList);
        bindTaskButtonEvents();
        bindTaskDoneButtonEvents(buttonList);
    };

    const clearInput = (newTask) => {
        newTask.value = "";
        newTask.focus();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();
        clearInput(newTaskElement);
        if (newTaskContent) {
            addNewTask(newTaskContent);
        }
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };
    init();
}