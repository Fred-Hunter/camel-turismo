import { GameState } from "./global/game-state";
import { Startup } from "./global/startup";
import { Page } from "./navigation/page";
// Game state
export let race;
// Global service
export let globalServices;
// Components
// Recruitment
export let recruitmentService;
// Camel management
export let camelSkillComponent;
export let camelManagementSelectComponent;
// Race
export let raceSelection;
export let raceComponent;
export let raceCamelSelectComponent;
// Loading
export let loadingScreen;
// Drawing
export let isometricEditorComponent;
export let drawingMode = false;
// Scrolls
export let scrollsComponent;
function init() {
    const startup = new Startup();
    globalServices = startup.createGlobalServices();
    startup.createCanvases();
    startup.registerComponents();
    startup.registerAudio();
    if (drawingMode) {
        globalServices.navigatorService.requestPageNavigation(Page.debug);
    }
    window.requestAnimationFrame(gameLoop);
}
function gameLoop(timeStamp) {
    try {
        GameState.secondsPassed = Math.min((timeStamp - GameState.oldTimeStamp) / 1000, 0.1);
        GameState.oldTimeStamp = timeStamp;
        globalServices.navigatorService.doNavigation();
        raceComponent.handleRaceLoop(timeStamp);
    }
    catch (exception) {
        console.error(exception);
    }
    finally {
        window.requestAnimationFrame(gameLoop);
    }
}
window.onload = () => { init(); };
