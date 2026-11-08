
// DOM - select *********************************************
let hiUser = document.querySelector("#hi-user");

let loginForm = document.querySelector("#auth-form");
let loginSection = document.querySelector("#login-section");
let logoutBtn = document.querySelector("#logout-button");

let emailInput = document.querySelector("#email");
let taskForm = document.querySelector("#task-form");
let taskTitleInput = document.querySelector("#task-title");
let taskPriorityInput = document.querySelector("#task-priority");
let taskError = document.querySelector("#task-error");

let taskList = document.querySelector("#task-list");
let activeCount = document.querySelector("#active-count");
let completedCount = document.querySelector("#completed-count");
let emptyMessage = document.querySelector("#empty-message");

let filterBtns = document.querySelectorAll(".filter-btn");
let docMain = document.querySelector("main");
let themeToggle = document.getElementById("theme-toggle");
let weatherInfo = document.querySelector("#weather-info");
let currentDatetime = document.querySelector("#current-datetime");

// check stored info
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let isDarkTheme = localStorage.getItem("theme") === "dark";

// login **************************************************************
function checkLoginStatus() {
    let storedUser = localStorage.getItem("user");
    if (storedUser) {
        hiUser.textContent = `Hi ${storedUser}!`;
        hiUser.classList.remove("hidden");
        logoutBtn.classList.remove("hidden");
        loginSection.classList.add("hidden");
        docMain.classList.remove("hidden");
    } else {
        hiUser.textContent = "";
        logoutBtn.classList.add("hidden"); 
        loginSection.classList.remove("hidden");
        docMain.classList.add("hidden");
        hiUser.classList.add("hidden");
        // if there is no user logged, logoutBtn stays hidden.
        
    }
}

loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // stops the page from reloading
    let emailValue = emailInput.value.trim();
    if (!emailValue) return;
    // extracts email part (before @) to use as name 
    let username = emailValue.split("@")[0]; 
    // Guarda no LocalStorage
    localStorage.setItem("user", username);
    //reads 
    checkLoginStatus();
    // Limpa o formulário
    loginForm.reset();
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    checkLoginStatus();
});

// login form submition

// tasks ********************************************************
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.textContent = ""; // clear the list before rendering

    let filteredTasks = tasks.filter((task) => {
        if (currentFilter === "active") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true; // default case - show all tasks
    });

    filteredTasks.forEach((task) => {
        let taskItem = document.createElement("li");
        taskItem.dataset.id = task.id;

        let titleSpan = document.createElement("span");
        titleSpan.className = "task-title";
        titleSpan.textContent = task.title;

        if (task.completed) {
            titleSpan.classList.add("completed");
        }

        let prioritySpan = document.createElement("span");
        prioritySpan.className = "task-priority";
        prioritySpan.textContent = task.priority;

        let completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.textContent = task.completed ? "Undo" : "Complete";

        let editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "Edit";

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        taskItem.append(
            titleSpan,
            prioritySpan,
            completeBtn,
            editBtn,
            deleteBtn
        );

        taskList.appendChild(taskItem);
    }); // fim - forEach()

    let activeTasks = tasks.filter(task => !task.completed).length;
    let completedTasks = tasks.filter(task => task.completed).length;

    activeCount.textContent = activeTasks;
    completedCount.textContent = completedTasks;

    emptyMessage.classList.toggle("hidden", filteredTasks.length > 0);
} // fim - renderTasks()


taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = taskTitleInput.value.trim();
    let priority = taskPriorityInput.value;

    if (!title) {
        taskError.textContent = "Please write a title.";
        taskError.classList.remove("hidden");
        return;
    }

    tasks.push({
        id: Date.now(),
        title: title,
        priority: priority,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskTitleInput.value = "";
    taskError.classList.add("hidden");
}); // fim - EL taskForm

taskList.addEventListener("click", (event) => {
    let btn = event.target.closest("button");

    if (!btn) return;

    let li = btn.closest("li");
    let taskId = Number(li.dataset.id);
    let task = tasks.find(task => task.id === taskId);

    if (!task) return;

    if (btn.classList.contains("complete-btn")) {
        task.completed = !task.completed;
    }

    if (btn.classList.contains("delete-btn")) {
        tasks = tasks.filter(task => task.id !== taskId);
    }

    if (btn.classList.contains("edit-btn")) {
        let newTitle = prompt("Edit task title:", task.title);

        if (newTitle && newTitle.trim()) {
            task.title = newTitle.trim();
        }
    }

    saveTasks();
    renderTasks();
}); // fim - EL taskList click


filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(filterButton => filterButton.classList.remove("active"));
        btn.classList.add("active");

        currentFilter = btn.dataset.filter;
        renderTasks();
    }); // fim - EL filterBtns click
}); // fim - forEach filterBtns

// Change theme *************************************************

function applyTheme() {
    if (isDarkTheme) {
        document.body.classList.add("dark");
        themeToggle.textContent = "☀️";
    } else {
        document.body.classList.remove("dark");
        themeToggle.textContent = "🌙";
    }

    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
}

themeToggle.addEventListener(
    "click", () => {
        isDarkTheme = !isDarkTheme;
        applyTheme();
    }
)

// Date and Time *************************************************
function updateDateTime() {
    let now = new Date();
    currentDatetime.textContent = now.toLocaleString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// API - Weather *************************************************
async function getWeather() {
    try {
        let response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=38.7169&longitude=-9.139&current=temperature_2m,wind_speed_10m"
        );

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }

        let data = await response.json();

        let temperature = data.current.temperature_2m;
        let windSpeed = data.current.wind_speed_10m;

        weatherInfo.textContent = `Temperature: ${temperature}°C | Wind speed: ${windSpeed} km/h`;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherInfo.textContent = "Unable to fetch weather data.";
    }
}

// Functions to be called when the page loads
checkLoginStatus();
renderTasks();
applyTheme();
updateDateTime();
getWeather();

setInterval(updateDateTime, 1000);