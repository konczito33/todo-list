//DOM VARIABLES
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const list = document.querySelector('.task-list')
const createTodoBtn = document.querySelector('.add-btn');
const checkBtn = document.querySelector('.task-check');
const deleteBtn = document.querySelector('.task-delete');
const darkmodeBtn = document.querySelector('.darkmode-btn');
const selection = document.querySelector('.select')

//EVENT LISTENERS
createTodoBtn.addEventListener('click', (e) => {
    e.preventDefault()
    createTask()
    input.value = ''
})

document.addEventListener('DOMContentLoaded', displayTaskFromLocalstorage)
document.addEventListener('DOMContentLoaded', displayDarkmodeFromLocalStorage)

list.addEventListener('click', deleteTask)

darkmodeBtn.addEventListener('click', () => {
    const html = document.querySelector('html')
    html.classList.toggle('dark')
    if (html.classList.contains('dark')) {
        darkmodeBtn.innerHTML = `<i class="far fa-sun"></i>`
    } else {
        darkmodeBtn.innerHTML = `<i class="far fa-moon"></i>`
    }
    saveDarkmodeToLocalStorage()
})

selection.addEventListener('change', filter)

//FUNCTIONS


function createTask() {
    const taskValue = input.value;
    if (taskValue == '') {
        return
    } else {
        //CREATE TASK ELEMENT
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        //CREATE SPAN
        const taskSpan = document.createElement('span')
        taskSpan.classList.add('task-content')
        taskSpan.textContent = taskValue;
        taskItem.appendChild(taskSpan);
        //SAVE TO LOCALSTORAGE
        saveTaskToLocalstorage(taskValue)
        //CREATE CHECK BUTTON
        const checkedBtn = document.createElement('button')
        checkedBtn.classList.add('task-check', 'button')
        checkedBtn.innerHTML = `<i class="fas fa-check"></i>`
        taskItem.appendChild(checkedBtn)
        //CREATE DELETE BUTTON
        const deletedBtn = document.createElement('button')
        deletedBtn.classList.add('task-delete', 'button')
        deletedBtn.innerHTML = `<i class="fas fa-times"></i>`
        taskItem.appendChild(deletedBtn)
        list.appendChild(taskItem);
    }
}

function deleteTask(e) {
    const target = e.target;
    const item = target.parentNode

    if (target.classList[0] === 'task-check') {
        target.parentNode.classList.toggle('checked')
    }
    if (target.classList[0] === 'task-delete') {
        item.classList.add('delete')
        deleteTaskFromLocalStorage(item)
        target.parentNode.addEventListener('transitionend', () => item.remove())
    }
}

function filter(e) {
    const options = document.querySelectorAll('.task-item')
    const value = e.target.value;
    options.forEach(option => {
        switch (value) {
            case 'all':
                option.style.display = 'flex'
                break;
            case 'completed':
                if (option.classList.contains('checked')) {
                    option.style.display = 'flex'
                } else {
                    option.style.display = 'none'
                }
                break;
            case 'uncompleted':
                if (!option.classList.contains('checked')) {
                    option.style.display = 'flex'
                } else {
                    option.style.display = 'none'
                }
        }
    })
}

function saveTaskToLocalstorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function displayTaskFromLocalstorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        //CREATE TASK ELEMENT
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        //CREATE SPAN
        const taskSpan = document.createElement('span')
        taskSpan.classList.add('task-content')
        taskSpan.textContent = task;
        taskItem.appendChild(taskSpan);
        //CREATE CHECK BUTTON
        const checkedBtn = document.createElement('button')
        checkedBtn.classList.add('task-check', 'button')
        checkedBtn.innerHTML = `<i class="fas fa-check"></i>`
        taskItem.appendChild(checkedBtn)
        //CREATE DELETE BUTTON
        const deletedBtn = document.createElement('button')
        deletedBtn.classList.add('task-delete', 'button')
        deletedBtn.innerHTML = `<i class="fas fa-times"></i>`
        taskItem.appendChild(deletedBtn)
        list.appendChild(taskItem);
    })

}

function deleteTaskFromLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    const taskInnerText = task.children[0].innerText
    tasks.splice(tasks.indexOf(taskInnerText), 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function saveDarkmodeToLocalStorage() {
    let darkmode;
    const html = document.querySelector('html')
    if (html.classList.contains('dark')) {
        darkmode = 'true'
    } else {
        darkmode = 'false'
    }
    localStorage.setItem('darkmode', JSON.stringify(darkmode))
}

function displayDarkmodeFromLocalStorage() {
    const html = document.querySelector('html')
    console.log(localStorage.getItem('darkmode'))
    if (JSON.parse(localStorage.getItem('darkmode')) === "true") {
        html.classList.add('dark')
    }
    if (JSON.parse(localStorage.getItem('darkmode')) === "false") {
        html.classList.remove('dark')
    }
}