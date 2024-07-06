import { RaceType } from "../race-type.js";
import { RaceState } from "./race-state.js";
import { RacingCamel } from "./racing-camel.js";

export class Race {
    constructor(
        public length: number,
        public track: number[][],
        public prizeCashMoney: number,
        public raceType: RaceType,
        public raceSpeed: number = 1) { 
        }

    racingCamels: RacingCamel[] = [];
    raceState: RaceState = RaceState.none;
    winner: undefined;
    triggeredTimestamp: number = 0;
    startTime = Date.now();
    trackElevation: Array<number> = [];
    lastAnimatedBackgroundTimestamp: number = 0;
}
