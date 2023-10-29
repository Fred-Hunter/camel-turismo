import { GameState } from "./global/game-state";
import { GlobalComponents } from "./global/global-components";
import { Startup } from "./global/startup";
import { Page } from "./navigation/page";
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
function gameLoop(timeStamp) {
    try {
        GameState.secondsPassed = Math.min((timeStamp - GameState.oldTimeStamp) / 1000, 0.1);
        GameState.oldTimeStamp = timeStamp;
        GlobalComponents.globalServices.navigatorService.doNavigation();
        GlobalComponents.raceComponent.handleRaceLoop(timeStamp);
    }
    catch (exception) {
        console.error(exception);
    }
    finally {
        window.requestAnimationFrame(gameLoop);
    }
}
window.onload = () => { init(); };
