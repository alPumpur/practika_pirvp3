new Vue({
    el: '#app',
    data: {
        plannedTasks: [],
        inProgressTasks: [],
        testingTasks: [],
        completedTasks: [],
        newTaskTitle: '',
        newTaskDescription: '',
        newTaskDeadline: ''
    },
    methods: {
        addTask: function(column) {
            if (this.newTaskTitle.trim() === '') return;

            const task = {
                title: this.newTaskTitle,
                description: this.newTaskDescription,
                created: new Date().toLocaleString(),
                deadline: this.newTaskDeadline
            };

            switch (column) {
                case 'planned':
                    this.plannedTasks.push(task);
                    break;
                case 'inProgress':
                    this.inProgressTasks.push(task);
                    break;
                case 'testing':
                    this.testingTasks.push(task);
                    break;
                case 'completed':
                    this.completedTasks.push(task);
                    break;
                default:
                    break;
            }

            this.newTaskTitle = '';
            this.newTaskDescription = '';
            this.newTaskDeadline = '';
        }
    }
});
