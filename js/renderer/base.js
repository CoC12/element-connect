import { Config } from '../components/config.js';
import { ElementConnect } from '../components/element-connect.js';


export class BaseRenderer {

    /**
     * コンストラクタ
     * @param {ElementConnect} elementConnect ElementConnect オブジェクト
     */
    constructor(elementConnect) {
        this.elementConnect = elementConnect;
        this.tickInterval = Config.tickInterval;
        this.timestamp = null;
    }

    /**
     * ゲームを開始する。
     */
    start() {
        const timestamp = performance.now();
        this.timestamp = timestamp;
        this.tick(timestamp);
    }

    /**
     * ゲームを停止する。
     */
    stop() {
        this.timestamp = null;
    }

    /**
     * ゲームを進める。
     * @param {DOMHighResTimeStamp} timestamp 現在のタイムスタンプ
     */
    tick(timestamp) {
        if (this.timestamp === null) {
            return;
        }
        const elapsed = timestamp - this.timestamp;
        const intervals = Math.floor(elapsed / this.tickInterval);
        for (let i = 0; i < intervals; i++) {
            this.elementConnect.step();
            this.render();
        }
        this.timestamp += intervals * this.tickInterval;
        requestAnimationFrame(this.tick.bind(this));
    }

    /**
     * ゲームを描画する。
     */
    render() {
        throw new Error('Not implemented');
    }
}
