import { GameState } from "../global/game-state.js";
import { RaceResult } from "./race-result.js";

export class StatisticsHelper {
    public static LogCashMoneyChange(amount: number) {
        GameState.statistics.totalCashMoneyEarnt += Math.abs(amount);
    }
    public static LogExpChange(amount: number) {
        GameState.statistics.totalExperienceEarnt += Math.abs(amount);
    }
    public static LogRaceResult(result: RaceResult) {
        GameState.statistics.raceResults.push(result);
    }
}
