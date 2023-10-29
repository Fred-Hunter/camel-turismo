import { DefaultLevelCurve } from "./default-level-curve.js";
export class LevelCurveFactory {
    getDefaultLevelCurve() {
        return new DefaultLevelCurve();
    }
}
