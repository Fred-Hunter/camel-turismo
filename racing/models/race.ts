import { Difficulty } from "../difficulty";
import { RaceState } from "./race-state";
import { RacingCamel } from "./racing-camel";

export class Race {
    constructor(
        public length: number,
        public track: number[][],
        public prizeCashMoney: number,
        public difficulty: Difficulty) { 
        }

    racingCamels: RacingCamel[] = [];
    raceState: RaceState = RaceState.none;
    winner: undefined;
    triggeredTimestamp: number = 0;
}
