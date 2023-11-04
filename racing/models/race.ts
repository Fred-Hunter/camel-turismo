import { RaceType } from "../race-type.js";
import { RaceState } from "./race-state.js";
import { RacingCamel } from "./racing-camel.js";

export class Race {
    constructor(
        public length: number,
        public track: number[][],
        public prizeCashMoney: number,
        public raceType: RaceType) { 
        }

    racingCamels: RacingCamel[] = [];
    raceState: RaceState = RaceState.none;
    winner: undefined;
    triggeredTimestamp: number = 0;
}
