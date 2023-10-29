import { RaceState } from "./race-state";
export class Race {
    length;
    track;
    prizeCashMoney;
    difficulty;
    constructor(length, track, prizeCashMoney, difficulty) {
        this.length = length;
        this.track = track;
        this.prizeCashMoney = prizeCashMoney;
        this.difficulty = difficulty;
    }
    racingCamels = [];
    raceState = RaceState.none;
    winner;
    triggeredTimestamp = 0;
}
