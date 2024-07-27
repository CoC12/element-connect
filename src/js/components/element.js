export const Element = Object.freeze({
    HYDROGEN: 'H ',
    OXYGEN: 'O ',
    CARBON: 'C ',
    // NITROGEN: 'N ',
    // SODIUM: 'Na',
    // CHLORINE: 'Cl',
    // CALCIUM: 'Ca',
    // SULFUR: 'S ',
    // PHOSPHORUS: 'P ',
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
];
