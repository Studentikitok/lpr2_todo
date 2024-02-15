Vue.component('ToDoApp'){
    template:`
        <header>
            <h1 class="app-title">To Do</h1>
            <p class="app-description">Just do it</p>
        </header>
        <main>
            <TaskOnView></TaskOnView>
            <TaskOnWork></TaskOnWork>
            <TaskDone></TaskDone>
        </main>
    `
}