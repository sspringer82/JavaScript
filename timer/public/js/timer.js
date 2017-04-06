import { Task } from './task';
import { Store } from './store';

export class Timer {
    constructor() {
        this.list = $('#list');
    }

    init() {
        this.store = new Store();

        this.bindEvents();

        this.store.loadAll().then(() => {
            this.render();
        });
    }

    bindEvents() {
        $(document).on('click', (event) => {
            const target = $(event.target);
            const type = target.data('type');
            const id = target.data('id');
            switch(type) {
                case 'save':
                    this.save();
                    break;
                case 'edit':
                    this.edit(id);
                    break;
                case 'remove':
                    this.remove(id);
                    break;
            }
        });
    }

    remove(id) {
        this.store.remove(id).then(() => {
            this.render();
        });
    }

    save() {
        let task = new Task(
            $('#id').val(),
            $('#date').val(),
            $('#from').val(),
            $('#until').val(),
            $('#task').val()
        );
        this.store.save(task).then(() => {
            $('#form input').each((i, e) => {
                $(e).val('');
            });
            this.render();
        });
    }

    edit(id) {
        const task = this.store.tasks.find((task) => {
            return task.id === id;
        });
        $('#id').val(task.id);
        $('#date').val(task.date);
        $('#from').val(task.from);
        $('#until').val(task.until);
        $('#task').val(task.task);
    }

    render() {
        this.list.empty();
        this.store.tasks.forEach((task) => {
            task.render(this.list);
            this.list.append($('<hr>'));
        });
    }

}