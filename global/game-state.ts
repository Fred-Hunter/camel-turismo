interface GameStateObject {
    camel: Camel | undefined,
    camels: Camel[],
    secondsPassed: number,
    oldTimeStamp: number,
    lastUsedId: number,
    cashMoney: number
}

class GameState {
    // Update this whenever a new gamestate version is created
    private static _version: number = 0;

    // Camel
    public static camel: Camel | undefined;
    public static camels: Camel[] = [];
    public static secondsPassed: number = 0; // done
    public static oldTimeStamp: number = 0; // done

    // Recruitment
    public static lastUsedId: number = 0; // done
    public static cashMoney: number = 100; // done

    public static Save() {
        const gameStateObject: GameStateObject = {
            camel: GameState.camel,
            camels: GameState.camels,
            secondsPassed: GameState.secondsPassed,
            oldTimeStamp: GameState.oldTimeStamp,
            lastUsedId: GameState.lastUsedId,
            cashMoney: GameState.cashMoney
        }
        const gameStateString = JSON.stringify(gameStateObject);
        localStorage.setItem(this.getItemKey(), gameStateString);
    }

    public static Reset() {
        localStorage.removeItem(this.getItemKey());
    }

    public static GetExists() {
        const gameStateString = localStorage.getItem(this.getItemKey());
        if (!gameStateString || gameStateString === undefined) return;

        const gameState = JSON.parse(gameStateString);

        return !!gameState.camel;
    }

    public static LoadIfExists() {
        const gameStateString = localStorage.getItem(this.getItemKey());
        if (!gameStateString || gameStateString === undefined) return;

        const gameState: GameStateObject = JSON.parse(gameStateString);

        if (gameState.camel === undefined) return;

        // Load camel
        gameState.camels.forEach(camel => this.loadCamel(camel));

        if (gameState.camels.length > 0) {
            GameState.camel = GameState.camels[0];
        }

        // Load game state
        GameState.secondsPassed = gameState.secondsPassed;
        GameState.oldTimeStamp = gameState.oldTimeStamp;
        GameState.lastUsedId = gameState.lastUsedId;
        GameState.cashMoney = gameState.cashMoney;
    }

    private static loadCamel(serialisedCamel: Camel) {
        const camel = new Camel(serialisedCamel.id, InitCamelQuality.None);

        camel.colour = serialisedCamel.colour;
        camel.name = serialisedCamel.name;
        camel.temperament = serialisedCamel.temperament;
        camel.unspentXp = serialisedCamel.unspentXp;

        camel.agility.addXp(serialisedCamel.agility.currentXp);
        camel.sprintSpeed.addXp(serialisedCamel.sprintSpeed.currentXp);
        camel.stamina.addXp(serialisedCamel.stamina.currentXp);

        GameState.camels.push(camel);
    }

    private static getItemKey() {
        return GameState.name + this._version;
    }
}