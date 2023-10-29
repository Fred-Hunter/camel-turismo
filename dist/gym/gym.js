import { GameState } from "../global/game-state.js";
import { TrainSession, SpaSession } from "./gym-session.js";
export class Gym {
    static getTreadmillSession(camel) {
        return new TrainSession(camel.sprintSpeed, camel.stamina.level);
    }
    getSpaSession(camel) {
        if (GameState.cashMoney >= 50) {
            GameState.cashMoney += -50;
            return new SpaSession(camel.stamina);
        }
    }
}
