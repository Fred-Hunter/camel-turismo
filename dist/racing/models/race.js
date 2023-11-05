import { RaceState } from "./race-state.js";
export class Race {
    length;
    track;
    prizeCashMoney;
    raceType;
    raceSpeed;
    constructor(length, track, prizeCashMoney, raceType, raceSpeed = 1) {
        this.length = length;
        this.track = track;
        this.prizeCashMoney = prizeCashMoney;
        this.raceType = raceType;
        this.raceSpeed = raceSpeed;
    }
    racingCamels = [];
    raceState = RaceState.none;
    winner;
    triggeredTimestamp = 0;
}
