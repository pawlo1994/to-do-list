{
    const tasks = [

    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const toggleTaskContentDone = (taskContent, taskIndex) => {
        if (tasks[taskIndex].done) {
            taskContent.classList.add("taskList__span--done");
        }
    };

    const toggleTaskButtonTextDone = (taskButtonText, taskIndex) => {
        if (tasks[taskIndex].done) {
            taskButtonText.classList.add("taskList__buttonSpan--done");
        }
    };

    const bindButtonEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindTaskEvents = () => {
        const taskContents = document.querySelectorAll(".js-taskContent");

        taskContents.forEach((taskContent, index) => {
            toggleTaskContentDone(taskContent, index);
        });

        const taskButtonTexts = document.querySelectorAll(".js-taskButtonText");

        taskButtonTexts.forEach((taskButtonText, index) => {
            toggleTaskButtonTextDone(taskButtonText, index);
        });
    };

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <li class="taskList__item">
                <button class="taskList__button taskList__button--done js-done">
                    <span class="taskList__buttonSpan js-taskButtonText">✔</span>
                </button>
                <span class="taskList__span js-taskContent">
                    ${task.content}
                </span>
                <button class="taskList__button taskList__button--remove js-remove">
                    🗑
                </button>            
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindButtonEvents();
        bindTaskEvents();
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