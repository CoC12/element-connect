import { Position } from '../components/position.js';
import { Element, Pattern } from '../components/element.js';


/**
 * 盤面を管理するクラス
 */
export class Board {

    /**
     * コンストラクタ
     * @param {number} cols 列数
     * @param {number} rows 行数
     */
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.board = Board.createBoard(cols, rows);
    }

    /**
     * Element オブジェクトを盤面に設置する。
     * @param {Position} position Position オブジェクト
     * @param {Element | null} element Element オブジェクト
    */
    setElement(position, element) {
        this.board[position.y][position.x] = element;
    }

    /**
     * Element オブジェクトを取得する。
     * @param {Position} position Position オブジェクト
     * @returns {Element | null} Element オブジェクト
     */
    getElement(position) {
        return this.board[position.y][position.x];
    }

    /**
     * Element オブジェクトを移動する。
     * @param {Position} fromPosition 移動元の Position オブジェクト
     * @param {Position} toPosition 移動先の Position オブジェクト
     */
    moveElement(fromPosition, toPosition) {
        const element = this.getElement(fromPosition);
        this.setElement(fromPosition, null);
        this.setElement(toPosition, element);
    }

    /**
     * 盤面上の Element オブジェクトを最下部に詰めて移動する。
     * @returns {Object<Position, Position>} { 移動元の Position オブジェクト: 移動先の Position オブジェクト } 形式
     */
    shiftDown() {
        const result = {};
        for (let x = 0; x < this.cols; x++) {
            for (let y = this.rows - 1; y >= 0; y--) {
                const position = new Position(x, y);
                if (this.isEmpty(position)) {
                    continue;
                }

                let newPosition = position;
                for (let y = 0; y < this.rows - position.y; y++) {
                    newPosition = newPosition.down;
                    const isValidMove = this.isValidMove(newPosition);
                    if (!isValidMove) {
                        break;
                    }
                }
                this.moveElement(position, newPosition.up);
                result[position] = newPosition;
            }
        }
        return result;
    }

    /**
     * 指定した位置が空かどうかを返す。
     * @param {Position} position Position オブジェクト
     * @returns {boolean} 空かどうか
     */
    isEmpty(position) {
        return this.getElement(position) === null;
    }

    /**
     * 指定した位置が盤面内かどうかを返す。
     * @param {Position} position Position オブジェクト
     * @returns {boolean} 盤面内かどうか
     */
    isInside(position) {
        return (
            (0 <= position.x && position.x < this.cols)
            && (0 <= position.y && position.y < this.rows)
        );
    }

    /**
     * 盤面の指定した位置がパターンに一致する場合、盤面から取り除く。
     * @param {number} x 起点となる x 座標
     * @param {number} y 起点となる y 座標
     * @param {Pattern} pattern 判定する Pattern オブジェクト
     * @returns {boolean} パターンに一致し、盤面から取り除かれた場合、true
     */
    removePattern(x, y, pattern) {
        const substancePositions = [];
        for (let i = 0; i < pattern.rows; i++) {
            for (let j = 0; j < pattern.cols; j++) {
                const patternElement = pattern.pattern[i][j];
                if (patternElement === null) {
                    continue;
                }
                const position = new Position(x + j, y + i);
                const boardElement = this.getElement(position);
                if (patternElement !== boardElement) {
                    return false;
                }
                substancePositions.push(position);
            }
        }
        substancePositions.forEach((position) => {
            this.setElement(position, null);
        });
        return true;
    }

    /**
     * 指定した位置への移動が可能かを返す。
     * @param {Position} position Position オブジェクト
     * @returns {boolean} 移動可能かどうか
     */
    isValidMove(position) {
        return this.isInside(position) && this.isEmpty(position);
    }

    /**
     * 盤面を生成する。
     * @returns {Array<Array<Element | null>>} 盤面
     */
    static createBoard(cols, rows) {
        const board = Array.from({length: rows}, () => Array(cols).fill(null));
        return board;
    }
}
