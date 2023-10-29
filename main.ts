import { GameState } from "./global/game-state";
import { GlobalServices } from "./global/global-services";
import { Startup } from "./global/startup";
import { LoadingScreen } from "./loading/loading-screen";
import { CamelSelectComponent } from "./management/camel-select/camel-select-component";
import { CamelSkillComponent } from "./management/skills/camel-skill-component";
import { Page } from "./navigation/page";
import { Race } from "./racing/models/race";
import { RaceComponent } from "./racing/race-component";
import { RaceSelection } from "./racing/race-selection";
import { RecruitmentService } from "./recruitment/recruitment-service";
import { ScrollsComponent } from "./scrolls/scrolls-component";

// Game state
export let race: Race;

// Global service
export let globalServices: GlobalServices

// Components
// Recruitment
export let recruitmentService: RecruitmentService;

// Camel management
export let camelSkillComponent: CamelSkillComponent;
export let camelManagementSelectComponent: CamelSelectComponent;

// Race
export let raceSelection: RaceSelection;
export let raceComponent: RaceComponent;
export let raceCamelSelectComponent: CamelSelectComponent;

// Loading
export let loadingScreen: LoadingScreen;

// Drawing
export let isometricEditorComponent: IsometricEditorComponent;
export let drawingMode = false;

// Scrolls
export let scrollsComponent: ScrollsComponent;

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

function gameLoop(timeStamp: number) {
    try {
        GameState.secondsPassed = Math.min((timeStamp - GameState.oldTimeStamp) / 1000, 0.1);
        GameState.oldTimeStamp = timeStamp;

        globalServices.navigatorService.doNavigation();
        raceComponent.handleRaceLoop(timeStamp);

    } catch (exception) {
        console.error(exception);
    } finally {
        window.requestAnimationFrame(gameLoop);
    }
}

window.onload = () => { init() };
