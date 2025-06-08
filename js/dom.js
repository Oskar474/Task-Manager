import { saveTasks } from './storage.js';

const list = document.getElementById('task-list');

export function renderTasks(tasks) {
    list.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        li.className = task.completed ? 'completed' : '';
        li.draggable = true;

        li.innerHTML = `
      <span>${task.content}</span>
      <div class="actions">
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <button class="delete-btn">🗑</button>        
      </div>
    `;

        li.querySelector('input').addEventListener('change', () => {
            task.completed = !task.completed;
            saveTasks(tasks);
            renderTasks(tasks);
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            const index = tasks.findIndex(t => t.id === task.id);
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks(tasks);
        });

        list.appendChild(li);
    });
}

export function addTask(task) {
    const tasks = loadTasks();
    tasks.push(task);
    saveTasks(tasks);
    renderTasks(tasks);
}
