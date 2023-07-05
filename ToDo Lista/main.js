let todoInput, errorInfo, addBtn, ulList, newTodo, popup, popupInfo, todoToEdit, popupInput, popupAddBtn, popupCloseBtn

const main = () => {
    prepareDOMElements()
    PrepareDOMEvents()
}
const prepareDOMElements = () => {
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
}
const PrepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewTodo)
    ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKeyCheck)
}

const addNewTodo = () => {
    if (todoInput.value !== '') {
        newTodo = document.createElement('li')
        newTodo.textContent = todoInput.value
        createToolsArea()
        ulList.append(newTodo)


        todoInput.value = ""
        errorInfo.textContent = ""
    } else {
        errorInfo.textContent = "Wpisz treść zadania!"
    }
}

const createToolsArea = () => {
    const divTask = document.createElement('div')
    divTask.classList.add('tools')
    newTodo.append(divTask)

    const btnCreate = document.createElement('button')
    btnCreate.classList.add('complete')
    btnCreate.innerHTML = '<i class="fas fa-check"></i>'

    btnEdit = document.createElement('button')
    btnEdit.classList.add('edit')
    btnEdit.textContent = "EDIT"

    btnDelete = document.createElement('button')
    btnDelete.classList.add('delete')
    btnDelete.innerHTML = '<i class="fas fa-times"></i>'

    divTask.append(btnCreate, btnEdit, btnDelete)
}


const checkClick = e => {
    if (e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    } else if (e.target.matches('.edit')) {
        editTodo(e)

    } else if (e.target.matches('.delete')) {
        deleteTodo(e)

    }
}


const editTodo = (e) => {
    todoToEdit = e.target.closest('li')
    popupInput.value = todoToEdit.firstChild.textContent

    popup.style.display = 'flex'
}

const closePopup = () => {
    popup.style.display = 'none'
    popupInfo.textContent = ''
}

const changeTodoText = () => {
    if (popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value
        popup.style.display = 'none'
        popupInfo.textContent = ''
    } else {
        popupInfo.textContent = "Wpisz zadanie!"
    }
}

const deleteTodo = e => {
    e.target.closest('li').remove()

    const allTodos = ulList.querySelectorAll('li')

    if (allTodos.length === 0) {
        errorInfo.textContent = "Brak zadań na liście"
    }
}

const enterKeyCheck = (e) => {
    if (e.key === 'Enter') {
        addNewTodo()
    }
}



document.addEventListener('DOMContentLoaded', main)