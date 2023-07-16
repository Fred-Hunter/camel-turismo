class GameState {
    // Camel
    public static camel: Camel | undefined;
    public static secondsPassed: number = 0; // done
    public static oldTimeStamp: number = 0; // done
    
    // Recruitment
    public static lastUsedId: number = 0; // done
    public static cashMoney: number = 100; // done

    public static Save() {
        if (!!camel) GameState.camel = camel;

        const gameStateObject = {
            camel: GameState.camel,
            secondsPassed: GameState.secondsPassed,
            oldTimeStamp: GameState.oldTimeStamp,
            lastUsedId: GameState.lastUsedId,
            cashMoney: GameState.cashMoney
        }
        const gameStateString = JSON.stringify(gameStateObject);
        localStorage.setItem(GameState.name, gameStateString);
    }

    public static Reset() {
        localStorage.removeItem(GameState.name);
    }

    public static GetExists() {
        const gameStateString = localStorage.getItem(GameState.name);
        if (!gameStateString || gameStateString === undefined) return;

        const gameState = JSON.parse(gameStateString);

        return !!gameState.camel;
    }

    public static LoadIfExists() {
        const gameStateString = localStorage.getItem(GameState.name);
        if (!gameStateString || gameStateString === undefined) return;

        const gameState = JSON.parse(gameStateString);

        if (gameState.camel === undefined) return;

        // Load camel
        GameState.camel = gameState.camel;
        camel = new Camel(gameState.camel.id, gameState.camel.quality);
        camel.colour = gameState.camel.colour;
        camel.name = gameState.camel.name;
        camel.temperament = gameState.camel.temperament;
        camel.unspentXp = gameState.camel.unspentXp;
        
        camel.agility = new CamelSkill(gameState.camel.agility._name, gameState.camel.agility._currentXp);
        camel.sprintSpeed = new CamelSkill(gameState.camel.sprintSpeed._name, gameState.camel.sprintSpeed._currentXp);
        camel.stamina = new CamelSkill(gameState.camel.stamina._name, gameState.camel.stamina._currentXp);

        // Load game state
        GameState.secondsPassed = gameState.secondsPassed;
        GameState.oldTimeStamp = gameState.oldTimeStamp;
        GameState.lastUsedId = gameState.lastUsedId;
        GameState.cashMoney = gameState.cashMoney;
    }
}