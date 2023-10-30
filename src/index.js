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
content.appendChild(elementsDiv);


let myTodos = [];
let myProjects = [];

todoAddBtn.addEventListener('click', ()=>{
    todoDialog.showModal();
})
/*todoCloseBtn.addEventListener('click',()=>{
    todoDialog.close();
})*/

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
    checkStorage();
    elementsDiv.innerHTML=generateTable(myTodos);
    clearForm();
    todoDialog.close();
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

/*
function generateTable() {
    // creates a <table> element and a <tbody> element
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    

    checkStorage();
    // creating all cells
    for (let i = 0; i < myTodos.length+1; i++) {
      // creates a table row
      const row = document.createElement("tr");
  
      for (let j = 0; j <= 5; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        const cell = document.createElement("td");
        let textToInsert = '';
        if(i==0){
            switch(j){
                case 0:textToInsert="Item";
                break;
                case 1:textToInsert="Details";
                break;
                case 2:textToInsert="Due Date";
                break;
                case 3:textToInsert="Priority";
                break;
                case 4:textToInsert="Completion";
                break;
                case 5:textToInsert="Delete";
                break;
            }
        } else {
            switch(j){
                case 0:textToInsert=myTodos[i-1].name;
                break;
                case 1:textToInsert=myTodos[i-1].details;
                break;
                case 2:textToInsert=myTodos[i-1].day+"/"+myTodos[i-1].month+"/"+myTodos[i-1].year;
                break;
                case 3:textToInsert=myTodos[i-1].priority;
                break;
                case 4:textToInsert=myTodos[i-1].complete;
                break;
                case 5:textToInsert="Delete";
            }
        }
        const cellText = document.createTextNode(textToInsert);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
  
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    content.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
  }
  */
  
  function generateTable(data) {  
    let table = '<table>';  
    table += '<tr><th>Name</th><th>Details</th><th>Due Date</th><th>Priority</th></tr>';  
    data.forEach(item => {  
    table += `<tr><td>${item.name}</td><td>${item.details}</td><td>${item.day}/${item.month}/${item.year}</td>
    <td>${item.priority}</td><td><${item.complete}</td><td><button>Delete</button></td></tr>`;  
    });  
    table += '</table>';  
    return table;  
    }  

  function clearForm(){
    todoName.value="";
    todoDetails.value="";
    todoDate.value="";
    todoPrio.value="";
  }