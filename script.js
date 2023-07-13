const textInput = document.getElementById('textInput');
const todoButton = document.getElementById('todoButton');
const todoList = document.getElementById('todoList');
let tasks = [];

todoButton.addEventListener('click', addTodo);

function addTodo() {
  const todoText = textInput.value.trim();
  if (todoText !== '') {
    const todoItem = createTodoItem(todoText);
    tasks.push(todoText);
    saveTask(tasks);
    textInput.value = '';
  }
}

function createTodoItem(todoText) {
  const todoItem = document.createElement('li');
  todoItem.textContent = todoText;
  todoList.appendChild(todoItem);
  todoItem.addEventListener('click', completeTodo);

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '❌';
  removeBtn.classList.add('rmBtn');
  removeBtn.addEventListener('click', removeTodo);
  todoItem.appendChild(removeBtn);
  return todoItem;
}

function completeTodo(event) {
  const todoItem = event.target.closest('li');
  todoItem.classList.toggle('completed');
}

function removeTodo(event) {
  const todoItem = event.target.closest('li');
  todoItem.parentNode.removeChild(todoItem);
}

function saveTask(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTask() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    for (let i = 0; i < tasks.length; i++) {
      const todoItem = createTodoItem(tasks[i]);
      todoList.appendChild(todoItem);
    }
  }
}

window.addEventListener('load', loadTask);
