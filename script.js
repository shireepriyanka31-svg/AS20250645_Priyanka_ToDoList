document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const emptyMsg = document.getElementById('empty-msg');
    const remainingCount = document.getElementById('remaining-count');
    const clearCompletedBtn = document.getElementById('clear-completed-btn');
    
    const filterAll = document.getElementById('btnradio1');
    const filterActive = document.getElementById('btnradio2');
    const filterCompleted = document.getElementById('btnradio3');

    function getCurrentFilter() {
        if (filterActive && filterActive.checked) return 'active';
        if (filterCompleted && filterCompleted.checked) return 'completed';
        return 'all';
    }

    function applyFilter() {
        const filter = getCurrentFilter();
        const allTaskItems = taskList.querySelectorAll('.task-item');

        allTaskItems.forEach(item => {
            const isCompleted = item.querySelector('.task-checkbox').checked;

            if (filter === 'all') {
                item.style.setProperty('display', 'flex', 'important');
            } else if (filter === 'active') {
                if (isCompleted) {
                    item.style.setProperty('display', 'none', 'important');
                } else {
                    item.style.setProperty('display', 'flex', 'important');
                }
            } else if (filter === 'completed') {
                if (isCompleted) {
                    item.style.setProperty('display', 'flex', 'important');
                } else {
                    item.style.setProperty('display', 'none', 'important');
                }
            }
        });

        if (allTaskItems.length === 0 && emptyMsg) {
            emptyMsg.style.display = 'block';
        }
    }

    function updateRemainingCount() {
        const activeTasks = taskList.querySelectorAll('.task-checkbox:not(:checked)').length;
        remainingCount.textContent = `${activeTasks} remaining`;
    }

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        if (emptyMsg) {
            emptyMsg.style.display = 'none';
        }

        const taskItem = document.createElement('div');
        taskItem.className = 'task-item d-flex justify-content-between align-items-center py-2 px-2';

        taskItem.innerHTML = `
            <div class="form-check d-flex align-items-center gap-2 mb-0">
                <input class="form-check-input task-checkbox mt-0" type="checkbox">
                <span class="task-text">${taskText}</span>
            </div>
            <button class="btn btn-danger btn-sm delete-btn px-3 py-1">Delete</button>
        `;

        taskList.appendChild(taskItem);
        taskInput.value = '';

        updateRemainingCount();
        applyFilter();

        const checkbox = taskItem.querySelector('.task-checkbox');
        const textSpan = taskItem.querySelector('.task-text');

        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                textSpan.classList.add('completed');
            } else {
                textSpan.classList.remove('completed');
            }
            updateRemainingCount();
            applyFilter();
        });

        taskItem.querySelector('.delete-btn').addEventListener('click', function () {
            taskItem.remove();
            if (taskList.querySelectorAll('.task-item').length === 0 && emptyMsg) {
                emptyMsg.style.display = 'block';
            }
            updateRemainingCount();
            applyFilter();
        });
    });

    clearCompletedBtn.addEventListener('click', function () {
        const completedTasks = taskList.querySelectorAll('.task-checkbox:checked');
        completedTasks.forEach(checkbox => {
            checkbox.closest('.task-item').remove();
        });

        if (taskList.querySelectorAll('.task-item').length === 0 && emptyMsg) {
            emptyMsg.style.display = 'block';
        }
        updateRemainingCount();
        applyFilter();
    });

    // Filter Change Event Listeners
    if (filterAll) filterAll.addEventListener('change', applyFilter);
    if (filterActive) filterActive.addEventListener('change', applyFilter);
    if (filterCompleted) filterCompleted.addEventListener('change', applyFilter);
});