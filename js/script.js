{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
            },
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

    const bindRemoveEvents = () => {
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
            <li class="taskList__item js-taskListItem ${hideDoneTasks && task.done ? "js-taskListItemDone taskList__item--hidden" : ""} ${task.done ? "js-taskListItemDone" : ""}">
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
        if (!hideDoneTasks) {
            hideDoneTasks = true;
        } else { hideDoneTasks = false };
        render();
    };

    const doneAllTasks = () => {
        if (tasks.find(task => !task.done)) {
            tasks.forEach((task, index) => {
                const doneTask = { ...task, done: true, };
                tasks[index] = doneTask;
            });
        };
        render();
    };

    const bindButtonsEvents = () => {
        const toggleDoneTasksButton = document.querySelector(".js-toggleDoneTasksButton");
        const doneAllTasksButton = document.querySelector(".js-doneAllTasksButton");

        toggleDoneTasksButton.addEventListener("click", toggleDoneTasks);
        doneAllTasksButton.addEventListener("click", doneAllTasks);
    };

    const bindToggleDoneEvents = buttonList => {
        if (!tasks.length) { buttonList.classList.add("buttonList--hidden"); }
        else { buttonList.classList.remove("buttonList--hidden"); };
    };

    const renderButtons = buttonList => {
        buttonList.innerHTML = `
        <li class="buttonList__item">
            <button class="buttonList__button js-toggleDoneTasksButton">
               ${!hideDoneTasks ? "Ukryj" : "Pokaż"} ukończone
            </button>
        </li>
        <li class="buttonList__item">
            <button class="buttonList__button js-doneAllTasksButton" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>
        </li>`;
    };

    const render = () => {
        const buttonList = document.querySelector(".js-buttonList");
        renderTasks();
        renderButtons(buttonList);
        bindRemoveEvents();
        bindToggleDoneEvents(buttonList);
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