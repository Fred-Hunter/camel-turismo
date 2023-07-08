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

// Map
let map: MapOverview;

function init() {
    // Camel
    recruitmentService = new RecruitmentService(3);
    
    // Race
    raceBackgroundCanvas = CanvasService.createCanvas('1', 'race-background');
    raceCamelCanvas = CanvasService.createCanvas('2', 'race-camel');
    raceDrawing = new RaceDrawing(raceBackgroundCanvas, raceCamelCanvas);
    raceSimulation = new RaceSimulation();

    // Map
    const mapCanvas = CanvasService.createCanvas('4','map-overview');
    map = new MapOverview(mapCanvas);
    CanvasService.hideCanvas('map-overview');
    
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
    }

    raceDrawing.drawCamels(race);

    window.requestAnimationFrame(gameLoop);
}

window.onload = () => { init() };
