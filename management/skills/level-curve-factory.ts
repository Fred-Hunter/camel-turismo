import { DefaultLevelCurve } from "./default-level-curve";
import { LevelCurve } from "./level-curve";

export class LevelCurveFactory {
    getDefaultLevelCurve(): LevelCurve {
        return new DefaultLevelCurve();
    }
}
