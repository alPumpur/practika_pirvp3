new Vue({
    el: '#app',
    data: {
        plannedTasks: [],
        inProgressTasks: [],
        testingTasks: [],
        completedTasks: [],
        newTaskTitle: '',
        newTaskDescription: '',
        newTaskDeadline: '',
        newTaskReturn: false,
        editingTask: null,
        editedTask: { title: '', description: '', deadline: '' } // Объект для временного хранения отредактированных данных
    },
    methods: {
        // Метод для открытия формы редактирования задачи
        editTaskForm(index) {
            this.editingTask = index;
            // Заполнение формы текущими данными задачи
            const task = this.plannedTasks[index] && this.inProgressTasks[index] && this.testingTasks[index];
            this.editedTask = {
                title: task.title,
                description: task.description,
                deadline: task.deadline
            };
        },

        returnTaskForm(){

        },

        // Метод для сохранения отредактированной задачи
        saveEditedTask() {
            let task;
            if (this.editingTask !== null) {
                if (this.editingTask < this.plannedTasks.length) {
                    task = this.plannedTasks[this.editingTask];
                } else if (this.editingTask < this.plannedTasks.length + this.inProgressTasks.length) {
                    task = this.inProgressTasks[this.editingTask - this.plannedTasks.length];
                } else if (this.editingTask < this.plannedTasks.length + this.inProgressTasks.length + this.testingTasks.length) {
                    task = this.testingTasks[this.editingTask - this.plannedTasks.length - this.inProgressTasks.length];
                } else {
                    task = this.completedTasks[this.editingTask - this.plannedTasks.length - this.inProgressTasks.length - this.testingTasks.length];
                }

                task.title = this.editedTask.title;
                task.description = this.editedTask.description;
                task.deadline = this.editedTask.deadline;
                task.lastEdited = new Date().toLocaleString();
            }
            this.editingTask = null; // Закрыть форму редактирования
        },

        // Метод для отмены редактирования задачи
        cancelEditTask() {
            this.editingTask = null; // Закрыть форму редактирования
        },
        // Остальные методы добавления, удаления и перемещения задач остаются без изменений
        addTask(column) {
            if (this.newTaskTitle.trim() === '') return;
            const task = {
                title: this.newTaskTitle,
                description: this.newTaskDescription,
                created: new Date().toLocaleString(),
                deadline: this.newTaskDeadline,
                lastEdited: new Date().toLocaleString()
            };
            if (column === 'planned') {
                this.plannedTasks.push(task);
            }
            this.clearForm();
        },
        deleteTask(column, index) {
            // Удаление задачи из соответствующего массива
            if (column === 'planned') {
                this.plannedTasks.splice(index, 1);
            } else if (column === 'inProgress') {
                this.inProgressTasks.splice(index, 1);
            } else if (column === 'testing') {
                this.testingTasks.splice(index, 1);
            } else if (column === 'completed') {
                this.completedTasks.splice(index, 1);
            }
        },
        moveTask(task) {
            const index = this.plannedTasks.indexOf(task);
            if (index !== -1) {
                this.plannedTasks.splice(index, 1);
                this.inProgressTasks.push(task);
                return; // Вернуться после перемещения в столбец "В работе"
            }
            const index1 = this.inProgressTasks.indexOf(task);
            if (index1 !== -1) {
                this.inProgressTasks.splice(index1, 1);
                this.testingTasks.push(task);
                return; // Вернуться после перемещения в столбец "Тестирование"
            }
            const index2 = this.testingTasks.indexOf(task);
            if (index2 !== -1) {
                this.testingTasks.splice(index2, 1);
                this.completedTasks.push(task);
                return; // Вернуться после перемещения в столбец "Выполненные"
            }

        },
        removeTask(task){
            const index4 = this.completedTasks.indexOf(task);
            if (index4 !== -1){
                this.completedTasks.splice(index4, 1);
                this.testingTasks.push(task);
                return;
            }
            const index3 = this.testingTasks.indexOf(task);
            if (index3 !== -1){
                this.testingTasks.splice(index3, 1);
                this.inProgressTasks.push(task);
                return;
            }

        },
        clearForm() {
            this.newTaskTitle = '';
            this.newTaskDescription = '';
            this.newTaskDeadline = '';
        }
    }
});