import { Position } from "../components/position.js";


/**
 * 定数
 */
export class Config {
    // stage config
    static stageCols = 6;
    static stageRows = 12;
    static additionalRows = 2;

    static nextElementPositions = [
        new Position(3, 0),
        new Position(2, 0),
    ];

    // game config
    static tickInterval = 500;
    static scorePerTick = 0.35;
    static scorePerMoveDown = 0.45;
}
