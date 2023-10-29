import { GameState } from "../global/game-state";
import { Camel } from "../management/camel-creation/camel";
import { TrainSession, SpaSession } from "./gym-session";

export class Gym {
    static getTreadmillSession(camel: Camel) {
        return new TrainSession(
            camel.sprintSpeed, 
            camel.stamina.level);
    }

    getSpaSession(camel: Camel) {
        if (GameState.cashMoney >= 50) {
            GameState.cashMoney += -50;
            return new SpaSession(
                camel.stamina);
        }
    }
}
