import Project from "./project.js";   // ✅ fixed

function renderProjects(projects, container) {
    container.innerHTML = "";   // ✅ also fixed typo (was inerHTML)
    projects.forEach(project => {
        const div = document.createElement("div");
        div.textContent = project.name;
        container.appendChild(div);
    });
}

function renderTodos(todos, container) {
    container.innerHTML = "";
    todos.forEach(todo => {
        const div = document.createElement("div");
        div.textContent = `${todo.title} - ${todo.dueDate}`;
        container.appendChild(div);
    });
}

export { renderProjects, renderTodos };
