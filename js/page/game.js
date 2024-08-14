import { ElementConnect } from '../components/element-connect.js';
import { HtmlRenderer } from '../renderer/html-renderer.js';

document.addEventListener('DOMContentLoaded', () => {
    const elementConnect = new ElementConnect();
    const htmlRenderer = new HtmlRenderer(elementConnect);
    htmlRenderer.render()

    const startButton = document.querySelector('.js-game__start-button');
    startButton.addEventListener('click', () => {
        htmlRenderer.start();
    });
    const stopButton = document.querySelector('.js-game__stop-button');
    stopButton.addEventListener('click', () => {
        htmlRenderer.stop();
    });
});
