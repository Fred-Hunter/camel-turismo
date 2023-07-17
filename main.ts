// Game state
let camel: Camel;
let race: Race;

// Navigation TODO should not be available globally
let navigatorService: NavigatorService;

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

function init() {
    navigatorService = new NavigatorService();
    const musicService = new MusicService();
    const startup = new Startup(musicService, navigatorService);
    
    startup.createCanvases();
    startup.registerComponents();
    startup.registerAudio();

    navigatorService.doNavigation();

    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp: number) {
    try {
        GameState.secondsPassed = Math.min((timeStamp - GameState.oldTimeStamp) / 1000, 0.1);
        GameState.oldTimeStamp = timeStamp;

        navigatorService.doNavigation();
        raceComponent.handleRaceLoop(timeStamp);

    } catch (exception) {
        console.error(exception);
    } finally {
        window.requestAnimationFrame(gameLoop);
    }
}

window.onload = () => { init() };
