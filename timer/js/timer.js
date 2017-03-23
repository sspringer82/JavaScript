import { Task } from './task';
import { Store } from './store';

export class Timer {
    constructor() {
        this.list = $('#list');
    }

    init() {
        this.store = new Store();

        this.bindEvents();

        this.store.loadAll();
        this.render();
    }

    bindEvents() {
        $('#submit').on('click', () => {
            this.create();
        });
    }

    create() {
        let task = new Task(
            null,
            $('#date').val(),
            $('#from').val(),
            $('#until').val(),
            $('#task').val()
        );
        this.store.create(task);
        $('#form input').each((i, e) => {
            $(e).val('');
        });
        this.render();
    }

    render() {
        this.list.empty();
        this.store.tasks.forEach((task) => {
            task.render(this.list);
            this.list.append($('<hr>'));
        });
    }

}