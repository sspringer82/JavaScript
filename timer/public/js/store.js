import { Task } from './task';

export class Store {
    constructor() {
        this.id = 0;
        this.tasks = [];
    }

    loadAll() {
        return new Promise((resolve, reject) => {
            $.get('/timer').done((tasks) => {
                tasks.forEach((task) => {
                    this.tasks.push(new Task(
                        task.id,
                        task.date,
                        task.from,
                        task.until,
                        task.task
                    ));
                });
                resolve();
            });
        });
    }

    /*getNextId() {
        let id = this.id;
        this.id++;
        return id;
    }*/

    save(task) {
        return new Promise((resolve, reject) => {
            if (task.id === '') {
                $.ajax({
                    url: 'timer',
                    method: 'post',
                    data: task
                }).done((data) => {
                    task.id = data.id;
                    this.tasks.push(task);
                    resolve();
                });
            } else {
                $.ajax({
                    url: 'timer',
                    method: 'put',
                    data: task
                }).done(() => {
                    this.tasks[this.getIndexOfTask(task.id)] = task;
                    resolve();
                });
            }
        });
    }

    getIndexOfTask(id) {
        return this.tasks.findIndex(task => task.id === id);
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/timer/' + id,
                method: 'delete'
            }).done(() => {
                const index = this.getIndexOfTask(id);
                this.tasks.splice(index, 1);
                resolve();
            });
        })
    }
}