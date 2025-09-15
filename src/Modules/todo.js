class Todo {
    constructor(id, title, description, dueDate, priority, completed = false) {
        this.id = id || Date.now().toString();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }
}

toggleCompleted = function() {
    this.completed = !this.completed;
}

export default Todo;