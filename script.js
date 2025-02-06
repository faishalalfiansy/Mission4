const input = document.getElementById("task");
const priority = document.getElementById("priority");
const date = document.getElementById("date");
const addBtn = document.getElementById("add");
const deleteAll = document.getElementById("delete-all");
const boxTask1 = document.getElementById("box-task1");
const boxTask2 = document.getElementById("box-task2");
const isiBody = document.getElementById("isi-body");

addBtn.addEventListener("click", addTask);
deleteAll.addEventListener("click", function(){
    const hapus = document.querySelectorAll(".card");
    for(let i = 0; i < hapus.length; i++){
        hapus[i].remove();
    }
    localStorage.clear();
});
let angka = 0;

function addTask(){
    const taskText = input.value.trim();
    const prior = priority.value;
    const dateNilai = date.value;
    if(taskText === "" || dateNilai === ""){
        alert("Semua field harus diisi");
        return;
    }else{
        const newTasklis = {
            task: taskText,
            priority: prior,
            date: dateNilai,
            done :false,
            id:angka
        }
        angka++;
        tampilanTask(newTasklis);
        saveLocal(newTasklis);
        input.value = "";
        date.value   = "";
        priority.value = "high";
    } 
}

function tampilanTask(newTasklis){
    const  task2 = newTasklis.task;
    const  prio2 = newTasklis.priority;
    const  date2 = newTasklis.date;
    const newTask = document.createElement("div");
    newTask.classList.add("card");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.classList.add("check");
    check.checked = newTasklis.done;

    check.addEventListener("change", function(newTasklis){
        const newTasklis2 = {
            task: task2,
            priority: prio2,
            date: date2,
            done :true
        }
        if(check.checked){
            boxTask2.appendChild(newTask);
            task.style.textDecoration = "line-through";
            saveLocal2(newTasklis2);
            deleteBtn.addEventListener("click", function(newTasklis){
                newTask.remove();
                removeLocalTodos(newTasklis.id);
            })
        }else{
            const newTasklis2 = {
                task: newTasklis.task,
                priority: newTasklis.priority,
                date: newTasklis.date,
                done :false
            }
            boxTask1.appendChild(newTask);
            task.style.textDecoration = "none";
        }
    });

    const divIsi = document.createElement("div");
    divIsi.classList.add("isi");

    const task = document.createElement("p");
    task.classList.add("task");
    task.textContent = newTasklis.task;
    const prio = document.createElement("p");
    prio.classList.add("prio");
    prio.textContent = "(" + newTasklis.priority + ")";
    const dibuat = document.createElement("p");
    dibuat.classList.add("dibuat");
    dibuat.textContent = newTasklis.date;
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function(newTasklis){
        newTask.remove();
        if(boxTask1.contains(newTask)){
            removeLocalTodos(newTasklis.id);
        }
        // removeLocalTodos(newTasklis.id);
    });

    newTask.appendChild(divIsi);
    newTask.appendChild(check);
    divIsi.appendChild(task);
    divIsi.appendChild(prio);
    divIsi.appendChild(dibuat);
    divIsi.appendChild(deleteBtn);
    newTask.appendChild(divIsi);
    boxTask1.appendChild(newTask);
    
}

function saveLocal(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function saveLocal2(todo) {
    let todos;
    if(localStorage.getItem("todos2") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos2"));
    }
    todos.push(todo);
    localStorage.setItem("todos2", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const index = todos.findIndex(todos => todos.id === todo);
    if(index !== todos.length - 1) {
        todos.splice(todos.id, 1);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}

// function removeLocalTodos2(todo) {
//     let todos;
//     if(localStorage.getItem("todos2") === null) {
//         todos = [];
//     } else {
//         todos = JSON.parse(localStorage.getItem("todos2"));
//     }
//     const todoIndex = todo.task[0];
//     todos.splice(todos.indexOf(todoIndex), 1);
//     localStorage.setItem("todos2", JSON.stringify(todos));
// }

function getLocal() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        tampilanTask(todo);
    });
}

document.addEventListener("DOMContentLoaded", getLocal);
