// Time
let secondsPassed: number;
let oldTimeStamp: number = 0;

// Recruitment
let camel: Camel;
let lastUsedId = 0;
let recruitmentService: RecruitmentService;
let cashMoney = 100;

// Race
let raceCamelCanvas: HTMLCanvasElement;
let raceBackgroundCanvas: HTMLCanvasElement;
let raceSimulation: RaceSimulation;
let raceDrawing: RaceDrawing;
let race: Race;
let startRace = new Event("startRace");

function init() {
    // Camel
    recruitmentService = new RecruitmentService(3);
    
    // Race
    raceBackgroundCanvas = CanvasService.getCanvas('1', 'race-background');
    raceCamelCanvas = CanvasService.getCanvas('2', 'race-camel');
    raceDrawing = new RaceDrawing(raceBackgroundCanvas, raceCamelCanvas);
    raceSimulation = new RaceSimulation();
    
    document.addEventListener(
        "startRace",
        (_: any) => {
            race = raceSimulation.createRace(camel, 1000);
            raceSimulation.startRace(race);
            raceDrawing.drawRaceCourse();
            window.requestAnimationFrame(gameLoop);
        },
        false
    );
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
