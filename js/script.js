{
    let tasks = [];
    let hideDoneTasks = false;

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
            { ...tasks[editIndex], done: !tasks[editIndex].done },
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

    const renderTasks = () => {
        let htmlTextString = "";
        for (const task of tasks) {
            htmlTextString += `
            <li class="taskList__item js-taskListItem ${hideDoneTasks && task.done ? "taskList__item--hidden" : ""}">
                <button class="taskList__button taskList__button--done js-done">
                    ${task.done ? "✔" : ""}
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
        if (tasks.some(({ done }) => done)) {
            hideDoneTasks = !hideDoneTasks;
        };
        render();
    };

    const doneAllTasks = () => {
        if (tasks.map(task => !task.done)) {
            tasks.forEach((task, index) => {
                tasks[index] = { ...task, done: true, };
            });
        };
        render();
    };

    const bindButtonsEvents = () => {
        const toggleDoneTasksButton = document.querySelector(".js-toggleDoneTasksButton");
        const markAllTasksDoneButton = document.querySelector(".js-markAllTasksDoneButton");

        toggleDoneTasksButton.addEventListener("click", toggleDoneTasks);
        markAllTasksDoneButton.addEventListener("click", doneAllTasks);
    };

    const toggleButtons = buttonContainer => {
        if (!tasks.length) { buttonContainer.classList.add("buttonContainer--hidden"); }
        else { buttonContainer.classList.remove("buttonContainer--hidden"); };
    };

    const renderButtons = buttonList => {
        buttonList.innerHTML = `
            <button class="button js-toggleDoneTasksButton">
               ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="button js-markAllTasksDoneButton" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>`;
    };

    const render = () => {
        const buttonContainer = document.querySelector(".js-buttonContainer");
        renderTasks();
        renderButtons(buttonContainer);
        bindTaskButtonEvents();
        toggleButtons(buttonContainer);
        bindButtonsEvents();
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