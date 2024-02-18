Vue.component('to-do-app',{
    template:`
        <header>
            <h1 class="app-title">To Do</h1>
            <p class="app-description">Just do it</p>
            <task-create></task-create>
        </header>
        <main>
            <div class="tasks">
                <div class="task-on-start">
                    <task-on-start></task-on-start>
                </div>
            </div>
            <div class="tasks">
                <div class="task-on-work">
                    <task-on-work></task-on-work>
                </div>
            </div>
            <div class="tasks">
                <div class="task-done">
                    <task-on-done></task-on-done>
                </div>
            </div>
            
        </main>
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
    template:`
        <div class="tasks">
            <div class="task">
                <h3> dddddddddk</h3>
                <ul>
                    <li><input type="checkbox" name="" id=""> <p>  ddddddddddddddddddddd ddddddddtem</p></li>
                    <li><input type="checkbox" name="" id=""> <p>item</p></li>
                    <li><input type="checkbox" name="" id=""> <p>item</p></li>
                    <li><input type="checkbox" name="" id=""> <p>item</p></li>
                    <li><input type="checkbox" name="" id=""> <p>item</p></li>
                </ul>
            </div>
        </div>
    `
})

let app = new Vue({
    el: '#app',
    data: {},
    methods: {}
})