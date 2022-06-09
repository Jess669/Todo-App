//MODEL
let todo = [];
let edit = false;
let addBtn = document.querySelector('#add-btn');
let editBtn = document.querySelector('#edit-btn');

function addTodo(e) {
    let todoInput = document.querySelector('#todo-input');
    let todoDateValue = document.querySelector('#todo-date').value;
    let todoId = new Date().valueOf();
    let todoInputValue = todoInput.value;
    edit = false;

    if(todoInputValue !== '' && todoDateValue !== '') {
        let todoObj = { todo : todoInputValue, todoDate : todoDateValue, id : todoId };
        todo.push(todoObj);
        clearInput(todoInput);
        render();
        todoInput.focus();
        saveTodo();
    }
}

function clearInput(input) {
    input.value = '';
}

function deleteTodo(e) {
    let targetId = e.target.id;
    todo = todo.filter( index => {
        if (index.id == targetId) {
            return false;
        }else {
            return true;
        }
    });
    edit = false;
    render();
    saveTodo();
}

function updateTodo(e) {
    let todoInput = document.querySelector('#todo-input');
    let todoDate = document.querySelector('#todo-date');
    let editBtnImg = editBtn.querySelector('[data-id]');
    let todoId = e.target.id;
    edit = true;

    render();
    todo.forEach( index => {
        if (index.id == todoId) {
            todoInput.value = index.todo;
            todoDate.value = index.todoDate;
        }
    });

    editBtnImg.setAttribute('data-id', todoId);
    editBtn.setAttribute('data-id', todoId);
    todoInput.setAttribute('data-id', todoId);
    todoDate.setAttribute('data-id',todoId);
    todoInput.focus();

}

function insertEditTodo(e) {
    let todoId = e.target.attributes[3].value;
    let todoInput = document.querySelector('#todo-input');
    let todoValue = document.querySelector('#todo-input').value;
    let dateValue = document.querySelector('#todo-date').value;

    if (todoValue != '' && dateValue != '') {

        todo.forEach( index => {
            if (index.id == todoId) {
                index.todo = todoValue;
                index.todoDate = dateValue;
            }
        });
        edit = false;
        clearInput(todoInput);
        render();
        saveTodo();
    }else {
        alert('PLEASE FILL UP TODO PROPERLY!');
        edit = false;
        render();
    }
}

function fillTodo() {
    if (localStorage.getItem('todo')) {
        todo = JSON.parse(localStorage.getItem('todo'));
    }

}

function saveTodo() {
    localStorage.setItem('todo', JSON.stringify(todo));
}












// CONTROLLER
document.querySelector("#edit-btn").addEventListener("click", insertEditTodo);
document.querySelector(".todo-btn").addEventListener("click", addTodo);
document.querySelector("#todo-input").addEventListener("keyup", function(e){ if (e.keyCode === 13 && edit == false) { addTodo() }else if(e.keyCode === 13 && edit == true) { insertEditTodo(e)  } });
document.querySelector("#todo-date").addEventListener("keyup", function(e){ if (e.keyCode === 13 && edit == false) { addTodo() }else if(e.keyCode === 13 && edit == true) { insertEditTodo(e)  } });

fillTodo();
render();











// VIEW
function render() {
    let todoList = document.querySelector('.todo-list');
    todoList.innerHTML = '';

    if (edit) {
        addBtn.classList.add('hide');
        editBtn.classList.remove('hide');
    }else {
        editBtn.classList.add('hide');
        addBtn.classList.remove('hide');
    }

    if (todo !== '' && todo !== undefined) {
        let ul = document.createElement('ul');
        ul.style.paddingTop = '10px';
        todo.forEach(index => {
            let li = document.createElement('li');
            let div1 = document.createElement('div');
            let div2 = document.createElement('div');
            let deleteBtn = document.createElement('button');
            let deleteImg = document.createElement('img');
            let updateBtn = document.createElement('button');
            let updateImg = document.createElement('img');

            deleteBtn.setAttribute('class', 'delete-btn');
            deleteBtn.setAttribute('id', index.id);
            deleteBtn.onclick = deleteTodo;
            deleteImg.setAttribute('src', 'icon/trash-icon.png');
            deleteImg.setAttribute('id', index.id);
            deleteBtn.appendChild(deleteImg);

            updateBtn.setAttribute('class', 'update-btn');
            updateBtn.setAttribute('id', index.id);
            updateBtn.onclick = updateTodo;
            updateImg.setAttribute('src', 'icon/edit-icon.png');
            updateImg.setAttribute('id', index.id);
            updateBtn.appendChild(updateImg);

            li.style.cssText = 'list-style: none; background-color: rgb(231, 231, 231); padding: 10px 15px; margin-bottom: 5px; text-transform: capitalize; display: flex; justify-content: space-between;align-items: center;';
            div1.innerHTML = index.todo;
            div2.append(index.todoDate,deleteBtn,updateBtn);
            li.append(div1,div2);
            ul.appendChild(li);
        });
        todoList.appendChild(ul);
    }
}