import './style.css';

const element = document.createElement("div");
element.innerHTML="<hr/><h1>SCRIPT LOADER</h1>";
document.body.appendChild(element);

const priorityLevels = ['LOW','MEDIUM','HIGH'];

const todoAddBtn = document.querySelector("#new-todo");
const projectAddBtn = document.querySelector("#new-project");

//ToDo dialog group
const todoDialog = document.querySelector("#todo-modal");
const todoName = document.getElementById("name");
const todoDetails = document.getElementById("details");
const todoDate = document.getElementById("date");
const todoPrio = document.getElementById("prio");
const todoCloseBtn = document.querySelector("#close-dialog");
const todoForm = document.querySelector("#todo-form");

//Project dialog group

const projectDialog = document.querySelector("#project-modal");
const projectName = document.getElementById("projectName");
const projectDetails = document.getElementById("projectDetails");
const projectCloseBtn = document.querySelector("#close-dialog-project");
const projectForm = document.querySelector("#project-form");

let myTodos = [];
let myProjects = [];

todoAddBtn.addEventListener('click', ()=>{
    todoDialog.showModal();
})
todoCloseBtn.addEventListener('click',()=>{
    todoDialog.close();
})

projectAddBtn.addEventListener('click', ()=>{
    projectDialog.showModal();
})
projectCloseBtn.addEventListener('click',()=>{
    projectDialog.close();
})

todoForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    myTodos.push(logToDo());
    updateStorage();
})

projectForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    myProjects.push(logProject());
    updateStorage();
})

const todoMaker = () => {
    return {
        name: '',
        details: '',
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
        details: '',
        toDoArray: [],
    }
}

function logToDo(){
    let newTodo = todoMaker();
    console.log(todoName.value);
    newTodo.name = todoName.value;
    newTodo.details = todoDetails.value;
    let date = todoDate.value.split('-');
    newTodo.day = date[2];
    newTodo.month = date[1];
    newTodo.year = date[0];
    newTodo.priority = todoPrio.value;
    return newTodo;
}

function logProject(){
    let newProject = projectMaker();
    newProject.title = projectName.value;
    newProject.details = projectDetails.value;
    return newProject;
}

function checkStorage(){
    
    if (localStorage.getItem("myTodos")){
        myTodos = JSON.parse(localStorage.getItem("myTodos"));
        console.log(JSON.parse(localStorage.getItem("myTodos")));
    }
    if (localStorage.getItem("myProjects")) {
        myProjects = JSON.parse(localStorage.getItem("myProjects"));
        console.log(JSON.parse(localStorage.getItem("myProjects")));
      } 
}

function updateStorage(){
    localStorage.setItem("myProjects", JSON.stringify(myProjects));
    localStorage.setItem("myTodos", JSON.stringify(myTodos));

    console.log(JSON.parse(localStorage.getItem("myTodos")));
    console.log(JSON.parse(localStorage.getItem("myProjects")));
}