import './style.css';

const element = document.createElement("div");
element.innerHTML="<h1>Hello!</h1>";
document.body.appendChild(element);

const priorityLevels = ['LOW','MEDIUM','HIGH'];

const todoMaker = () => {
    return {
        title: '',
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