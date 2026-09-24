// To-Do List: add, complete and delete tasks. Tasks are persisted in
// localStorage so they survive a page refresh.
(function todoModule() {
    const STORAGE_KEY = 'vanilla-js-widgets.todos';

    const form = document.getElementById('todoForm');
    const input = document.getElementById('todoInput');
    const listEl = document.getElementById('todoList');
    const footer = document.getElementById('todoFooter');
    const countEl = document.getElementById('todoCount');
    const clearBtn = document.getElementById('todoClearBtn');

    function loadTasks() {
        try {
            const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (Array.isArray(parsed)) {
                return parsed.filter(t => t && typeof t.id === 'string' && typeof t.text === 'string');
            }
        } catch (_) { /* corrupt or unavailable storage: start fresh */ }
        return [];
    }

    let tasks = loadTasks();

    function saveTasks() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (_) { /* storage full or blocked: keep working in memory */ }
    }

    function genId() {
        return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
    }

    function createTaskItem(task) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = task.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = !!task.completed;
        checkbox.setAttribute('aria-label', 'Mark "' + task.text + '" as complete');

        const text = document.createElement('span');
        text.className = 'task-text' + (task.completed ? ' completed' : '');
        text.textContent = task.text;

        const del = document.createElement('button');
        del.type = 'button';
        del.className = 'delete-btn';
        del.title = 'Delete task';
        del.setAttribute('aria-label', 'Delete "' + task.text + '"');
        del.textContent = '✕';

        li.append(checkbox, text, del);
        return li;
    }

    function render() {
        listEl.replaceChildren();

        if (tasks.length === 0) {
            const empty = document.createElement('li');
            empty.className = 'todo-empty';
            empty.textContent = '✨ No tasks yet — add one above!';
            listEl.append(empty);
        } else {
            listEl.append(...tasks.map(createTaskItem));
        }

        const remaining = tasks.filter(t => !t.completed).length;
        const done = tasks.length - remaining;
        footer.hidden = tasks.length === 0;
        countEl.textContent = `${remaining} ${remaining === 1 ? 'task' : 'tasks'} left`;
        clearBtn.hidden = done === 0;
    }

    function addTask() {
        const text = input.value.trim();
        if (text !== '') {
            tasks.push({ id: genId(), text: text, completed: false });
            saveTasks();
            render();
            input.value = '';
        }
        input.focus();
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        addTask();
    });

    // One delegated listener per event type instead of one per task.
    listEl.addEventListener('change', function (e) {
        if (!e.target.classList.contains('todo-checkbox')) return;
        const task = tasks.find(t => t.id === e.target.closest('.todo-item').dataset.id);
        if (!task) return;
        task.completed = e.target.checked;
        saveTasks();
        render();
    });

    listEl.addEventListener('click', function (e) {
        const del = e.target.closest('.delete-btn');
        if (!del) return;
        const id = del.closest('.todo-item').dataset.id;
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        render();
    });

    clearBtn.addEventListener('click', function () {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        render();
    });

    render();
})();
