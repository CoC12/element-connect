import { Config } from '../components/config.js';


/**
 * 方向に関する定数
 */
export const Direction = Object.freeze({
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
    UP: 'UP',
    DOWN: 'DOWN',
});


/**
 * X座標, Y座標を保持するクラス
 */
export class Position {

    /**
     * コンストラクタ
     * @param {number} x X座標
     * @param {number} y Y座標
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * 右の座標の Position オブジェクトを返す。
     * @returns {Position} 右の座標の Position オブジェクト
     */
    get right() {
        return new Position(this.x + 1, this.y);
    }

    /**
     * 左の座標の Position オブジェクトを返す。
     * @returns {Position} 左の座標の Position オブジェクト
     */
    get left() {
        return new Position(this.x - 1, this.y);
    }

    /**
     * 上の座標の Position オブジェクトを返す。
     * @returns {Position} 上の座標の Position オブジェクト
     */
    get up() {
        return new Position(this.x, this.y - 1);
    }

    /**
     * 下の座標の Position オブジェクトを返す。
     * @returns {Position} 下の座標の Position オブジェクト
     */
    get down() {
        return new Position(this.x, this.y + 1);
    }

    /**
     * 自身から見た direction 方向の Position オブジェクトを返す。
     * @param {Direction} direction Direction オブジェクト
     * @returns 自身から見た direction 方向の Position オブジェクト
     */
    getRelativePosition(direction) {
        if (direction === Direction.RIGHT) {
            return this.right;
        }
        if (direction === Direction.LEFT) {
            return this.left;
        }
        if (direction === Direction.UP) {
            return this.up;
        }
        if (direction === Direction.DOWN) {
            return this.down;
        }
        throw new Error(`Invalid direction: ${direction}`);
    }

    /**
     * 指定した Position オブジェクトを基準として、自身を回転させた Position オブジェクトを返す。
     * @param {Position} basePosition 基準となる Position オブジェクト
     * @param {boolean} isClockwise 時計回りかどうか
     * @returns {Position} 回転結果 Position オブジェクト
     */
    getRotatedPosition(basePosition, isClockwise) {
        const dx = basePosition.x - this.x;
        const dy = basePosition.y - this.y;

        let rotatedX = -dy;
        let rotatedY = dx;
        if (isClockwise) {
            rotatedX = dy;
            rotatedY = -dx;
        }
        return new Position(rotatedX + basePosition.x, rotatedY + basePosition.y);
    }

    get index() {
        return this.y * Config.stageCols + this.x;
    }
}


/**
 * 2つの Position オブジェクトが垂直かどうかを返す。
 * @param {Position} position1 1つめの Position オブジェクト
 * @param {Position} position2  2つめの Position オブジェクト
 * @returns {boolean} 垂直かどうか
 */
export const isVertical = (position1, position2) => {
    return position1.x === position2.x;
}


/**
 * 2つの Position オブジェクトが水平かどうかを返す。
 * @param {Position} position1 1つめの Position オブジェクト
 * @param {Position} position2  2つめの Position オブジェクト
 * @returns {boolean} 水平かどうか
 */
export const isHorizontal = (position1, position2) => {
    return position1.y === position2.y;
}
