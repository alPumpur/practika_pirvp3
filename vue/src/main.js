// main.js
Vue.component('kanban-column', {
    props: ['id', 'title', 'tasks', 'allowEdit', 'allowMove'],
    template: `
        <div class="column" :id="id">
            <h2>{{ title }}</h2>
            <div v-for="(task, index) in tasks" :key="task.created">
                <div class="task-card">
                    <h3>{{ task.title }}</h3>
                    <p>{{ task.description }}</p>
                    <p>Дата создания: {{ task.created }}</p>
                    <p>Дедлайн: {{ task.deadline }}</p>
                    <p v-if="allowEdit">Последнее редактирование: {{ task.lastEdited }}</p>
                    <button v-if="allowEdit" @click="editTask(task)">Редактировать</button>
                    <button @click="deleteTask(index)">Удалить</button>
                    <button v-if="allowMove" @click="moveTask(task)">В следующий столбец</button>
                </div>
            </div>
        </div>
    `,
    methods: {
        editTask(task) {
            task.lastEdited = new Date().toLocaleString();
            this.$emit('edit-task', task);
        },
        deleteTask(index) {
            this.$emit('delete-task', index);
        },
        moveTask(task) {
            this.$emit('move-task', task);
        }
    }
});

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
        clearForm() {
            this.newTaskTitle = '';
            this.newTaskDescription = '';
            this.newTaskDeadline = '';
        },
        editTask(task) {

        },
        deleteTask(index) {
            this.plannedTasks.splice(index, 1);
        },
        moveTask(task) {

        }
    }
});
