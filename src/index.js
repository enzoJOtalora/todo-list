import './style.css';

const element = document.createElement("div");
element.innerHTML="<hr/><h1>SCRIPT LOADER</h1>";
document.body.appendChild(element);

const priorityLevels = ['LOW','MEDIUM','HIGH'];

//ToDo dialog group
const todoDialog = document.querySelector("#todo-modal");
const todoName = document.getElementById("#name");
const todoDetails = document.getElementById("#details");
const todoDate = document.getElementById("#date");
const todoPrio = document.getElementById("#prio");
const todoAddBtn = document.querySelector("#new-todo");
const todoCloseBtn = document.querySelector("#close-dialog");
const todoForm = document.querySelector("#todo-form");

todoAddBtn.addEventListener('click', ()=>{
    todoDialog.showModal();
})
todoCloseBtn.addEventListener('click',()=>{
    todoDialog.close();
})

todoForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
})

const todoMaker = () => {
    return {
        name: '',
        description: '',
        day: '',
        month: '',
        year: '',
        complete: false,
        priority: 'LOW',
        printDate(){
            return this.day+'/'+this.month+'/'+this.year;
        },
        toggleComplete(){
            this.complete=!this.complete;
        },
        changePriority(index){
            this.priority=priorityLevels[index];
        }
    }
}

const projectMaker = () => {
    return {
        title: '',
        description: '',
        toDoArray: [],
    }
}

function logToDo(){
    let newTodo = todoMaker();
    newTodo.name = todoName.value;
    newTodo.details = todoDetails.value;
    let date = todoDate.value.split('-');
    newTodo.day = date[2];
    newTodo.month = date[1];
    newTodo.year = date[0];
    newTodo.priority = todoPrio.value;
}
