const todoButton = document.getElementById('todo-button');
const notesButton = document.getElementById('notes-button');
const todoPage = document.getElementById('todo-page');
const notesPage = document.getElementById('notes-page');
const todoList = document.getElementById('todo-list');
const notesContent = document.getElementById('notes-content');
const addButton = document.getElementById('add-button');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
notesContent.value = localStorage.getItem('notes') || '';

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}">
            <span>${todo.text}</span>
        `;
        todoList.appendChild(li);
    });
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function saveNotes() {
    localStorage.setItem('notes', notesContent.value);
}

renderTodos();

todoButton.addEventListener('click', () => {
    todoPage.classList.add('active');
    notesPage.classList.remove('active');
    todoButton.classList.add('active');
    notesButton.classList.remove('active');
});

notesButton.addEventListener('click', () => {
    notesPage.classList.add('active');
    todoPage.classList.remove('active');
    notesButton.classList.add('active');
    todoButton.classList.remove('active');
});

addButton.addEventListener('click', () => {
    if (todoPage.classList.contains('active')) {
        const text = prompt('Enter new to-do:');
        if (text) {
            todos.push({ text: text, completed: false });
            renderTodos();
            saveTodos();
        }
    } else if (notesPage.classList.contains('active')){
        const currentNotes = notesContent.value;
        const text = prompt('Enter new note text to append:');
        if(text){
            notesContent.value = currentNotes + '\n' + text;
            saveNotes();
        }
    }
});

todoList.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
        const index = event.target.dataset.index;
        todos[index].completed = event.target.checked;
        saveTodos();
    }
});

notesContent.addEventListener('input', saveNotes);
