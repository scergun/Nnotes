const textInputDOM = document.getElementById("todo-input");
const btnAddTodoDOM = document.getElementById("add-todo");
const clearTodosDOM = document.getElementById("clear-todos");
const deleteTodoDOM = document.getElementById("delete-todo");
const todosDOM = document.getElementById("todos");

class Storage {
    static addTodoStorage(todoArr) {
        let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
        return storage;
    };

    static getStorage() {
        let storage = localStorage.getItem("todo") === null ? [] : JSON.parse(localStorage.getItem("todo"));
        return storage;
    }
}

let todoArr = Storage.getStorage();

btnAddTodoDOM.addEventListener("click", function (e) {
    e.preventDefault();
    let id = todoArr.length + 1;
    let title = textInputDOM.value;
    const todo = new Todo(id, title);
    todoArr.unshift(todo);
    UI.clearInput();
    UI.displayTodos();
    Storage.addTodoStorage(todoArr);
});


class Todo {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
}

class UI {

    static displayTodos() {
        let result = "";
        if (todoArr.length === 0) {
            todosDOM.innerHTML = "Blank Note";
        } else {
            todoArr.forEach((item) => {
                result += ` 
            <li style="display:flex;justify-content:space-between;border:2px solid #28293D;padding:16px 12px;align-items:center;border-radius: 6px; margin:6px 0px;" class="li">
            <span>${item.title}</span>
            <button style="border-radius: 0px 7px 7px 0px;border: none;color: #EBEAEF;font-size: 12px;padding: 20px 21px;background-color:#28293D;cursor:pointer;" class="remove" id="delete-todo" data-id="${item.id}">Delete</button>
        </li>
            `;
            });
            todosDOM.innerHTML = result;
        }
    };

    static clearInput() {
        textInputDOM.value = "";
    };

    static removeTodo() {
        todosDOM.addEventListener("click", function (e) {
            if (e.target.classList.contains("remove")) {
                e.target.parentElement.remove();
                let btnId = e.target.dataset.id;
                UI.removeArrayTodo(btnId);
            }

        })
    };

    static removeArrayTodo(id) {
        todoArr = todoArr.filter((item) => item.id !== +id);
        Storage.addTodoStorage(todoArr);
        UI.displayTodos();

    };

    static clearTodos() {
        clearTodosDOM.addEventListener("click", function () {
            todoArr = [];
            Storage.addTodoStorage(todoArr);
            UI.displayTodos();
        });
    };
};



window.addEventListener("DOMContentLoaded", function () {
    UI.removeTodo();
    UI.displayTodos();
    UI.clearTodos();
});



































/* const textInputDOM = document.getElementById("todo-input");
const btnaddTodoDOM = document.getElementById("add-todo");
const todosDOM = document.getElementById("todos");

let textInputValue = "";
let todos = [];

textInputDOM.addEventListener("change", function (event) {
    textInputValue = event.target.value;

});
btnaddTodoDOM.addEventListener("click", addTodo);

function addTodo(e) {
    e.preventDefault();
    todos.unshift({ id: todos.length + 1, todoTitle: textInputValue });
    textInputDOM.value = "";
    displayTodos();
}

function displayTodos() {
    let result = "";

    if (todos.length === 0) {
        todosDOM.innerHTML = "Liste Boş!";
    } else {
        todos.forEach((item) => {
            result += ` 
        <li style="display:flex;justify-content:space-between;border:2px solid #28293D;padding:16px 12px;align-items:center;border-radius: 6px;" class="li">
        <span>${item.todoTitle}</span>
        <button style="border-radius: 0px 7px 7px 0px;border: none;color: #EBEAEF;font-size: 12px;padding: 20px 21px;background-color:#28293D;cursor:pointer;" id="delete-todo" onclick="deleteTodo(${item.id})">Delete</button>
    </li>
        `;
        });
        todosDOM.innerHTML = result;
    }
};

function deleteTodo(id) {
    let deletedId;

    for (let index in todos) {
        if (todos[index].id == id) {
            deletedId = index;
        }
    }

    todos.splice(deletedId, 1);
    displayTodos();

}

function clearTodos() {
    todos.splice(0, todos.length);
    displayTodos();
}

displayTodos(); */