// Time
let secondsPassed: number;
let oldTimeStamp: number = 0;

// Canvas
let canvasService: CanvasService;

// Recruitment
let camel: Camel;
let lastUsedId = 0;

let recruitmentService: RecruitmentService;
// Race
let raceCanvas: HTMLCanvasElement;
let raceSimulation: RaceSimulation;
let raceDrawing: RaceDrawing;
let race: Race;

function init() {
    // Canvas
    canvasService = new CanvasService();

    // Camel
    camel = new Camel(++lastUsedId, InitCamelQuality.High);

    canvasService = new CanvasService();
    recruitmentService = new RecruitmentService(canvasService, 0);
    
    // Race
    raceCanvas = canvasService.getCanvas('1');
    raceDrawing = new RaceDrawing(raceCanvas);
    raceSimulation = new RaceSimulation();
    
    // TODO make triggered
    race = raceSimulation.createRace(camel, 1000);
    raceSimulation.startRace(race);
    raceDrawing.drawRaceCourse();

    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp: number) {
    secondsPassed = Math.min((timeStamp - oldTimeStamp) / 1000, 0.1);
    oldTimeStamp = timeStamp;

    if (!!race && race.inProgress) {
        raceSimulation.simulateRaceStep(race);
        race.racingCamels.forEach(camel => {
            console.log(`${camel.camel.id} - ${camel.completionPercentage}`);
        });
    }

    raceDrawing.drawCamels(race);

    window.requestAnimationFrame(gameLoop);
}

window.onload = () => { init() };