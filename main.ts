// Time
let secondsPassed: number;
let oldTimeStamp: number = 0;

// Canvas
let canvasService: CanvasService;

// Recruitment
let camel: Camel;
let lastUsedId = 0;

// Race
let raceCanvas: HTMLCanvasElement;
let racingService: RaceService;
let race: Race;

function init() {
    // Canvas
    canvasService = new CanvasService();

    // Camel
    camel = new Camel(++lastUsedId, InitCamelQuality.High);
    
    // Race
    raceCanvas = canvasService.getCanvas('1');
    racingService = new RaceService();
    race = racingService.createRace(camel, 1000);
    racingService.startRace(race);

    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp: number) {
    secondsPassed = Math.min((timeStamp - oldTimeStamp) / 1000, 0.1);
    oldTimeStamp = timeStamp;

    if (!!race && race.inProgress) {
        racingService.simulateRaceStep(race);
        race.racingCamels.forEach(camel => {
            console.log(`${camel.camel.id} - ${camel.completionPercentage}`);
        });
    }

    window.requestAnimationFrame(gameLoop);
}

window.onload = () => { init() };