import { Colour } from "../assets/colours.js";
import { GameState } from "../global/game-state.js";
import { Calendar, Season } from "./calendar.js";
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
                return Colour.spring;
            case Season.Summer:
                return Colour.summer;
            case Season.Autumn:
                return Colour.autumn;
            default:
                return Colour.winter;
        }
    }
    static getSeasonLighterColour(season) {
        switch (season) {
            case Season.Spring:
                return Colour.lightSpring;
            case Season.Summer:
                return Colour.lightSummer;
            case Season.Autumn:
                return Colour.lightAutumn;
            default:
                return Colour.lightWinter;
        }
    }
}
