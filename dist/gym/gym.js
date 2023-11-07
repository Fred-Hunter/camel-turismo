import { GameState } from "../global/game-state.js";
import { StatisticsHelper } from "../statistics/statistics-helper.js";
import { TrainSession, SpaSession } from "./gym-session.js";
export class Gym {
    static getTreadmillSession(camel) {
        return new TrainSession(camel.sprintSpeed, camel.stamina.level);
    }
    getSpaSession(camel) {
        if (GameState.cashMoney >= 50) {
            GameState.cashMoney += -50;
            StatisticsHelper.LogCashMoneyChange(-50);
            return new SpaSession(camel.stamina);
        }
    }
}
