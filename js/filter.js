let currentFilter = 'all';
let currentSearch = '';

export function setFilter(value) {
    currentFilter = value;
}

export function setSearch(query) {
    currentSearch = query.toLowerCase();
}

export function getFilteredTasks(tasks) {
    return tasks.filter(task => {
        const matchesFilter = currentFilter === 'all' || (currentFilter === 'active' && !task.completed) || (currentFilter === 'completed' && task.completed);

        const matchesSearch = task.content.toLowerCase().includes(currentSearch);

        return matchesFilter && matchesSearch;
    });
}

