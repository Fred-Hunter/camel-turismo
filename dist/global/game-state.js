import { GlobalComponents } from "./global-components.js";
import { Calendar } from "../calendar/calendar.js";
import { Statistics } from "../statistics/statistics.js";
export class GameState {
    // Update this whenever a new gamestate version is created
    static version = 6;
    // Camel
    static camel;
    static camels = [];
    static secondsPassed = 0;
    static oldTimeStamp = 0;
    static stableSeed = "";
    static cashMoney = 100;
    // Calendar
    static calendar;
    // Recruitment
    static lastUsedId = 0;
    // Scrolls
    static scrolls = [];
    static get unreadScrollCount() { return GameState.scrolls.filter(o => !o.read).length; }
    // Stats
    static statistics = new Statistics();
    // Academy
    static academy = { buildings: [] };
    static Save() {
        const gameStateObject = {
            camel: GameState.camel,
            camels: GameState.camels,
            secondsPassed: GameState.secondsPassed,
            oldTimeStamp: GameState.oldTimeStamp,
            lastUsedId: GameState.lastUsedId,
            cashMoney: GameState.cashMoney,
            calendar: GameState.calendar,
            scrolls: GameState.scrolls,
            stableSeed: GameState.stableSeed,
            statistics: GameState.statistics,
            academy: GameState.academy
        };
        const gameStateString = JSON.stringify(gameStateObject);
        localStorage.setItem(this.getItemKey(), gameStateString);
    }
    static Reset() {
        localStorage.removeItem(this.getItemKey());
    }
    static GetExists() {
        const gameStateString = localStorage.getItem(this.getItemKey());
        return (gameStateString && gameStateString !== undefined);
    }
    static LoadIfExists() {
        const gameStateString = localStorage.getItem(this.getItemKey());
        if (!gameStateString || gameStateString === undefined)
            return;
        const gameState = JSON.parse(gameStateString);
        // Load camel
        gameState.camels.forEach(camel => this.loadCamel(GlobalComponents.globalServices.camelCreator, camel));
        if (gameState.camels.length > 0) {
            GameState.camel = GameState.camels[0];
        }
        // Load game state
        GameState.secondsPassed = gameState.secondsPassed;
        GameState.oldTimeStamp = gameState.oldTimeStamp;
        GameState.lastUsedId = gameState.lastUsedId;
        GameState.cashMoney = gameState.cashMoney;
        GameState.statistics = gameState.statistics ?? new Statistics();
        GameState.calendar = new Calendar(gameState.calendar.Day, gameState.calendar.Season);
        GameState.scrolls = gameState.scrolls;
        GameState.stableSeed = gameState.stableSeed;
        GameState.academy = gameState.academy;
    }
    static loadCamel(camelCreator, serialisedCamel) {
        const camel = camelCreator.createCamelFromSerialisedCamel(serialisedCamel);
        GameState.camels.push(camel);
    }
    static getItemKey() {
        return GameState.name + this.version;
    }
}
