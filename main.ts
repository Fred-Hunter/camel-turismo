import { GameState } from "./global/game-state.js";
import { GlobalComponents } from "./global/global-components.js";
import { Startup } from "./global/startup.js";
import { Page } from "./navigation/page.js";

function init() {
    const startup = new Startup();
    GlobalComponents.globalServices = startup.createGlobalServices();

    startup.createCanvases();
    startup.registerComponents();
    startup.registerAudio();

    if (GlobalComponents.drawingMode) {
        GlobalComponents.globalServices.navigatorService.requestPageNavigation(Page.debug);
    }

    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp: number) {
    try {
        GameState.secondsPassed = Math.min((timeStamp - GameState.oldTimeStamp) / 1000, 0.1);
        GameState.oldTimeStamp = timeStamp;

        GlobalComponents.globalServices.navigatorService.doNavigation();
        GlobalComponents.raceComponent.handleRaceLoop(timeStamp);

    } catch (exception) {
        console.error(exception);
    } finally {
        window.requestAnimationFrame(gameLoop);
    }
}

window.onload = () => { init() };
