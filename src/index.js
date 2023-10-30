import './style.css';

const content = document.querySelector("#content");

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

//Project div

const projectTab = document.createElement("div");
projectTab.setAttribute("id","projects");
const listProjects = document.createElement("ul");
listProjects.setAttribute("id","projectList");
const allListItem = document.createElement("li")
allListItem.setAttribute("id","all");
allListItem.setAttribute("class","active");
allListItem.textContent="All items";
listProjects.appendChild(allListItem);
projectTab.appendChild(listProjects);
content.appendChild(projectTab);

//Todos div

const elementsDiv = document.createElement("div");
elementsDiv.setAttribute("id","elementsDiv");
const todoTable = document.createElement("table");
todoTable.setAttribute("class","todoTable");
const firstRow = document.createElement("tr");
firstRow.insertAdjacentHTML('afterbegin',`
<th>Title</th>
<th>Details</th>
<th>Due Date</th>
<th>Complete</th>
<th>Priority</th>
<th>Delete</th>`);
const todoList = document.createElement("tbody");
todoList.setAttribute("id","todoList");
todoTable.appendChild(firstRow);
todoTable.appendChild(todoList);
elementsDiv.appendChild(todoTable);
content.appendChild(projectTab);


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

function generateTable() {
    // creates a <table> element and a <tbody> element
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    

    checkStorage();
    // creating all cells
    for (let i = 0; i < myTodos.length+1; i++) {
      // creates a table row
      const row = document.createElement("tr");
  
      for (let j = 0; j < 2; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        const cell = document.createElement("td");
        let textToInsert = '';
        if(i==0){
            switch(j){
                case 0:
            }
        }
        const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
  
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
  }
  