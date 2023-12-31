import { Camel } from "../management/camel-creation/camel.js";
import { CamelCreator } from "../management/camel-creation/camel-creator.js";
import { Scroll } from "../scrolls/scroll.js";
import { GlobalComponents } from "./global-components.js";
import { Calendar } from "../calendar/calendar.js";
import { Statistics } from "../statistics/statistics.js";
import { Academy } from "../academy/academy.js";

export interface GameStateObject {
    camel: Camel | undefined,
    camels: Camel[],
    secondsPassed: number,
    oldTimeStamp: number,
    lastUsedId: number,
    cashMoney: number,
    calendar: Calendar,
    scrolls: Scroll[],
    stableSeed: string,
    statistics: Statistics
    academy: Academy
}

export class GameState {
    // Update this whenever a new gamestate version is created
    public static version: number = 6;

    // Camel
    public static camel: Camel | undefined;
    public static camels: Camel[] = [];
    public static secondsPassed: number = 0;
    public static oldTimeStamp: number = 0;
    public static stableSeed: string = "";
    public static cashMoney: number = 100;

    // Calendar
    public static calendar: Calendar;

    // Recruitment
    public static lastUsedId: number = 0;

    // Scrolls
    public static scrolls: Scroll[] = [];
    public static get unreadScrollCount() { return GameState.scrolls.filter(o => !o.read).length }

    // Stats
    public static statistics: Statistics = new Statistics();
    // Academy
    public static academy: Academy = { buildings: []};

    public static Save() {
        const gameStateObject: GameStateObject = {
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
        }
        const gameStateString = JSON.stringify(gameStateObject);
        localStorage.setItem(this.getItemKey(), gameStateString);
    }

    public static Reset() {
        localStorage.removeItem(this.getItemKey());
    }

    public static GetExists() {
        const gameStateString = localStorage.getItem(this.getItemKey());
        return (gameStateString && gameStateString !== undefined);
    }

    public static LoadIfExists() {
        const gameStateString = localStorage.getItem(this.getItemKey());
        if (!gameStateString || gameStateString === undefined) return;

        const gameState: GameStateObject = JSON.parse(gameStateString);

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

    private static loadCamel(camelCreator: CamelCreator, serialisedCamel: Camel) {
        const camel = camelCreator.createCamelFromSerialisedCamel(serialisedCamel);

        GameState.camels.push(camel);
    }

    private static getItemKey() {
        return GameState.name + this.version;
    }
}
