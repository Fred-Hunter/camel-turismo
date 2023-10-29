export class Calendar {
    constructor(startDay: number = 1, season: Season = Season.Spring) {
        this.Day = startDay;
        this.Season = season;
    }

    private readonly _numberOfDaysInASeason = 30;

    Day: number;
    Season: Season;

    moveToNextDay() {
        if (this.Day === this._numberOfDaysInASeason) {
            this.Day = 1;
            this.Season = (this.Season + 1) % 4;
            return;
        }

        this.Day++;
    }
}

export enum Season {
    Spring,
    Summer,
    Autumn,
    Winter
}
