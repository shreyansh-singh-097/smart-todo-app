const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (
            filter === "completed" && !task.completed ||
            filter === "pending" && task.completed
        ) return;

        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks(filter);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks(filter);
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text === "") return;

    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        button.classList.add("active");
        renderTasks(button.dataset.filter);
    });
});

renderTasks();