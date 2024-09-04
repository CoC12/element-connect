export const Element = Object.freeze({
    HYDROGEN: {
        symbol: 'H',
        weight: 1.01,
    },
    CARBON: {
        symbol: 'C',
        weight: 12.01,
    },
    NITROGEN: {
        symbol: 'N',
        weight: 14.01,
    },
    OXYGEN: {
        symbol: 'O',
        weight: 16.00,
    },
    SODIUM: {
        symbol: 'Na',
        weight: 22.99,
    },
    SULFUR: {
        symbol: 'S',
        weight: 32.07,
    },
    CHLORINE: {
        symbol: 'Cl',
        weight: 35.45,
    },
});
export const elementKeys = Object.keys(Element);


export class Pattern {

    /**
     * コンストラクタ
     * @param {Array<Array<Element | null>>} pattern パターン
     */
    constructor(pattern) {
        this.pattern = pattern;
        this.rows = pattern.length;
        this.cols = pattern[0].length;
    }

    /**
     * パターンを回転する。
     * @returns {Pattern} 回転後の Pattern オブジェクト
     */
    rotatePattern() {
        const newPattern = [];
        for (let x = 0; x < this.cols; x++) {
            const newRow = [];
            for (let y = this.rows; y > 0; y--) {
                newRow.push(this.pattern[y - 1][x]);
            }
            newPattern.push(newRow);
        }
        return new Pattern(newPattern);
    }
}


const substanceData = [
    {
        name: '水素',
        pattern: [
            [Element.HYDROGEN, Element.HYDROGEN],
        ],
        formula: 'H₂',
    },
    {
        name: '酸素',
        pattern: [
            [Element.OXYGEN, Element.OXYGEN],
        ],
        formula: 'O₂',
    },
    {
        name: '窒素',
        pattern: [
            [Element.NITROGEN, Element.NITROGEN],
        ],
        formula: 'N₂',
    },
    {
        name: '塩素',
        pattern: [
            [Element.CHLORINE, Element.CHLORINE],
        ],
        formula: 'Cl₂',
    },
    {
        name: '水',
        pattern: [
            [Element.HYDROGEN, null],
            [Element.OXYGEN, Element.HYDROGEN],
        ],
        formula: 'H₂O',
    },
    {
        name: '二酸化炭素',
        pattern: [
            [Element.OXYGEN, Element.CARBON, Element.OXYGEN],
        ],
        formula: 'CO₂',
    },
    {
        name: 'メタン',
        pattern: [
            [null, Element.HYDROGEN, null],
            [Element.HYDROGEN, Element.CARBON, Element.HYDROGEN],
            [null, Element.HYDROGEN, null],
        ],
        formula: 'CH₄',
    },
    {
        name: 'アンモニア',
        pattern: [
            [Element.HYDROGEN, Element.NITROGEN, Element.HYDROGEN],
            [null, Element.HYDROGEN, null],
        ],
        formula: 'NH₃',
    },
    {
        name: '塩化ナトリウム',
        pattern: [
            [Element.SODIUM, Element.CHLORINE],
        ],
        formula: 'NaCl',
    },
    {
        name: '塩化水素',
        pattern: [
            [Element.HYDROGEN, Element.CHLORINE],
        ],
        formula: 'HCl',
    },
    {
        name: '硫化水素',
        pattern: [
            [Element.HYDROGEN, null],
            [Element.SULFUR, Element.HYDROGEN],
        ],
        formula: 'H₂S',
    },
    {
        name: '二酸化硫黄',
        pattern: [
            [Element.OXYGEN, Element.SULFUR, Element.OXYGEN],
        ],
        formula: 'SO₂',
    },
    {
        name: '二塩化硫黄',
        pattern: [
            [Element.CHLORINE, null],
            [Element.SULFUR, Element.CHLORINE],
        ],
        formula: 'SCl₂',
    },
    {
        name: '二酸化窒素',
        pattern: [
            [Element.OXYGEN, null],
            [Element.NITROGEN, Element.OXYGEN],
        ],
        formula: 'NO₂',
    },
    {
        name: '次亜塩素酸ナトリウム',
        pattern: [
            [Element.SODIUM, null],
            [Element.OXYGEN, Element.CHLORINE],
        ],
        formula: 'NaClO',
    },
    {
        name: '水酸化ナトリウム',
        pattern: [
            [Element.SODIUM, null],
            [Element.OXYGEN, Element.HYDROGEN],
        ],
        formula: 'NaOH',
    },
    {
        name: '水素化ナトリウム',
        pattern: [
            [Element.SODIUM, Element.HYDROGEN],
        ],
        formula: 'NaH',
    }
]

export const substances = substanceData.map((data) => {
    const patterns = [];
    let pattern = new Pattern(data.pattern);
    patterns.push(pattern);
    for (let i = 0; i < 3; i++) {
        pattern = pattern.rotatePattern();
        patterns.push(pattern);
    }

    const score = data.pattern.flat().reduce((sum, element) => {
        if (element === null) {
            return sum;
        }
        return sum + element.weight;
    }, 0);

    const substance = {
        name: data.name,
        formula: data.formula,
        patterns: patterns,
        score: score,
    }
    return substance;
});
