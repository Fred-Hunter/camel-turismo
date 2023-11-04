import { RaceState } from "./race-state.js";
export class Race {
    length;
    track;
    prizeCashMoney;
    raceType;
    constructor(length, track, prizeCashMoney, raceType) {
        this.length = length;
        this.track = track;
        this.prizeCashMoney = prizeCashMoney;
        this.raceType = raceType;
    }
    racingCamels = [];
    raceState = RaceState.none;
    winner;
    triggeredTimestamp = 0;
}
