Vue.component('to-do-app',{
    template:`
        <div>
            <header>
                <h1 class="app-title">To Do</h1>
                <p class="app-description">Just do it</p>
                <task-create @create-task="addTask" :taskCount="tasks.length"></task-create>
            </header>
            <main>
                <div class="tasks">
                    <task-on-start :tasks="tasks"></task-on-start>
                </div>
                <div class="tasks">
                    <task-process></task-process>
                </div>
                
            </main>
        </div>  
    `,
    data() {
        return {
            tasks: []
        }
    },
    methods: {
        addTask(taskData) {
            this.tasks.push({
                title: taskData.title,
                items: taskData.items
            });
        }
    }
})

Vue.component('task-create', {
    template:`
        <div class="create-task">
            <input type="text" v-model="title" placeholder="Title">
            <input type="text" v-model="itemOne" placeholder="Item one">
            <input type="text" v-model="itemTwo" placeholder="Item two">
            <input type="text" v-model="itemThree" placeholder="Item three">
            <input type="text" v-model="itemFour" placeholder="Item four">
            <input type="text" v-model="itemFive" placeholder="Item five">
            <button @click="createTask" :disabled="taskCount >= 3">Create task</button>
        </div>
    `,
    props: ['taskCount'],
    data() {
        return {
            title: '',
            itemOne: '',
            itemTwo: '',
            itemThree: '',
            itemFour: '',
            itemFive: ''
        }
    },
    methods: {
        createTask() {
            const taskData = {
                title: this.title,
                items: [
                    { id: 1, text: this.itemOne },
                    { id: 2, text: this.itemTwo },
                    { id: 3, text: this.itemThree },
                    { id: 4, text: this.itemFour },
                    { id: 5, text: this.itemFive }
                ]
            }
            this.$emit('create-task', taskData);
        }
    }
})

Vue.component('task-on-start', {
    props: ['tasks'],
    template: `
        <div>
            <div v-for="task in tasks" :key="task.title" class="task">
                <h3>{{ task.title }}</h3>
                <ul>
                    <li v-for="item in task.items" :key="item.id">
                        <input type="checkbox" :id="item.id"> <p>{{ item.text }}</p>
                    </li>
                </ul>
            </div>
        </div>
    `,
    methods:{

    }
})

let app = new Vue({
    el: '#app'
})
