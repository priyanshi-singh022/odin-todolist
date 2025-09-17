export function renderProjects(projects, container, activeProjectId, onSelect, onDelete) {
  container.innerHTML = "";
  projects.forEach(project => {
    const div = document.createElement("div");
    div.textContent = project.name;
    div.dataset.id = project.id;
    if (project.id === activeProjectId) div.classList.add("active");

    div.addEventListener("click", () => onSelect(project.id));

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.style.marginLeft = "10px";
    delBtn.addEventListener("click", e => {
      e.stopPropagation();
      onDelete(project.id);
    });

    div.appendChild(delBtn);
    container.appendChild(div);
  });
}

export function renderTodos(todos, container, onToggle, onDelete, onEdit) {
  container.innerHTML = "";
  todos.forEach(todo => {
    const div = document.createElement("div");
    div.classList.add("todo-item");

    if (todo.priority === "low") div.classList.add("priority-low");
    if (todo.priority === "medium") div.classList.add("priority-medium");
    if (todo.priority === "high") div.classList.add("priority-high");

    if (todo.completed) div.classList.add("completed");

    div.innerHTML = `
      <strong>${todo.title}</strong> (due: ${todo.dueDate}, priority: ${todo.priority})
      <br>${todo.description || ""}
    `;

    // Complete toggle
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = todo.completed ? "Undo" : "Complete";
    toggleBtn.addEventListener("click", () => onToggle(todo.id));

    // Edit
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => onEdit(todo.id));

    // Delete
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => onDelete(todo.id));

    div.append(toggleBtn, editBtn, delBtn);
    container.appendChild(div);
  });
}
