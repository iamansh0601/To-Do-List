// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Function

function addTodo(event){
    event.preventDefault();
    
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //  create Li
    todoText = todoInput.value;
    if(todoText.trim() !== ''){
        const newTodo = document.createElement("li");
        newTodo.innerText = todoText;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        saveLocalTodos (todoInput.value)
        //  Buttons
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class = "fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
    
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    
        // append to main todolist
        todoList.appendChild(todoDiv);
        todoInput.value = "";
    }
    
    
}

function deleteCheck(e){
    // console.log(e.target);
    const item = e.target;

    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        
        // animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
        
    }

    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
function filterTodo(e) {
    // console.log(todoList.childNodes)
    const todos = todoList.childNodes;


    todos.forEach(function(todo){
        // console.log(todo.classList)
        switch(e.target.value){
            case 'all':
                todo.style.display = "flex";
                break;

            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;

            case 'uncompleted':
                if(todo.classList.contains('completed')){
                    todo.style.display = "none";
                }
                else{
                    todo.style.display = "flex";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){

    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
    
        //  create Li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";
        
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoname  = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoname),1);
    localStorage.setItem('todos', JSON.stringify(todos));

}