import "./style.css";
import Project from "./Modules/project.js";
import Todo from "./Modules/todo.js";
import { saveProjects, loadProjects } from "./Modules/storage.js";
import { renderProjects, renderTodos } from "./Modules/ui.js";

const projectListContainer = document.getElementById("project-list");
const todosContainer = document.getElementById("todo-list");
const addProjectBtn = document.getElementById("add-project-btn");
const newProjectInput = document.getElementById("new-project-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoTitle = document.getElementById("todo-title");
const todoDesc = document.getElementById("todo-desc");
const todoDate = document.getElementById("todo-date");
const todoPriority = document.getElementById("todo-priority");
const activeProjectName = document.getElementById("active-project-name");

let projects = loadProjects();
if (projects.length === 0) {
  projects = [new Project("Default Project")];
  saveProjects(projects);
}

let activeProject = projects[0];

function refreshUI() {
  activeProjectName.textContent = activeProject.name;
  renderProjects(projects, projectListContainer, activeProject.id, selectProject, deleteProject);
  renderTodos(activeProject.todos, todosContainer, toggleTodo, deleteTodo, editTodo);
  saveProjects(projects);
}

function selectProject(id) {
  activeProject = projects.find(p => p.id === id);
  refreshUI();
}

function deleteProject(id) {
  projects = projects.filter(p => p.id !== id);
  if (projects.length === 0) {
    projects.push(new Project("Default Project"));
  }
  activeProject = projects[0];
  refreshUI();
}

addProjectBtn.addEventListener("click", () => {
  const name = newProjectInput.value.trim();
  if (!name) return;
  const project = new Project(name);
  projects.push(project);
  activeProject = project;
  newProjectInput.value = "";
  refreshUI();
});

addTodoBtn.addEventListener("click", () => {
  const title = todoTitle.value.trim();
  if (!title) return;
  const todo = new Todo({
    title,
    description: todoDesc.value,
    dueDate: todoDate.value,
    priority: todoPriority.value,
  });
  activeProject.addTodo(todo);
  todoTitle.value = todoDesc.value = "";
  todoDate.value = "";
  todoPriority.value = "low";
  refreshUI();
});

function toggleTodo(id) {
  const todo = activeProject.todos.find(t => t.id === id);
  todo.toggleComplete();
  refreshUI();
}

function deleteTodo(id) {
  activeProject.removeTodo(id);
  refreshUI();
}

function editTodo(id) {
  const todo = activeProject.getTodoById(id);
  todoTitle.value = todo.title;
  todoDesc.value = todo.description;
  todoDate.value = todo.dueDate;
  todoPriority.value = todo.priority;

  deleteTodo(id); // remove old, re-add on save
}

refreshUI();
