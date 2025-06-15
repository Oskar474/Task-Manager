import {saveTasks} from './storage.js';

export function exportTasks() {
    const raw = localStorage.getItem('todo-list');
    const tasks = raw ? JSON.parse(raw) : [];
    const json = JSON.stringify(tasks, null, 2);
    const blob = new Blob([json], {type: 'application/json'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.json';
    a.click();

    URL.revokeObjectURL(url);
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}

export async function importTasks(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const content = await readFile(file);
        const data = JSON.parse(content);

        if (!Array.isArray(data)) {
            alert("Nieprawidłowa struktura pliku.");
            return;
        }

        saveTasks(data);
        alert("Import zadań zakończony sukcesem.");

        location.reload();
    } catch (err) {
        alert("Błąd importowania pliku: " + err.message);
    }
}
