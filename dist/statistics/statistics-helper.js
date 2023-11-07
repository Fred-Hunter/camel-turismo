import { GameState } from "../global/game-state.js";
export class StatisticsHelper {
    static LogCashMoneyChange(amount) {
        GameState.statistics.totalCashMoneyEarnt += Math.abs(amount);
    }
    static LogExpChange(amount) {
        GameState.statistics.totalExperienceEarnt += Math.abs(amount);
    }
    static LogRaceResult(result) {
        GameState.statistics.raceResults.push(result);
    }
}
