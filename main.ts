let secondsPassed: number;
let oldTimeStamp: number;

let racingService: RaceService;
let camel: Camel;
let lastUsedId = 0;

function init() {
    racingService = new RaceService();
    camel = new Camel(++lastUsedId, InitCamelQuality.High);
    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp: number) {
    secondsPassed = Math.min((timeStamp - oldTimeStamp) / 1000, 0.1);
    oldTimeStamp = timeStamp;

    window.requestAnimationFrame(gameLoop);
}

window.onload = () => { init() };