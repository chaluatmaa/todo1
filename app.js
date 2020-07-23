const todoinput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filteroption = document.querySelector('.filter-todo');
const clearls = document.querySelector('.clear-btn');
//===========================================================================================================
//===========================================================================================================
// EVENT LISTENERS
//===========================================================================================================
//===========================================================================================================

document.addEventListener('DOMContentLoaded' , gettodos);
todobutton.addEventListener('click',addTodo);
todolist.addEventListener('click',deleteCheck);
filteroption.addEventListener('click',filtertodo);
clearls.addEventListener('click',clearlocalstorage);
//===========================================================================================================
//===========================================================================================================
// FUNCTIONS
//===========================================================================================================
//===========================================================================================================

//===========================================================================================================
// Add in the list
//
function addTodo(e)
{
    e.preventDefault();

    const tododiv = document.createElement('div');
    tododiv.classList.add('todo');

    // create li

    const newtodo = document.createElement('li');
    newtodo.innerText = todoinput.value;
    newtodo.classList.add('todo-item');
    tododiv.appendChild(newtodo);

    //saving the todo in local storage
    savelocaltodo(todoinput.value);
    // create checkmark button

    const completebtn = document.createElement('button');
    completebtn.innerHTML = `<i class="fas fa-check"</i>`;
    completebtn.classList.add('complete-btn');
    tododiv.appendChild(completebtn);

    // create delete button

    const deletebtn = document.createElement('button');
    deletebtn.innerHTML = `<i class="fas fa-trash"</i>`;
    deletebtn.classList.add('delete-btn');
    tododiv.appendChild(deletebtn);

    // append to the unordered list

    todolist.appendChild(tododiv);

    // Clear the input
    todoinput.value=``;
}

//===========================================================================================================
// Delete List
//===========================================================================================================
function deleteCheck(e)
{
    const item = e.target;
    if(item.classList[0] === "delete-btn")
    {
        const rem = item.parentElement;
        rem.classList.add('fall');
        // removelocaltodo();
        rem.addEventListener('transitionend',function(){
        rem.remove();
    });
    }

// check mark

    if(item.classList[0]==="complete-btn")
    {
        const check = item.parentElement;
        check.classList.toggle('completed');
    }
}


//===========================================================================================================
// Filter List
//===========================================================================================================


function filtertodo(e)
{
    const todos = todolist.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value)
        {
            case "all": 
            todo.style.display = 'flex';
            break;

            case "complete" : 
            if(todo.classList.contains('completed'))
            {
                todo.style.display = 'flex';
            }
            else
            {
                todo.style.display = 'none';
            }
            break;
            
            case "incomplete" : 
            if(!todo.classList.contains('completed'))
            {
                todo.style.display = 'flex';
            }
            else
            {
                todo.style.display = 'none';
            }
            break;

            // default: 
        }
    });
}


//===========================================================================================================
// Store List
//===========================================================================================================

function savelocaltodo(todo)
{
    // check the previous presence
    let todos;  
    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}



//===========================================================================================================
// Get Stored List After REFRESH
//===========================================================================================================

function gettodos()
{
    //Check---Hey do i already have things in here?
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {
        
        const tododiv = document.createElement('div');
        tododiv.classList.add('todo');
    
        // create li
    
        const newtodo = document.createElement('li');
        newtodo.innerText = todo;
        newtodo.classList.add('todo-item');
        tododiv.appendChild(newtodo);
    
        
        // create checkmark button
    
        const completebtn = document.createElement('button');
        completebtn.innerHTML = `<i class="fas fa-check"</i>`;
        completebtn.classList.add('complete-btn');
        tododiv.appendChild(completebtn);
    
        // create delete button
    
        const deletebtn = document.createElement('button');
        deletebtn.innerHTML = `<i class="fas fa-trash"</i>`;
        deletebtn.classList.add('delete-btn');
        tododiv.appendChild(deletebtn);
    
        // append to the unordered list
    
        todolist.appendChild(tododiv);
    });
}


//===========================================================================================================
// Remove tasks from List after REFRESH
//===========================================================================================================

function clearlocalstorage() {
//     //Check---Hey do i already have things in here?
//     let todos;
//     if(localStorage.getItem("todos") === null) {
//         todos = [];
//     } else {
//         todos = JSON.parse(localStorage.getItem("todos"));
//     }
    
// const todoIndex = todo.children[0].innerText;
// todos.splice(todos.indexOf(todoIndex), 1);
// localStorage.setItem("todos", JSON.stringify(todos));

localStorage.clear();
}