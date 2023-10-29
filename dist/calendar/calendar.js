export class Calendar {
    constructor(startDay = 1, season = Season.Spring) {
        this.Day = startDay;
        this.Season = season;
    }
    _numberOfDaysInASeason = 30;
    Day;
    Season;
    moveToNextDay() {
        if (this.Day === this._numberOfDaysInASeason) {
            this.Day = 1;
            this.Season = (this.Season + 1) % 4;
            return;
        }
        this.Day++;
    }
}
export var Season;
(function (Season) {
    Season[Season["Spring"] = 0] = "Spring";
    Season[Season["Summer"] = 1] = "Summer";
    Season[Season["Autumn"] = 2] = "Autumn";
    Season[Season["Winter"] = 3] = "Winter";
})(Season || (Season = {}));
