import { Config } from '../components/config.js';
import { Element } from '../components/element.js';
import { Direction } from '../components/position.js';
import { BaseRenderer } from '../renderer/base.js';


export class HtmlRenderer extends BaseRenderer {

    /**
     * コンストラクタ
     * @param {ElementConnect} elementConnect ElementConnect オブジェクト
     */
    constructor(elementConnect) {
        super(elementConnect);
        this.stageElement = document.querySelector('.js-game__stage');
        this.hydrogen_image = document.getElementById('id-image__hydrogen');
        this.carbon_image = document.getElementById('id-image__carbon');
        this.nitrogen_image = document.getElementById('id-image__nitrogen');
        this.oxygen_image = document.getElementById('id-image__oxygen');
        this.sodium_image = document.getElementById('id-image__sodium');
        this.sulfur_image = document.getElementById('id-image__sulfur');
        this.chlorine_image = document.getElementById('id-image__chlorine');

        this.#setupButton();
        this.#setupKeyboard();
    }

    /**
     * ゲームを描画する。
     */
    render() {
        this.stageElement.innerHTML = '';
        this.elementConnect.board.board.forEach(row => {
            const width = `calc(var(--stage-width) / ${Config.stageCols})`;
            const height = `calc(var(--stage-height) / ${Config.stageRows + Config.additionalRows})`;
            const length = `min(${width}, ${height})`;

            const rowHtmlElement = document.createElement('div');
            rowHtmlElement.style.height = length;
            rowHtmlElement.style.display = 'flex';
            rowHtmlElement.style.justifyContent = 'center';
            row.forEach(element => {
                const imageContainer = document.createElement('div');
                imageContainer.style.width = length;
                imageContainer.style.height = length;
                if (element !== null) {
                    const image = this.#getImage(element)
                    image.style.width = length;
                    image.style.height = length;
                    imageContainer.appendChild(image);
                }
                rowHtmlElement.appendChild(imageContainer);
            });
            this.stageElement.appendChild(rowHtmlElement);
        });
    }

    /**
     * ボタンを初期化する。
     */
    #setupButton() {
        const buttonNodeList = document.querySelectorAll('.js-game__button');
        buttonNodeList.forEach(buttonElement => {
            buttonElement.addEventListener('click', () => {
                this.#operation(buttonElement.dataset.operation);
            });
        });
    }

    /**
     * キーボードショートカットを初期化する。
     */
    #setupKeyboard() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'a') {
                this.#operation('moveLeft');
            } else if (event.key === 'd') {
                this.#operation('moveRight');
            } else if (event.key ==='s') {
                this.#operation('moveDown');
            } else if (event.key === ' ') {
                if (event.shiftKey) {
                    this.#operation('rotateLeft');
                } else {
                    this.#operation('rotateRight');
                }
            }
        });
    }

    /**
     * 操作を実行する。
     * @param {string} operation 操作
     */
    #operation(operation) {
        if (operation === 'rotateRight') {
            this.elementConnect.rotate(true);
        } else if (operation === 'rotateLeft') {
            this.elementConnect.rotate(false);
        } else if (operation === 'moveRight') {
            this.elementConnect.move(Direction.RIGHT);
        } else if (operation === 'moveLeft') {
            this.elementConnect.move(Direction.LEFT);
        } else if (operation === 'moveDown') {
            this.elementConnect.moveDown();
        } else {
            return;
        }
        this.render();
    }

    /**
     * 指定した Element オブジェクトの画像 Node を返す。
     * @param {Element} element Element オブジェクト
     * @returns {Node} 画像 Node オブジェクト
     */
    #getImage(element) {
        switch (element) {
            case Element.HYDROGEN:
                return this.hydrogen_image.cloneNode();
            case Element.CARBON:
                return this.carbon_image.cloneNode();
            case Element.NITROGEN:
                return this.nitrogen_image.cloneNode();
            case Element.OXYGEN:
                return this.oxygen_image.cloneNode();
            case Element.SODIUM:
                return this.sodium_image.cloneNode();
            case Element.SULFUR:
                return this.sulfur_image.cloneNode();
            case Element.CHLORINE:
                return this.chlorine_image.cloneNode();
            default:
                throw new Error(`Unknown element: ${element}`);
        }
    }
}
