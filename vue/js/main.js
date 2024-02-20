Vue.component('to-do-app',{
    template:`
        <div>
            <header>
                <h1 class="app-title">To Do</h1>
                <p class="app-description">Just do it</p>
                <task-create></task-create>
            </header>
            <main>
                <div class="tasks">
                    <task-on-start></task-on-start>
                </div>
            </main>
    <!--            <div class="tasks">-->
    <!--                <div class="task-on-work">-->
    <!--                    <task-on-work></task-on-work>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--            <div class="tasks">-->
    <!--                <div class="task-done">-->
    <!--                    <task-on-done></task-on-done>-->
    <!--                </div>-->
    <!--            </div>-->
        </div>  
        
    `
})

Vue.component('task-create', {
    template:`
        <div class="create-task">
            <input type="text" placeholder="Title">
            <input type="text" placeholder="Item one">
            <input type="text" placeholder="Item two">
            <input type="text" placeholder="Item three">
            <input type="text" placeholder="Item four">
            <input type="text" placeholder="Item five">
            <button>Create task</button>
        </div>
    `
})

Vue.component('task-on-start', {
    template: `
            <div class="task">
                <h3>title</h3>
                <ul>
                    <li v-for="item in items" :key="item.id">
                        <input type="checkbox" :id="item.id"> <p>{{ item.text }}</p>
                    </li>
                </ul>
            </div>
       `,
    data() {
        return {
            items: [
                { id: 1, text: 'Item one' },
                { id: 2, text: 'Item two' },
                { id: 3, text: 'Item three' },
                { id: 4, text: 'Item four' },
                { id: 5, text: 'Item five' }
            ]
        }
    }
})


let app = new Vue({
    el: '#app',
    data: {},
    methods: {}
})