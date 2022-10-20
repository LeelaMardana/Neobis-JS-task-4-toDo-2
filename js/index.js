let todos = JSON.parse(localStorage.getItem('todos')) || [];
const nameInput = document.querySelector('#name');
const newTodoForm = document.querySelector('#new-todo-form');

const username = localStorage.getItem('username') || '';

nameInput.value = username;

nameInput.addEventListener('change', e => {
  localStorage.setItem('username', e.target.value);
});

newTodoForm.addEventListener('submit', e => {
  e.preventDefault();

  if (e.target.content.value === '') {
    alert('Please fill out the task');
    return;
  }

  if (e.target.category.value === '') {
    alert('Please choose a category');
    return;
  }

  const todo = {
    content: e.target.elements.content.value,
    category: e.target.elements.category.value,
    done: false,
  };
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  e.target.reset();

  displayTodos();
});

const displayTodos = () => {
  const todoList = document.querySelector('#todo-list');

  todoList.textContent = '';

  todos.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const contentInput = document.createElement('input');

    input.type = 'checkbox';
    input.checked = todo.done;
    span.classList.add('bubble');

    if (todo.category == 'personal') {
      span.classList.add('personal');
    } else {
      span.classList.add('business');
    }

    content.classList.add('todo-content');
    actions.classList.add('actions');
    editBtn.classList.add('edit');
    deleteBtn.classList.add('delete');
    // content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    contentInput.type = 'text';
    contentInput.value = `${todo.content}`;
    contentInput.setAttribute('readonly', 'readonly');
    content.append(contentInput);

    editBtn.textContent = 'Edit';
    deleteBtn.textContent = 'Delete';

    label.append(input);
    label.append(span);
    actions.append(editBtn);
    actions.append(deleteBtn);
    todoItem.append(label);
    todoItem.append(content);
    todoItem.append(actions);

    todoList.append(todoItem);

    if (todo.done) {
      todoItem.classList.add('done');
    }

    input.addEventListener('click', e => {
      todo.done = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add('done');
      } else {
        todoItem.classList.remove('done');
      }
      displayTodos();
    });

    editBtn.addEventListener('click', () => {
      const input = content.querySelector('input');
      input.removeAttribute('readonly');
      input.focus();
      input.addEventListener('blur', e => {
        input.setAttribute('readonly', true);
        todo.content = e.target.value;

        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodos();
      });
    });

    deleteBtn.addEventListener('click', () => {
      todos = todos.filter(t => t != todo);
      localStorage.setItem('todos', JSON.stringify(todos));
      displayTodos();
    });
  });
};
displayTodos();
