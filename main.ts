let secondsPassed: number;
let oldTimeStamp: number;

let racingService: RaceService;
let camel: Camel;
let lastUsedId = 0;

let canvasService: CanvasService;
let recruitmentService: RecruitmentService;

function init() {
    racingService = new RaceService();
    camel = new Camel(++lastUsedId, InitCamelQuality.High);

    canvasService = new CanvasService();
    recruitmentService = new RecruitmentService(canvasService, 0);
    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp: number) {
    secondsPassed = Math.min((timeStamp - oldTimeStamp) / 1000, 0.1);
    oldTimeStamp = timeStamp;

    window.requestAnimationFrame(gameLoop);
}

window.onload = () => { init() };