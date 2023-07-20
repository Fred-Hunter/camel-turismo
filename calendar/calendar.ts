class Calendar {
    constructor() {
        this.Day = 1;
        this.Season = Season.Spring;
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

enum Season {
    Spring,
    Summer,
    Autumn,
    Winter
}