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

    // container untuk setiap todo item
    let todoList = document.createElement('div');
    todoList.id = 'todo-list';

    // judul todo
    let h3 = document.createElement('h3');
    h3.textContent = todoText;
    todoList.appendChild(h3);

    // deskripsi todo
    let p = document.createElement('p');
    p.textContent = todoDescription;
    todoList.appendChild(p);

    // tombol delete
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', function () {
        todoList.removeChild(listItem);
    });
    todoList.appendChild(deleteButton);

    // tombol done
    const doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.className = 'done-btn';
    doneButton.addEventListener('click', function () {
        if (h3.style.textDecoration === 'line-through') {
            h3.style.textDecoration = 'none';
            h3.style.color = 'black';
            p.style.textDecoration = 'none';
            p.style.color = 'black';
        } else {
            h3.style.textDecoration = 'line-through';
            h3.style.color = 'gray';
            p.style.textDecoration = 'line-through';
            p.style.color = 'gray';
        }
    });
    todoList.appendChild(doneButton);

    // tambahin todoList ke todoContainer di posisi paling atas
    todoContainer.insertBefore(todoList, todoContainer.firstChild);

    // reset input
    input.value = '';
    descriptionInput.value = '';
    alert('Tugas ditambahkan!');
});
