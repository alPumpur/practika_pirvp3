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
        newTaskPriority: '',
        editingTask: null,
        editedTask: { title: '', description: '', deadline: '' }
    },
    methods: {
        editTaskForm(column, index) {
            this.editingTask = { column, index };
            let task;
            if (column === 'planned') {
                task = this.plannedTasks[index];
            } else if (column === 'inProgress') {
                task = this.inProgressTasks[index];
            } else if (column === 'testing') {
                task = this.testingTasks[index];
            } else if (column === 'completed') {
                task = this.completedTasks[index];
            }
            this.editedTask = {
                title: task.title,
                description: task.description,
                deadline: task.deadline
            };
        },

        saveEditedTask() {
            if (this.editingTask !== null) {
                let task;
                const { column, index } = this.editingTask;
                if (column === 'planned') {
                    task = this.plannedTasks[index];
                } else if (column === 'inProgress') {
                    task = this.inProgressTasks[index];
                } else if (column === 'testing') {
                    task = this.testingTasks[index];
                } else if (column === 'completed') {
                    task = this.completedTasks[index];
                }

                task.title = this.editedTask.title;
                task.description = this.editedTask.description;
                task.deadline = this.editedTask.deadline;
                task.lastEdited = new Date().toLocaleString();
            }
            this.editingTask = null;
        },


        cancelEditTask() {
            this.editingTask = null;
        },

        addTask(column) {
            if (this.newTaskTitle.trim() === '') return;
            const task = {
                title: this.newTaskTitle,
                description: this.newTaskDescription,
                created: new Date().toLocaleString(),
                priority: parseInt(this.newTaskPriority),
                deadline: this.newTaskDeadline,
                lastEdited: new Date().toLocaleString()
            };
            if (column === 'planned') {
                this.plannedTasks.push(task);
                this.plannedTasks.sort((a, b) => b.priority - a.priority);
            } else
            if (column === 'inProgress') {
                this.inProgressTasks.push(task);
                this.inProgressTasks.sort((a, b) => b.priority - a.priority);
            } else
            if (column === 'testing') {
                this.testingTasks.push(task);
                this.testingTasks.sort((a, b) => b.priority - a.priority);
            } else
            if (column === 'completed') {
                this.completedTasks.push(task);
                this.completedTasks.sort((a, b) => b.priority - a.priority);
            }
            this.clearForm();

            console.log("Запланированные задачи:", this.plannedTasks);
            console.log("Задачи в работе:", this.inProgressTasks);
            console.log("Задачи в тестировании:", this.testingTasks);
            console.log("Выполненные задачи:", this.completedTasks);

        },
        deleteTask(column, index) {
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
                this.inProgressTasks.sort((a, b) => b.priority - a.priority);
                return;
            }

            const index1 = this.inProgressTasks.indexOf(task);
            if (index1 !== -1) {
                this.inProgressTasks.splice(index1, 1);
                this.testingTasks.push(task);
                this.testingTasks.sort((a, b) => b.priority - a.priority);
                return;
            }

            const index2 = this.testingTasks.indexOf(task);
            if (index2 !== -1) {
                this.testingTasks.splice(index2, 1);
                const currentDate = new Date();
                const taskDeadline = new Date(task.deadline);
                task.deadlineNoPassed = currentDate > taskDeadline;
                this.completedTasks.push(task);
                this.completedTasks.sort((a, b) => b.priority - a.priority);
                return;
            }
        },
        removeTask(task) {
            const index4 = this.completedTasks.indexOf(task);
            if (index4 !== -1) {
                this.completedTasks.splice(index4, 1);
                this.testingTasks.push(task);
                this.testingTasks.sort((a, b) => b.priority - a.priority);
                return;
            }
            const index3 = this.testingTasks.indexOf(task);
            if (index3 !== -1 && task.returnReason) {
                this.testingTasks.splice(index3, 1);
                this.inProgressTasks.push(task);
                this.inProgressTasks.sort((a, b) => b.priority - a.priority);
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