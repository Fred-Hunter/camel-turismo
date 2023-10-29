import { DefaultLevelCurve } from "./default-level-curve.js";
import { LevelCurve } from "./level-curve.js";

export class LevelCurveFactory {
    getDefaultLevelCurve(): LevelCurve {
        return new DefaultLevelCurve();
    }
}
