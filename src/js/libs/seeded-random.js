/**
 * シード値に基づいた疑似乱を生成する。
 * 同じシードに対して同じ乱数列が生成される。
 *
 * アルゴリズム:
 *      線形合同法（Linear Congruential Generator, LCG）
 */
export class SeededRandom {

    /**
     * コンストラクタ
     * @param {number} seed 乱数生成に使用するシード値。省略時はランダムなシードが使用される。
     */
    constructor(seed) {
        this.state = seed;
        this.m = 0x80000000;  // 2**31
        this.a = 1103515245;
        this.c = 12345;
    }

    /**
     * 次の擬似乱数を生成する。
     * @returns {number} 次の疑似乱数
     */
    random() {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state / (this.m - 1);
    }
}
