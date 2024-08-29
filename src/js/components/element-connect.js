import { Config } from '../components/config.js';
import { Element, elementKeys, substances } from '../components/element.js';
import { Direction, Position, isHorizontal } from '../components/position.js';
import { Board } from '../components/board.js';


const State = Object.freeze({
    FALLING_BEFORE: 'FALLING_BEFORE',
    FALLING: 'FALLING',
    CONNECT: 'CONNECT',
    SHIFT_DOWN: 'SHIFT_DOWN',
    GAME_OVER: 'GAME_OVER',
});


/**
 * ElementConnect の挙動を管理するクラス
 */
export class ElementConnect {

    /**
     * コンストラクタ
     */
    constructor() {
        this.stageCols = Config.stageCols;
        this.stageRows = Config.stageRows + Config.additionalRows;
        this.board = new Board(this.stageCols, this.stageRows);
        this.fallingElements = new FallingElements();
        this._connectedElement = [];

        this.state = State.FALLING_BEFORE;
        this.tick = 0;

        this._score = 0.0;
    }

    /**
     * ゲームを 1チック 進める。
     */
    step() {
        this.tick++;

        if (this.state === State.FALLING_BEFORE) {
            this.#onFallingBefore();
        } else if (this.state === State.FALLING) {
            this.#onFalling();
        } else if (this.state === State.CONNECT) {
            this.#onConnect();
        } else if (this.state === State.SHIFT_DOWN) {
            this.#onShiftDown();
        }
    }

    /**
     * 落下中の Element をに回転させる。
     * @param {boolean} isClockwise 回転方向が時計回りかどうか
     */
    rotate(isClockwise) {
        if (!this.#isAllowedMove) {
            return;
        }

        let [targetPosition, basePosition] = this.fallingElements.positions;
        if (
            !isClockwise
            && isHorizontal(targetPosition, basePosition)
        ) {
            [targetPosition, basePosition] = [basePosition, targetPosition];
        }
        const newPosition = targetPosition.getRotatedPosition(basePosition, isClockwise);
        const isValidMove = this.board.isValidMove(newPosition);
        if (!isValidMove) {
            return;
        }
        this.board.moveElement(targetPosition, newPosition);
        this.fallingElements.add(basePosition, newPosition);
        this.fallingElements.apply();
    }

    /**
     * 落下中の Element を移動させる。
     * @param {Direction} direction 移動方向を表す Direction オブジェクト
     */
    move(direction) {
        if (!this.#isAllowedMove) {
            return;
        }

        let [firstPosition, secondPosition] = this.fallingElements.positions;
        if (direction === Direction.LEFT) {
            [firstPosition, secondPosition] = [secondPosition, firstPosition];
        }
        const newFirstPosition = firstPosition.getRelativePosition(direction);
        const newSecondPosition = secondPosition.getRelativePosition(direction);
        const isValidMove = this.board.isValidMove(newFirstPosition);
        if (!isValidMove) {
            return;
        }
        this.board.moveElement(firstPosition, newFirstPosition);
        this.board.moveElement(secondPosition, newSecondPosition);
        this.fallingElements.add(newFirstPosition, newSecondPosition);
        this.fallingElements.apply();
    }

    /**
     * 落下中の Element を最下部まで落下させる。
     */
    moveDown() {
        if (this.fallingElements.length === 0) {
            return;
        }

        const positionMapping = this.board.shiftDown();
        this.fallingElements.forEach((position) => {
            const newPosition = positionMapping[position];
            if (!newPosition) {
                return;
            }
            this._score += (newPosition.y - position.y) * Config.scorePerMoveDown;
        });

        this.fallingElements.clear();
        this.state = State.CONNECT;
    }

    /**
     * 作成された分子の情報を返し、クリアする。
     * @returns {Array<object>} 作成された分子の情報
     */
    popConnectedElements() {
        const connectedElements = this._connectedElement;
        this._connectedElement = [];
        return connectedElements;
    }

    /**
     * State.FALLING_BEFORE のイベントハンドラ
     */
    #onFallingBefore() {
        if (this.#isGameOver) {
            this.state = State.GAME_OVER;
            return;
        }
        const nextElementPositions = Config.nextElementPositions;
        nextElementPositions.forEach((position) => {
            const element = ElementConnect.#choiceElement();
            this.board.setElement(position, element);
            this.fallingElements.add(position);
        });
        this.fallingElements.apply();
        this.state = State.FALLING;
    }

    /**
     * State.FALLING のイベントハンドラ
     */
    #onFalling() {
        this._score += Config.scorePerTick;

        this.fallingElements.forEach((position) => {
            const newPosition = position.down;
            const isValidMove = this.board.isValidMove(newPosition);
            if (isValidMove) {
                this.board.moveElement(position, newPosition);
                this.fallingElements.add(newPosition);
            }
        });
        this.fallingElements.apply();
        if (this.fallingElements.length === 0) {
            this.state = State.CONNECT;
        }
    }

    /**
     * State.CONNECT のイベントハンドラ
     */
    #onConnect() {
        let isConnected = false;
        substances.forEach((substance) => {
            substance.patterns.forEach((pattern) => {
                for (let y = 0; y < this.stageRows - pattern.rows + 1; y++) {
                    for (let x = 0; x < this.stageCols - pattern.cols + 1; x++) {
                        const isRemoved = this.board.removePattern(x, y, pattern);
                        if (!isRemoved) {
                            continue;
                        }
                        isConnected = true;
                        this._score += substance.score;
                        this._connectedElement.push(substance);
                    }
                }
            });
        });
        if (isConnected) {
            this.state = State.SHIFT_DOWN;
        } else {
            this.state = State.FALLING_BEFORE;
        }
    }

    /**
     * State.SHIFT_DOWN のイベントハンドラ
     */
    #onShiftDown() {
        this.board.shiftDown();
        this.state = State.CONNECT;
    }

    /**
     * 現在のスコアを返す。
     */
    get score() {
        return Math.floor(this._score);
    }

    /**
     * 移動が許可されているかを返す。
     * @returns {boolean} 移動が許可されているか
     */
    get #isAllowedMove() {
        if (this.state !== State.FALLING) {
            return false;
        }
        if (this.fallingElements.length !== 2) {
            return false;
        }
        return true;
    }

    /**
     * ゲームが終了しているかを返す。
     * @returns {boolean} ゲームが終了しているか
     */
    get #isGameOver() {
        for (let y = 0; y < Config.additionalRows; y++) {
            for (let x = 0; x < this.stageCols; x++) {
                if (!this.board.isEmpty(new Position(x, y))) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Element オブジェクトをランダムに1つ返す。
     * @returns {Element} Element オブジェクト
     */
    static #choiceElement() {
        const index = Math.floor(Math.random() * elementKeys.length);
        const key = elementKeys[index];
        return Element[key];
    }
}



/**
 * 落下中の Element オブジェクトを管理する。
 */
class FallingElements {

    /**
     * コンストラクタ
     */
    constructor() {
        this.positions = [];
        this._draftPositions = [];
    }

    /**
     * 落下中の Element オブジェクトの長さを返す。
     * @returns {number} 落下中の Element オブジェクトの長さ
     */
    get length() {
        return this.positions.length;
    }

    /**
     * Position オブジェクトを、下書きとして落下中の Element オブジェクトに追加する。
     * @param  {...Position} positions 追加する Position オブジェクト
     */
    add(...positions) {
        this._draftPositions.push(...positions);
    }

    /**
     * 下書きとして追加された落下中の Element オブジェクトを反映する。
     */
    apply() {
        this.positions = this._draftPositions.sort((a, b) => {
            return b.index - a.index;
        });
        this._draftPositions = [];
    }

    /**
     * 落下中の Element オブジェクトをクリアする。
     */
    clear() {
        this.positions = [];
        this._draftPositions = [];
    }

    /**
     * 落下中の Element オブジェクト全てに callback 関数を実行する。
     * @param {Function} callback 実行するコールバック関数
     */
    forEach(callback) {
        this.positions.forEach(callback);
    }
}
