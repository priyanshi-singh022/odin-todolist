class Project {
    constructor(name) {
        this.id = Date.now().toString();
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    }

    getTodoById(id) {
        return this.todos.find(todo => todo.id === id);
    }
}

export default Project;   
