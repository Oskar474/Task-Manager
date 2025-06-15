import {renderTasks} from './dom.js';
import {loadTasks, saveTasks} from './storage.js';
import {setFilter, setSearch, getFilteredTasks} from './filter.js';
import {exportTasks, importTasks} from './exportImport.js';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const exportButton = document.getElementById('export-btn');
const importButton = document.getElementById('import-btn');
const importFileInput = document.getElementById('import-file');

let tasks = loadTasks();

function updateView() {
    renderTasks(getFilteredTasks(tasks), tasks, updateView);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const content = input.value.trim();
    if (!content) return;

    const task = {
        id: Date.now().toString(), content, completed: false,
    };

    tasks.push(task);
    saveTasks(tasks);
    input.value = '';
    updateView();
});

searchInput.addEventListener('input', e => {
    setSearch(e.target.value);
    updateView();
});

filterSelect.addEventListener('change', e => {
    setFilter(e.target.value);
    updateView();
});

exportButton.addEventListener('click', exportTasks);
importButton.addEventListener('click', () => {
    document.getElementById('import-file').click();
});

importFileInput.addEventListener('change', importTasks);

updateView();
