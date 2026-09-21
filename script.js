const form = document.getElementById('todo-form');
const todoContainer = document.getElementById('todo');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // batalin submit form default behavior

    const input = document.getElementById('todo-input');
    const todoText = input.value.trim();
    const descriptionInput = document.getElementById('todo-description');
    const todoDescription = descriptionInput.value.trim();

    if (todoText === '' || todoDescription === '') {
        alert('Lengkapin input tugas.');
        return;
    }

    let todoList = document.createElement('div');
    todoList.id = 'todo-list';

    let h3 = document.createElement('h3');
    h3.textContent = todoText;
    todoList.appendChild(h3);

    let p = document.createElement('p');
    p.textContent = todoDescription;
    todoList.appendChild(p);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', function () {
        todoList.removeChild(listItem);
    });
    todoList.appendChild(deleteButton);


    // tambahin todoList ke todoContainer di posisi paling atas
    todoContainer.insertBefore(todoList, todoContainer.firstChild);

    input.value = '';
    descriptionInput.value = '';
    alert('Tugas ditambahkan!');
});
