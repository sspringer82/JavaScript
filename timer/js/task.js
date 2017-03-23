export class Task {
    constructor(id, date, from, until, task) {
        this.id = id;
        this.date = date;
        this.from = from;
        this.until = until;
        this.task = task;
    }

    render(target) {
        let div = $('<div>')
            .addClass('row')
            .append($('<div>').text(this.id))
            .append($('<div>').text(this.date))
            .append($('<div>').text(this.from))
            .append($('<div>').text(this.until))
            .append($('<div>').text(this.task))

        target.append(div);
    }
}