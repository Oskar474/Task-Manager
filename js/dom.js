import {enableDragAndDrop} from './dragDrop.js';
import {saveTasks} from './storage.js';

export function renderTasks(filteredTasks, tasks, updateView) {
    const list = document.getElementById('task-list');
    list.innerHTML = '';

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        li.className = task.completed ? 'completed' : '';
        li.draggable = true;

        li.innerHTML = `
            <span class="task-content">${task.content}</span>
            <div class="actions">
                <span class="checkbox-icon">
                    <i class="${task.completed ? 'fas fa-check-square' : 'far fa-square'}"></i>
                </span>
                <button class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>        
            </div>
        `;

        li.querySelector('.checkbox-icon').addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks(tasks);
            updateView();
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            const index = tasks.findIndex(t => t.id === task.id);
            tasks.splice(index, 1);
            saveTasks(tasks);
            updateView();
        });

        li.querySelector('span').addEventListener('dblclick', () => {
            const span = li.querySelector('span');
            const oldValue = span.textContent;

            const textarea = document.createElement('textarea');
            textarea.value = oldValue;
            textarea.className = 'edit-textarea';
            textarea.rows = 1;
            textarea.style.overflow = 'hidden';
            textarea.style.resize = 'none';
            textarea.style.width = '100%';

            li.replaceChild(textarea, span);
            textarea.focus();
            const resizeTextarea = () => {
                textarea.style.height = 'auto';
                textarea.style.height = (textarea.scrollHeight) + 'px';
            };

            resizeTextarea();

            textarea.addEventListener('input', resizeTextarea);

            const saveEdit = () => {
                const newValue = textarea.value.trim();
                if (newValue !== '') {
                    task.content = newValue;
                    saveTasks(tasks);
                    updateView();
                } else {
                    updateView();
                }
            };

            textarea.addEventListener('blur', saveEdit);
            textarea.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                    e.preventDefault();
                    saveEdit();
                }
            });
        });

        list.appendChild(li);
    });
    enableDragAndDrop(tasks);
}
