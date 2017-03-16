$(function () {
    let prevTime = 0;
    let stop = false;
    let speed = 16;
    let key;

    const level = [
        1,
        2,
        5,
        10
    ];

    const field = {
        height: 400,
        width: 400
    };
    const player = {
        level: 1,
        x: 0,
        y: 0,
        height: 10,
        width: 10
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
});
