$(function () {
    let prevTime = 0;
    let stop = false;
    let stopKey = false;
    let speed = 16;
    let key;

    let item = {
        x: null,
        y: null,
        element: null,
        appearance: {
            probability: 200,
            duration: 10000, // 5000
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
        level: 3,
        items: [],
        growPoints: 100,
        grow() {
            if (this.points > 0 && this.points % this.growPoints === 0) {
              this.addElement(lastPosition.x, lastPosition.y, this.items[this.items.length - 1]);
            }
        },
        addElement(x, y, prev = null) {
            const id = player.items.length;
            const el = $('<div>')
                .addClass('player')
                .attr('id', id)
                .css('height', player.height)
                .css('width', player.width)
                .css('left', x)
                .css('top', y);

            container.append(el);
            player.items.push({
                id,
                x,
                y,
                el,
                prev,
                movement: {
                    x: 0,
                    y: 0,
                    setX(val) {
                        this.reset();
                        this.x = val;
                    },
                    setY(val) {
                        this.reset();
                        this.y = val;
                    },
                    reset() {
                        this.x = 0;
                        this.y = 0;
                    }
                }
            });
        },
        height: 10,
        width: 10,
        points: 0,
        increaseSpeed() {
            if (this.points > 0 && this.points % 100 === 0) {
                this.level++;
            }
        }
    };

    const container = $('.container')
        .css('height', field.height)
        .css('width', field.width);

    function changeDirection() {
        for (let i = player.items.length - 1; i > 0; i--) {
            player.items[i].movement = Object.assign({}, player.items[i-1].movement);
        }
        const movement = player.items[0].movement;
        switch(key) {
            case 'ArrowRight':
                movement.setX(1);
                break;
            case 'ArrowLeft':
                movement.setX(-1);
                break;
            case 'ArrowDown':
                movement.setY(1);
                break;
            case 'ArrowUp':
                movement.setY(-1);
                break;
            case 'Space':
                stopKey = !stopKey;
                console.log(stopKey);
                break;
        }
        const lastPlayerItem = player.items[player.items.length - 1];
        lastPosition = {
            x: lastPlayerItem.x,
            y: lastPlayerItem.y
        }
    }

    $(document).on('keyup', function (event) {
        key = event.key;
    });

    function loop(time) {

        itemAppears();

        let delta = time - prevTime;
        if (delta >= speed) {
            move();
            if (player.items[0].x % player.width === 0 && player.items[0].y % player.height === 0) {
                stop = stopKey;
                changeDirection();
            }
            prevTime = time;

        }

        eat();

        if (!stop) {
            requestAnimationFrame(loop);
        }
    }

    function eat() {
        const head = player.items[0];
        if (item.x === head.x && item.y === head.y) {
            item.remove();
            player.points += 10;
            showPoints();
            player.grow();
            //player.increaseSpeed();
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
        let hitTheWall = false;
        player.items.forEach(function (playerItem, index) {
            if (hitTheWall) {
                return;
            }
            const movement = playerItem.movement;
            if (movement.x !== 0) {
                let v = playerItem.x + movement.x * level[player.level];
                if (v >= 0 && v <= field.width - player.width) {
                    playerItem.el.css('left', v);
                    playerItem.x = v;
                } else {
                    hitTheWall = true;
                }
            } else if (movement.y !== 0) {
                let v = playerItem.y + movement.y * level[player.level];
                if (v >= 0 && v <= field.height - player.height) {
                    playerItem.el.css('top', v);
                    playerItem.y = v;
                } else {
                    hitTheWall = true;
                }
            }
        });
    }

    player.addElement(0, 0);

    requestAnimationFrame(loop);
    showPoints();
});
