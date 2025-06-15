import {saveTasks} from './storage.js';

const list = document.getElementById('task-list');
let draggedItem = null;

export function enableDragAndDrop(tasks) {
    list.addEventListener('dragstart', e => {
        if (e.target.tagName !== 'LI') return;
        draggedItem = e.target;
        draggedItem.classList.add('dragging');

        const img = new Image();
        img.src = '';
        e.dataTransfer.setDragImage(img, 0, 0);
    });

    list.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(list, e.clientY);
        const dragging = document.querySelector('.dragging');
        if (!afterElement) {
            list.appendChild(dragging);
        } else {
            list.insertBefore(dragging, afterElement);
        }
    });

    list.addEventListener('drop', () => {
        const newTasks = [...list.children].map(li => {
            const id = li.dataset.id;
            return tasks.find(t => t.id === id);
        });

        tasks.splice(0, tasks.length, ...newTasks);
        saveTasks(tasks);
    });

    list.addEventListener('dragend', () => {
        if (draggedItem) {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
        }
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect(); //{ top, bottom, left, right, width, height, x, y }
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return {offset, element: child};
        } else {
            return closest;
        }
        }, {offset: Number.NEGATIVE_INFINITY}).element;
}
