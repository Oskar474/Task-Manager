import { renderTasks, addTask } from './dom.js';
import { loadTasks, saveTasks } from './storage.js';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');

let tasks = loadTasks();

form.addEventListener('submit', e => {
    e.preventDefault();
    const content = input.value.trim();
    if (!content) return;

    const task = {
        id: Date.now().toString(),
        content,
        completed: false,
    };

    tasks.push(task);
    saveTasks(tasks);
    renderTasks(tasks);
    input.value = '';
});

renderTasks(tasks);
