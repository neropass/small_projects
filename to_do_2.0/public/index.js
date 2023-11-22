const todoValue = document.getElementById('todoText'),
  listItems = document.getElementById('list-items'),
  addUpdateClick = document.getElementById('AddUpdateClick'),
  AlertMessage = document.getElementById('AlertMessage');


let todoData = JSON.parse(localStorage.getItem('todoData'));
if (!todoData) {
  todoData = [];
}

// Add task on Enter press
todoValue.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addUpdateClick.click();
  }
});

// Reading data from local storage
ReadToDoItems();
function ReadToDoItems() {
  console.log(todoData);
  todoData.forEach((element) => {
    let li = document.createElement('li');
    let style = '';
    if (element.status) {
      style = 'style="text-decoration: line-through;"';
    }
    const todoItems = `<div ${style} ondblclick="CompleteTodoItem(this)">${element.item}</div><div> ${
      style === ''
        ? '<img class="edit todo-controls" src="images/pencil.svg" onclick="UpdateToDoItems(this)" />'
        : ''
    }<img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="images/trash.svg" /"></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
  });
}

// Adding tasks
function createToDoData() {
  // Validation
  if (todoValue.value === '') {
    SetAlertMessage('Please enter your ToDo text!');
    todoValue.focus();
    return;
  }

  // Created task in list items
  let li = document.createElement('li');
  const todoItems = `<div ondblclick="CompleteTodoItem(this)">${todoValue.value}</div><div><img class="edit todo-controls" src="images/pencil.svg" onclick="UpdateToDoItems(this)" /><img class="delete todo-controls" src="images/trash.svg" onclick="DeleteToDoItems(this)" /></div>`;

  li.innerHTML = todoItems;
  listItems.appendChild(li);

  // Storing items in local storage
  if (!todoData) {
    todoData = [];
  }
  let dataItem = { item: todoValue.value, status: false };
  todoData.push(dataItem);
  localStorage.setItem('todoData', JSON.stringify(todoData));

  todoValue.value = '';
  SetAlertMessage("ToDo task Created Successfully.")
}

// Marking completed items
function CompleteTodoItem(e) {
  if (e.parentElement.querySelector('div').style.textDecoration === '') {
    e.parentElement.querySelector('div').style.textDecoration = 'line-through';
    e.parentElement.querySelector(".edit").style.display = 'none';
    todoData.forEach((element) => {
      if (e.parentElement.querySelector('div').innerText.trim() == element.item) {
        element.status = true;
        setLocalStorage();
      }
    });
  }
}

// Insert item's text into input and update on
function UpdateOnSelectionItems() {
  updateText.innerText = todoValue.value;
  addUpdateClick.setAttribute('onclick', 'CompleteTodoItem()');
  addUpdateClick.setAttribute('src', 'images/plus-solid.svg');
  todoValue.value = '';

  todoData.forEach((element) => {
    if (element.item == updateText.innerText.trim()) {
      element.item = todoValue.value;
    }
  });

  setLocalStorage();
}

// Edit button
function UpdateToDoItems(e) {
  if (e.parentElement.parentElement.querySelector('div').style.textDecoration === '') {
    todoValue.value = e.parentElement.parentElement.querySelector('div').innerText;
    todoValue.focus();
    addUpdateClick.setAttribute('onclick', 'UpdateOnSelectionItems()');
    addUpdateClick.setAttribute('src', 'images/refresh.svg');
    updateText = e.parentElement.parentElement.querySelector('div');
  }
}

// Delete button
function DeleteToDoItems(e) {
  let deleteValue = e.parentElement.parentElement.querySelector('div').innerText;
  if (confirm('Are you sure? Do you want to delete this task?')) {
    e.parentElement.parentElement.setAttribute("class", "deleted-item")
    todoValue.focus();

    todoData = todoData.filter(el => el.item != deleteValue);

    setTimeout(() => {
      e.parentElement.parentElement.remove();
    }, 500)
    setLocalStorage();
  }
}

function setLocalStorage() {
  localStorage.setItem('todoData', JSON.stringify(todoData));
}

function SetAlertMessage(message) {
  AlertMessage.removeAttribute("class");
  AlertMessage.innerText = message;

  setTimeout(() => {
    AlertMessage.classList.add("toggleMe");
  }, 1000)
}