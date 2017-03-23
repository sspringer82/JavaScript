import { Task } from './task';

export class Store {
    constructor() {
        this.id = 0;
        this.tasks = [];
    }

    loadAll() {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let task = JSON.parse(localStorage.getItem(key));
            if (this.id < task.id) {
                this.id = task.id;
            }
            this.tasks.push(new Task(
                task.id,
                task.date,
                task.from,
                task.until,
                task.task
            ));
        }
        this.id++;
    }

    getNextId() {
        let id = this.id;
        this.id++;
        return id;
    }

    create(task) {
        task.id = this.getNextId();
        localStorage.setItem(task.id, JSON.stringify(task));
        this.tasks.push(task);
    }
}