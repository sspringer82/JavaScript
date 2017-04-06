export class Task {
    constructor(id, date, from, until, task) {
        this.id = id;
        this.date = date;
        this.from = from;
        this.until = until;
        this.task = task;
    }

    render(target) {
        const removeButton = $('<button>')
            .text('remove')
            .data('id', this.id)
            .data('type', 'remove');
        const editButton = $('<button>')
            .text('edit')
            .data('id', this.id)
            .data('type', 'edit');

        let div = $('<div>')
            .addClass('row')
            .append($('<div>').text(this.id))
            .append($('<div>').text(this.date))
            .append($('<div>').text(this.from))
            .append($('<div>').text(this.until))
            .append($('<div>').text(this.task))
            .append(removeButton)
            .append(editButton);

        target.append(div);
    }
}