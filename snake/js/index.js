$(function () {
    let prevTime = 0;
    let stop = false;
    let speed = 16;
    let key;

    let item = {
        x: null,
        y: null,
        element: null,
        appearance: {
            probability: 200,
            duration: 5000,
            timeout: null
        },
        getPosition(fieldMeasure) {
            return Math.floor(Math.random() * fieldMeasure / 10) * 10
        },
        draw() {
            this.x = this.getPosition(field.width);
            this.y = this.getPosition(field.height);

            this.element = $('<div>')
                .addClass('item')
                .css('left', item.x)
                .css('top', item.y);

            container.append(this.element);

            this.appearance.timeout = setTimeout(this.remove.bind(this), this.appearance.duration);
        },
        remove() {
            this.x = null;
            this.y = null;
            this.element.remove();
            clearTimeout(this.appearance.timeout);
        },
        willAppear() {
            return Math.floor(Math.random() * this.appearance.probability) % this.appearance.probability === 0;
        }
    };

    const level = [
        0.5,
        0.625,
        1,
        1,25,
        2,
        2.5,
        5,
        10
    ];

    const field = {
        height: 400,
        width: 400
    };
    const player = {
        level: 2,
        x: 0,
        y: 0,
        height: 10,
        width: 10,
        points: 0,
        increaseSpeed() {
            if (this.points > 0 && this.points % 100 === 0) {
                this.level++;
            }
        }
    };
    const movement = {
        x: 0,
        y: 0,
        reset() {
            this.x = 0;
            this.y = 0;
        }
    };

    const container = $('.container')
        .css('height', field.height)
        .css('width', field.width);

    const playerEl = $('<div>')
        .addClass('player')
        .css('height', player.height)
        .css('width', player.width);

    container.append(playerEl);

    function changeDirection() {
        movement.reset()
        switch(key) {
            case 'ArrowRight':
                movement.x = 1;
                break;
            case 'ArrowLeft':
                movement.x = -1;
                break;
            case 'ArrowDown':
                movement.y = 1;
                break;
            case 'ArrowUp':
                movement.y = -1;
                break;
            case 'Space':
                stop = true;
                break;
        }
    }

    $(document).on('keyup', function (event) {
        key = event.key;
    });

    function loop(time) {

        itemAppears();
        eat();

        let delta = time - prevTime;
        if (delta >= speed) {
            if (player.x % player.width === 0 && player.y % player.height === 0) {
                changeDirection();
            }
            prevTime = time;
            move();
        }
        if (!stop) {
            requestAnimationFrame(loop);
        }
    }

    function eat() {
        if (item.x === player.x && item.y === player.y) {
            item.remove();
            player.points += 10;
            showPoints();
            player.increaseSpeed();
        }
    }

    function showPoints() {
        $('.points').text('Points: ' + player.points);
    }

    function itemAppears() {
        if (item.x === null && item.willAppear()) {
            
            item.draw();
        }
    }

    function move() {
        if (movement.x !== 0) {
            let v = player.x + movement.x * level[player.level];
            if (v >= 0 && v <= field.width - player.width) {
                playerEl.css('left', v);
                player.x = v;
            }
        } else if (movement.y !== 0) {
            let v = player.y + movement.y * level[player.level];
            if (v >= 0 && v <= field.height - player.height) {
                playerEl.css('top', v);
                player.y = v;
            }
        }
    }

    requestAnimationFrame(loop);
    showPoints();
});
