var todos = []

// get todos from local storage
function getTodos() {
    const todos = localStorage.getItem('todos');
    if (!todos) return [];

    return JSON.parse(todos);
}

// save todos to local storage
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// add a new todo to the list
function addTodo(name, description) {
    todos.push({ name, description, done: false });
    saveTodos(todos);
}

// remove a todo from the list by name
function removeTodo(name) {
    const index = todos.findIndex(todo => todo.name === name);
    if (index !== -1) {
        todos.splice(index, 1);
        saveTodos(todos);
    } else {
        console.error(`Todo with name "${name}" not found.`);
    }
}

// set done status of a todo by name
function switchDone(name) {
    const todo = todos.find(todo => todo.name === name);
    if (todo) {
        todo.done = !todo.done;
        saveTodos(todos);
    } else {
        console.error(`Todo with name "${name}" not found.`);
    }
}

// reload todo list
function reloadTodos(localtodo = null) {
    if (localtodo === null) {
        localtodo = todos;
    }

    const todoContainer = document.getElementById('todo');
    todoContainer.innerHTML = ''; // Clear existing todos

    localtodo.forEach(todo => {
        // container untuk setiap todo item
        let todoList = document.createElement('div');
        todoList.id = 'todo-list';

        // judul todo
        let h3 = document.createElement('h3');
        h3.textContent = todo.name;
        todoList.appendChild(h3);

        // deskripsi todo
        let p = document.createElement('p');
        p.textContent = todo.description;
        todoList.appendChild(p);

        // tombol delete
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', function () {
            removeTodo(todo.name);
            reloadTodos();
        });
        todoList.appendChild(deleteButton);

        // status done
        if (todo.done) {
            h3.style.textDecoration = 'line-through';
            h3.style.color = 'gray';
            p.style.textDecoration = 'line-through';
            p.style.color = 'gray';
        }

        // tombol done
        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.className = 'done-btn';
        doneButton.addEventListener('click', function () {
            switchDone(todo.name);
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
    });
}

document.addEventListener('DOMContentLoaded', function () {
    todos = getTodos();
    reloadTodos();
});

const form = document.getElementById('todo-form');
const todoContainer = document.getElementById('todo');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // batalin submit form default behavior

    const input = document.getElementById('todo-input');
    const descriptionInput = document.getElementById('todo-description');
    const name = input.value.trim();
    const description = descriptionInput.value.trim();
    if (name === '') {
        alert('Nama tugas tidak boleh kosong!');
        return;
    }

    addTodo(name, description);
    reloadTodos();

    // reset input
    input.value = '';
    descriptionInput.value = '';
    alert('Tugas ditambahkan!');
});

const filter = document.getElementById('filter').querySelector('input[name="filter"]');
filter.addEventListener('input', function () {
    // copy todos
    let tempTodos = [...todos];
    let filterValue = filter.value
    console.log('Filter value:', filterValue); // Debugging line

    // filter
    if (filterValue === 'done') {
        tempTodos = tempTodos.filter(todo => todo.done);
    } else if (filterValue === 'not done') {
        tempTodos = tempTodos.filter(todo => !todo.done);
    } else if (filterValue === '') {
        // nothing
    } else {
        tempTodos = tempTodos.filter(todo => {
            return todo.name.toLowerCase().includes(filterValue) ||
                todo.description.toLowerCase().includes(filterValue);
        });
    }

    reloadTodos(tempTodos);
});
