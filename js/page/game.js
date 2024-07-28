import { Config } from '../components/config.js';
import { Direction } from '../components/position.js';
import { ElementConnect } from '../components/element-connect.js';


const tickInterval = Config.tickInterval;
const elementConnect = new ElementConnect();


document.addEventListener('DOMContentLoaded', () => {
    const stageElement = document.querySelector('.js-game__stage');
    const display = () => {
        const stage = [
            elementConnect.tick,
            elementConnect.state,
            '<br>',
            '---------------------',
            elementConnect.board.board.map(
                row => row.map(x => x !== null ? x : '　').join('　')
            ).join('<br>'),
            '---------------------',
        ];
        stageElement.innerHTML = stage.join('<br>');
    };
    display();

    let previousTimestamp = null;
    const tick = (timestamp) => {
        if (previousTimestamp === null) {
            previousTimestamp = timestamp;
        }
        const elapsed = timestamp - previousTimestamp;

        const intervals = Math.floor(elapsed / tickInterval);
        for (let i = 0; i < intervals; i++) {
            elementConnect.step();
            display();
        }
        previousTimestamp += intervals * tickInterval;
        requestAnimationFrame(tick);
    }

    const startButton = document.querySelector('.js-game__start-button');
    startButton.addEventListener('click', () => {
        const timestamp = performance.now();
        tick(timestamp);
    });
    const rotateRightButton = document.querySelector('.js-game__rotate-right-button');
    rotateRightButton.addEventListener('click', () => {
        elementConnect.rotate(true);
        display();
    });
    const rotateLeftButton = document.querySelector('.js-game__rotate-left-button');
    rotateLeftButton.addEventListener('click', () => {
        elementConnect.rotate(false);
        display();
    });
    const moveRightButton = document.querySelector('.js-game__move-right-button');
    moveRightButton.addEventListener('click', () => {
        elementConnect.move(Direction.RIGHT);
        display();
    });
    const moveLeftButton = document.querySelector('.js-game__move-left-button');
    moveLeftButton.addEventListener('click', () => {
        elementConnect.move(Direction.LEFT);
        display();
    });
    const moveDownButton = document.querySelector('.js-game__move-down-button');
    moveDownButton.addEventListener('click', () => {
        elementConnect.moveDown();
        display();
    });

    const stepButton = document.querySelector('.js-game__step-button');
    stepButton.addEventListener('click', () => {
        elementConnect.step();
        display()
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'a') {
            elementConnect.move(Direction.LEFT);
        } else if (event.key === 'd') {
            elementConnect.move(Direction.RIGHT);
        } else if (event.key ==='s') {
            elementConnect.moveDown();
        } else if (event.key === ' ') {
            if (event.shiftKey) {
                elementConnect.rotate(false);
            } else {
                elementConnect.rotate(true);
            }
        }
        display();
    });
});
