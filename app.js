//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");



//event listners
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//functions
function addTodo(event) {
    //prevent form from submitting;stop refreshing the page
    event.preventDefault();
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    saveLocalTodos(todoInput.value);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas  "></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //vlear todo input value
    todoInput.value = "";

}

function deleteCheck(e) {
    const item = e.target;
    //delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;


        //animation
        todo.classList.add("fall");
        removeLoocalTodos(todo);
        todo.addEventListener('transitioned', function () {
            todo.remove();
        });
    }
    //check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none"
                }
                break;
        }
    });
}
function saveLocalTodos(todo) {
    //check..do i already have thing in there?
let todos;
if (localStorage.getItem("todos") === null) {
    todos = [];
}else{
    todos =JSON.parse(localStorage.getItem("todos"));
}
todos.push(todo);
localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos() {
     //check..hey do i already have thing in there?
let todos;
if (localStorage.getItem("todos") === null) {
    todos = [];
}else{
    todos =JSON.parse(localStorage.getItem("todos"));
}
todos.forEach(function (todo) {
    
//Todo Div
const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");
//create LI
const newTodo = document.createElement('li');
newTodo.innerText = todo;
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);

//check mark button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);
//check trash button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class="fas   fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);
//Append to list
todoList.appendChild(todoDiv);
});
}

function removeLoocalTodos(todo) {
     //check..hey do i already have thing in there?
let todos;
if (localStorage.getItem("todos") === null) {
    todos = [];
}else{
    todos =JSON.parse(localStorage.getItem("todos"));
}
 console.log(todo.children[0].innerText);
 console.log(todos.indexOf())

 const todoIndex =todo.children[0].innerText;
 todos.splice(todos.indexOf(todoIndex),1);
 localStorage.setItem('todos',JSON.stringify(todos));
}
