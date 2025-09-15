import "./style.css";
import Project from "./Modules/project.js";
import Todo from "./Modules/todo.js";
import { saveProjects, loadProjects } from "./Modules/storage.js";
import { renderProjects, renderTodos } from "./Modules/ui.js";

const projectsContainer = document.getElementById("projects");
const todosContainer = document.getElementById("todos");

// Load saved projects or create default one
let projects = loadProjects();
if (projects.length === 0) {
  projects = [new Project("Default Project")];
  saveProjects(projects);
}

// Render default UI
renderProjects(projects, projectsContainer);
renderTodos(projects[0].todos, todosContainer);

// Example: add a todo manually
const exampleTodo = new Todo({
  title: "Learn Odin Todo",
  description: "Build the todo app",
  dueDate: "2025-09-20",
  priority: "high"
});
projects[0].addTodo(exampleTodo);

saveProjects(projects);
renderTodos(projects[0].todos, todosContainer);
