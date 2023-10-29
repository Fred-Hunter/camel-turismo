import { GameState } from "../global/game-state";
export class CalendarService {
    static getCalendar() {
        if (!GameState.calendar) {
            GameState.calendar = new Calendar();
        }
        return GameState.calendar;
    }
    static getSeasonAsString(season) {
        switch (season) {
            case Season.Spring:
                return 'Spring';
            case Season.Summer:
                return 'Summer';
            case Season.Autumn:
                return 'Autumn';
            case Season.Winter:
                return 'Winter';
            default:
                return '';
        }
    }
    static getSeasonDarkerColour(season) {
        switch (season) {
            case Season.Spring:
                return '#61ab4b';
            case Season.Summer:
                return '#e3c036';
            case Season.Autumn:
                return '#ed7e39';
            default:
                return '#246';
        }
    }
    static getSeasonLighterColour(season) {
        switch (season) {
            case Season.Spring:
                return '#91d97c';
            case Season.Summer:
                return '#fce37c';
            case Season.Autumn:
                return '#ffaa75';
            default:
                return '#4b7bab';
        }
    }
}
