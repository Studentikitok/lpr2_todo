Vue.component('ToDoApp',{
    template:`
        <header>
            <h1 class="app-title">To Do</h1>
            <p class="app-description">Just do it</p>
            <TaskCreate></TaskCreate>
        </header>
        <main>
            
            <TaskOnStart></TaskOnStart>
            <TaskOnWork></TaskOnWork>
            <TaskDone></TaskDone>
        </main>
    `
})

Vue.component('TaskCreate', {
    template:`
        <div class="create-task">
            <input type="text" name="" id="">
        <\div>
    `
})

Vue.component('TaskOnStart', {
    template:`
        
    `
})