const priorityLevels = ['LOW','MEDIUM','HIGH'];

const todoMaker = () => {
    return {
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