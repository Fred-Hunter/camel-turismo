// Game state
let race: Race;

// Global service
let globalServices: GlobalServices

// Components
// Recruitment
let recruitmentService: RecruitmentService;

// Camel management
let camelSkillComponent: CamelSkillComponent;
let camelManagementSelectComponent: CamelSelectComponent;

// Race
let raceSelection: RaceSelection;
let raceComponent: RaceComponent;
let raceCamelSelectComponent: CamelSelectComponent;

// Loading
let loadingScreen: LoadingScreen;

// Drawing
let isometricEditorComponent: IsometricEditorComponent;
let drawingMode = false;

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
