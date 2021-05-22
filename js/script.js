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

    const toggleAllTasksDone = () => {
        for (let task of tasks) {
            task = {
                ...task,
                done: true,
            };
        };
        render();
    };

    const bindTaskButtonEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, editIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(editIndex);
            });
        });
    };

    const bindTaskDoneButtonEvents = (editIndex, buttonList) => {
        if (!tasks.length) { buttonList.classList.add("buttonList--hidden"); }
        else { buttonList.classList.remove("buttonList--hidden"); };

        const doneAllTasksButton = document.querySelector(".js-doneAllTasksButton");

        doneAllTasksButton.addEventListener("click", () => {
            toggleAllTasksDone(editIndex);
            doneAllTasksButton.disabled = true;
        });
    }

    const renderTask = () => {
        let htmlTextString = "";
        for (const task of tasks) {
            htmlTextString += `
            <li class="taskList__item">
                <button class="taskList__button taskList__button--done js-done">
                    ${task.done ? "✔" : "&nbsp;"}
                </button>
                <span class="${task.done ? "taskList__span  taskList__span--done js-taskContent" : "taskList__span js-taskContent"}" >
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

    const renderTaskDoneButtons = (editIndex, buttonList) => {
        const htmlButtonString = `
        <li class="buttonList__item">
            <button class="buttonList__button js-toggleDoneTasksButton">
                Pokaż ukończone
            </button>
        </li>
        <li class="buttonList__item">
            <button class="buttonList__button js-doneAllTasksButton">
                Zakończ wszystkie
            </button>
        </li>`;
        buttonList.innerHTML = htmlButtonString;
        bindTaskDoneButtonEvents(editIndex, buttonList);
    };
    const render = (editIndex) => {
        const buttonList = document.querySelector(".js-buttonList");
        renderTask();
        renderTaskDoneButtons(editIndex, buttonList);
        bindTaskButtonEvents();
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