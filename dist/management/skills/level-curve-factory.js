import { DefaultLevelCurve } from "./default-level-curve";
export class LevelCurveFactory {
    getDefaultLevelCurve() {
        return new DefaultLevelCurve();
    }
}
