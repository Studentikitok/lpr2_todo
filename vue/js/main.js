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
                    <task-on-start :tasks="tasks" :completedTasks="completedTasks" @transfer-task="moveTaskToProcess"></task-on-start>
                </div>
                <div class="tasks">
                    <task-process v-if="processedTask || completedTasks.length > 0" 
                                  :task="processedTask" :completed-tasks="completedTasks"
                                  @transfer-task="moveTaskToFinish">
                                  </task-process>
                </div>
                <div class="tasks">
                    <task-finish v-if="completedTasks || finishedTasks.length > 0"
                                :task="completedTasks" :finished-tasks="finishedTasks"></task-finish>
                </div>
            </main>
        </div>  
    `,
    data() {
        return {
            tasks: JSON.parse(localStorage.getItem('tasks')) || [],
            processedTask: [],
            completedTasks: JSON.parse(localStorage.getItem('completedTasks')) || [],
            finishedTasks: JSON.parse(localStorage.getItem('finishedTasks')) || []
        }
    },
    watch: {
        tasks: {
            handler(newTasks) {
                localStorage.setItem('tasks', JSON.stringify(newTasks)); // Сохраняем задачи в localStorage при изменении
            },
            deep: true
        },
        completedTasks: {
            handler(newCompletedTasks) {
                localStorage.setItem('completedTasks', JSON.stringify(newCompletedTasks)); // Сохраняем выполненные задачи
            },
            deep: true
        },
        finishedTasks: {
            handler(newFinishedTasks) {
                localStorage.setItem('finishedTasks', JSON.stringify(newFinishedTasks)); // Сохраняем завершенные задачи
            },
            deep: true
        }
    },
    methods: {
        addTask(taskData) {
            this.tasks.push({
                title: taskData.title,
                items: taskData.items.map(item => ({...item, checked: false}))
            });
        },
        moveTaskToProcess(task) {
            // Убираем задание из основного списка
            const index = this.tasks.findIndex(t => t === task);
            if (index !== -1) {
                this.tasks.splice(index, 1);
            }

            this.processedTask = task;
            // Проверяем выполнение 50% задания
            let countChecked = task.items.filter(item => item.checked).length;
            if (countChecked >= Math.ceil(task.items.length / 2)) {
                this.completedTasks.push(task);
            }
        },
        moveTaskToFinish(task){
            const index = this.tasks.findIndex(t => t === task);
            if (index !== -1){
                this.tasks.splice(index, 1);
            }

            this.finishedTask= task;
            // check 100% complete
            let countChecked = task.items.filter(item => item.checked).length;
            if(countChecked = task.items.length){
                this.finishedTasks.push(task);
            }
        }
    },
    computed:{
        isTaskLimitReached(){
            return this.tasks.length >= 3;
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
            <input type="text" v-model="itemFour" v-if="itemThree !== '' && itemThree !== null" placeholder="Item four">
            <input type="text" v-model="itemFive" v-if="itemFour !== '' && itemFour !== null" placeholder="Item five">
            <button @click="createTask" v-if="title !== '' && itemOne !== '' && itemTwo !== '' && itemThree !== ''" :disabled="isTaskLimitReached ">Create task</button>
<!--            disabledButton || -->
        </div>
    `,
    computed:{
        isTaskLimitReached(){
            return this.$parent.isTaskLimitReached;
        }
    },
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
        // disabledButton(){
        //     if(this.title === '' || this.itemOne === '' || this.itemTwo === '' || this.itemThree === ''){
        //         return true;
        //     } else {
        //         return false;
        //     }
        // },
        createTask() {
            const items = [
                { id: 1, text: this.itemOne }
            ];

            if (this.itemTwo.trim() !== '') {
                items.push({ id: 2, text: this.itemTwo });
            }

            if (this.itemThree.trim() !== '') {
                items.push({ id: 3, text: this.itemThree });
            }

            if (this.itemFour.trim() !== '') {
                items.push({ id: 4, text: this.itemFour });
            }

            if (this.itemFive.trim() !== '') {
                items.push({ id: 5, text: this.itemFive });
            }

            const taskData = {
                title: this.title,
                items: items
            }
            this.$emit('create-task', taskData);
            this.cleanTask();
        },
        cleanTask() {
            this.title = '';
            this.itemOne = '';
            this.itemTwo = '';
            this.itemThree = '';
            this.itemFour = '';
            this.itemFive = '';
        }
    }
})

Vue.component('task-on-start', {
    props: ['tasks', 'completedTasks'],
    template: `
        <div>
            <h3>New task</h3>
            <div v-for="task in tasks" :key="task.title" class="task">
                <h3>{{ task.title }}</h3>
                <ul>
                    <li v-for="item in task.items" :key="item.id">
                        <input type="checkbox" :id="item.id" v-model="item.checked" @change="checkItems(task, completedTasks)"> 
                        <p>{{ item.text }}</p>
                    </li>
                </ul>
            </div>
        </div>
    `,
    methods: {
        checkItems(task, completedTasks) {
            // Calculate checked items percentage for a specific task
            let totalItems = task.items.length;
            let checkedItems = task.items.filter(item => item.checked).length;

            let percentage = (checkedItems / totalItems) * 100;

            if (percentage > 50) {
                if(completedTasks.length < 5){
                    // Transfer the task to task-process component
                    const index = this.tasks.findIndex(t => t === task);
                    if (index !== -1) {
                        this.$emit('transfer-task', this.tasks.splice(index, 1)[0]); // Remove the task from the array
                    }
                } else {
                    alert("Task column full");
                    // return this.item.checked="disabled";
                }
            }
        }
    }
})

Vue.component('task-process', {
    props: ['completedTasks', 'tasks'],
    template: `
        <div class="task-process">
            <h3>Task processed</h3>
            <div v-for="completedTask in completedTasks" :key="completedTask.title" class="task">
                <h3>{{ completedTask.title }}</h3>
                <ul>
                    <li v-for="item in completedTask.items" :key="item.id">
                        <input type="checkbox" :id="item.id" v-model="item.checked" @change="checkItems(completedTask, item); checkItems(completedTask)">
                        <p :class="{ 'completed': item.checked }">{{ item.text }}</p>
                    </li>
                </ul>
            </div>
        </div>
    `,
    methods:{
        checkItems(completedTask) {
            // Calculate checked items percentage for a specific task
            let totalItems = completedTask.items.length;
            let checkedItems = completedTask.items.filter(item => item.checked).length;

            let percentage = (checkedItems / totalItems) * 100;

            if (percentage === 100) {
                // Transfer the task to task-process component
                const index = this.completedTasks.findIndex(c => c === completedTask);
                if (index !== -1) {
                    this.$emit('transfer-task', this.completedTasks.splice(index, 1)[0]); // Remove the task from the array
                }
            }
        }
    }
})

Vue.component('task-finish',{
    props:['finishedTasks'],
    template: `
        <div class="task-finish">
            <h3>Task finish</h3>
            <div v-for="finishedTask in finishedTasks" :key="finishedTask.title" class="task">
                <h3>{{ finishedTask.title }}</h3>
                <ul>
                    <li v-for="item in finishedTask.items" :key="item.id">
                        <p>{{ item.text }}</p>
                    </li>
                </ul>
                <p>Date completed: {{ finishTime(finishedTask) }}</p>
            </div>
        </div>
    `,
    methods:{
        finishTime(finishedTask){
            let timeNow = new Date();
            return timeNow.toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
    },
})

let app = new Vue({
    el: '#app'
})
