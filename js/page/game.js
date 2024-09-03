import { ElementConnect } from '../components/element-connect.js';
import { HtmlRenderer } from '../renderer/html-renderer.js';

document.addEventListener('DOMContentLoaded', () => {
    const seed = getSeed();
    const elementConnect = new ElementConnect(seed);
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

/**
 * クエリパラメータ「seed」が数値であればそれを、それ以外の場合は Date.now() の値を返す。
 * @returns {number} シード値
 */
const getSeed = () => {
    const params = new URLSearchParams(window.location.search);
    const seed = parseInt(params.get('seed'));
    if (isNaN(seed)) {
        return Date.now()
    }
    return seed;
};
