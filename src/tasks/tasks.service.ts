import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {

    private tasks = [
        {id : 1, title : "Learn nest js", description : "complete phase 2", priority : "high", status: "pending"},
        {id : 2, title : "Learn next js", description : "complete phase 1", priority : "med", status: "completed"},
        {id : 3, title : "Learn react", description : "complete phase 3", priority : "high", status: "completed"},
        {id : 4, title : "Learn js", description : "complete phase 4", priority : "med", status: "completed"},
        {id : 5, title : "Learn python", description : "complete phase 6", priority : "low", status: "pending"}
    ];

    findAll(status ?: string, search ?: string) {
        let result = this.tasks;

        if(status){
            result = result.filter(task => task.status === status);
        }

        if (search){
            const lowerSearch = search.toLowerCase();
            result = result.filter(task => task.title.toLowerCase().includes(lowerSearch) || task.description.toLocaleLowerCase().includes(lowerSearch));
        }
        return result;
    }

    findOne(id : number){
        return this.tasks.find(task => task.id === id);
    }

    create(taskData : {title : string; description : string; priority : string; status : string}){
        const newTask = {
            id : this.tasks.length +1,
            ...taskData
        }

        this.tasks.push(newTask);
        return newTask;
    }
}
