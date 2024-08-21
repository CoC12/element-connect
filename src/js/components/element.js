export const Element = Object.freeze({
    HYDROGEN: 'H',
    CARBON: 'C',
    NITROGEN: 'N',
    OXYGEN: 'O',
    SODIUM: 'Na',
    SULFUR: 'S',
    CHLORINE: 'Cl',
});
export const elementKeys = Object.keys(Element);


export const substancePatterns = [
    // 水素
    [
        [Element.HYDROGEN, Element.HYDROGEN],
    ],
    [
        [Element.HYDROGEN],
        [Element.HYDROGEN],
    ],
    // 酸素
    [
        [Element.OXYGEN, Element.OXYGEN],
    ],
    [
        [Element.OXYGEN],
        [Element.OXYGEN],
    ],
    // 窒素
    [
        [Element.NITROGEN, Element.NITROGEN],
    ],
    [
        [Element.NITROGEN],
        [Element.NITROGEN],
    ],
    // 水
    [
        [Element.HYDROGEN, null],
        [Element.OXYGEN, Element.HYDROGEN],
    ],
    [
        [Element.OXYGEN, Element.HYDROGEN],
        [Element.HYDROGEN, null],
    ],
    [
        [Element.HYDROGEN, Element.OXYGEN],
        [null, Element.HYDROGEN],
    ],
    [
        [null, Element.HYDROGEN],
        [Element.HYDROGEN, Element.OXYGEN],
    ],
    // 二酸化炭素
    [
        [Element.OXYGEN, Element.CARBON, Element.OXYGEN],
    ],
    [
        [Element.OXYGEN],
        [Element.CARBON],
        [Element.OXYGEN],
    ],
    // メタン
    [
        [null, Element.HYDROGEN, null],
        [Element.HYDROGEN, Element.CARBON, Element.HYDROGEN],
        [null, Element.HYDROGEN, null],
    ],
    // アンモニア
    [
        [Element.HYDROGEN, Element.NITROGEN, Element.HYDROGEN],
        [null, Element.HYDROGEN, null],
    ],
    [
        [null, Element.HYDROGEN, null],
        [Element.HYDROGEN, Element.NITROGEN, Element.HYDROGEN],
    ],
    [
        [null, Element.HYDROGEN],
        [Element.HYDROGEN, Element.NITROGEN],
        [null, Element.HYDROGEN],
    ],
    [
        [Element.HYDROGEN, null],
        [Element.NITROGEN, Element.HYDROGEN],
        [Element.HYDROGEN, null],
    ],
    // 塩化ナトリウム
    [
        [Element.SODIUM, Element.CHLORINE],
    ],
    [
        [Element.CHLORINE, Element.SODIUM],
    ],
    [
        [Element.SODIUM],
        [Element.CHLORINE],
    ],
    [
        [Element.CHLORINE],
        [Element.SODIUM],
    ],
    // 塩化水素
    [
        [Element.HYDROGEN, Element.CHLORINE],
    ],
    [
        [Element.CHLORINE, Element.HYDROGEN],
    ],
    [
        [Element.HYDROGEN],
        [Element.CHLORINE],
    ],
    [
        [Element.CHLORINE],
        [Element.HYDROGEN],
    ],
    // 硫化水素
    [
        [Element.HYDROGEN, null],
        [Element.SULFUR, Element.HYDROGEN],
    ],
    [
        [Element.SULFUR, Element.HYDROGEN],
        [Element.HYDROGEN, null],
    ],
    [
        [Element.HYDROGEN, Element.SULFUR],
        [null, Element.HYDROGEN],
    ],
    [
        [null, Element.HYDROGEN],
        [Element.HYDROGEN, Element.SULFUR],
    ],
    // 二酸化硫黄
    [
        [Element.OXYGEN, Element.SULFUR, Element.OXYGEN],
    ],
    [
        [Element.OXYGEN],
        [Element.SULFUR],
        [Element.OXYGEN],
    ],
    // 二塩化硫黄
    [
        [Element.CHLORINE, null],
        [Element.SULFUR, Element.CHLORINE],
    ],
    [
        [Element.SULFUR, Element.CHLORINE],
        [Element.CHLORINE, null],
    ],
    [
        [Element.CHLORINE, Element.SULFUR],
        [null, Element.CHLORINE],
    ],
    [
        [null, Element.CHLORINE],
        [Element.CHLORINE, Element.SULFUR],
    ],
    // 二酸化窒素
    [
        [Element.OXYGEN, null],
        [Element.NITROGEN, Element.OXYGEN],
    ],
    [
        [Element.NITROGEN, Element.OXYGEN],
        [Element.OXYGEN, null],
    ],
    [
        [Element.OXYGEN, Element.NITROGEN],
        [null, Element.OXYGEN],
    ],
    [
        [null, Element.OXYGEN],
        [Element.OXYGEN, Element.NITROGEN],
    ],
    // 次亜塩素酸ナトリウム
    [
        [Element.SODIUM, null],
        [Element.OXYGEN, Element.CHLORINE],
    ],
    [
        [Element.OXYGEN, Element.SODIUM],
        [Element.CHLORINE, null],
    ],
    [
        [Element.CHLORINE, Element.OXYGEN],
        [null, Element.SODIUM],
    ],
    [
        [null, Element.CHLORINE],
        [Element.SODIUM, Element.OXYGEN],
    ],
    // 水酸化ナトリウム
    [
        [Element.SODIUM, null],
        [Element.OXYGEN, Element.HYDROGEN],
    ],
    [
        [Element.OXYGEN, Element.SODIUM],
        [Element.HYDROGEN, null],
    ],
    [
        [Element.HYDROGEN, Element.OXYGEN],
        [null, Element.SODIUM],
    ],
    [
        [null, Element.HYDROGEN],
        [Element.SODIUM, Element.OXYGEN],
    ],
    // 水素化ナトリウム
    [
        [Element.SODIUM, Element.HYDROGEN],
    ],
    [
        [Element.HYDROGEN, Element.SODIUM],
    ],
    [
        [Element.SODIUM],
        [Element.HYDROGEN],
    ],
    [
        [Element.HYDROGEN],
        [Element.SODIUM],
    ],
];
