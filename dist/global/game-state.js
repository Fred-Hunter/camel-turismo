import { GlobalComponents } from "./global-components.js";
import { Calendar } from "../calendar/calendar.js";
export class GameState {
    // Update this whenever a new gamestate version is created
    static _version = 4;
    // Camel
    static camel;
    static camels = [];
    static secondsPassed = 0; // done
    static oldTimeStamp = 0; // done
    static stableSeed = "";
    // Calendar
    static calendar;
    // Recruitment
    static lastUsedId = 0; // done
    static cashMoney = 100; // done
    // Scrolls
    static scrolls = [];
    static get unreadScrollCount() { return GameState.scrolls.filter(o => !o.read).length; }
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
            stableSeed: GameState.stableSeed
        };
        const gameStateString = JSON.stringify(gameStateObject);
        localStorage.setItem(this.getItemKey(), gameStateString);
    }
    static Reset() {
        localStorage.removeItem(this.getItemKey());
    }
    static GetExists() {
        const gameStateString = localStorage.getItem(this.getItemKey());
        if (!gameStateString || gameStateString === undefined)
            return;
        const gameState = JSON.parse(gameStateString);
        return true;
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
        GameState.calendar = new Calendar(gameState.calendar.Day, gameState.calendar.Season);
        GameState.scrolls = gameState.scrolls;
        GameState.stableSeed = gameState.stableSeed;
    }
    static loadCamel(camelCreator, serialisedCamel) {
        const camel = camelCreator.createCamelFromSerialisedCamel(serialisedCamel);
        GameState.camels.push(camel);
    }
    static getItemKey() {
        return GameState.name + this._version;
    }
}
