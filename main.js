"use strict";
class GlobalStaticConstants {
    static backgroundColour = "#e8d7a7";
}
class CanvasBtnService {
    canvas;
    constructor(canvas) {
        this.canvas = canvas;
    }
    getMousePosition(event) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }
    isInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
    }
    drawBtn = (context, rect, radius, backgroundColour, borderColour, fontColour, text) => {
        context.beginPath();
        context.roundRect(rect.x, rect.y, rect.width, rect.height, radius);
        context.fillStyle = backgroundColour;
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = borderColour;
        context.stroke();
        context.closePath();
        context.font = '30pt Garamond';
        context.fillStyle = fontColour;
        context.textAlign = "center";
        context.fillText(text, rect.x + rect.width / 2, rect.y + 3 * rect.height / 4, rect.x + rect.width);
    };
    displayHoverState = (context, rect, radius, borderColour, fontColour, text) => {
        this.drawBtn(context, rect, radius, borderColour, borderColour, fontColour, text);
    };
    createBtn(xStart, yStart, width, height, radius, backgroundColour, borderColour, fontColour, onclickFunction, text) {
        var rect = {
            x: xStart,
            y: yStart,
            width: width,
            height: height
        };
        // Binding the click event on the canvas
        var context = this.canvas.getContext('2d');
        this.canvas.addEventListener('click', (event) => {
            let mousePos = this.getMousePosition(event);
            if (this.isInside(mousePos, rect)) {
                onclickFunction();
            }
        }, false);
        this.canvas.addEventListener('mousemove', (event) => {
            let mousePos = this.getMousePosition(event);
            if (this.isInside(mousePos, rect)) {
                this.displayHoverState(context, rect, radius, borderColour, fontColour, text);
            }
            else {
                this.drawBtn(context, rect, radius, backgroundColour, borderColour, fontColour, text);
            }
        }, false);
        this.drawBtn(context, rect, radius, backgroundColour, borderColour, fontColour, text);
    }
}
class CanvasNames {
    static Recruitment = 'recruitmentCanvas';
    static RaceBackground = 'race-background';
    static RaceCamel = 'race-camel';
    static RaceSelection = 'race-selection';
    static MapOverview = 'map-overview';
    static GymCamel = 'gym-camel';
    static GymBackground = 'gym-background';
}
class CanvasService {
    static createCanvas(zIndex, name = "default") {
        const canvas = document.createElement('canvas');
        canvas.setAttribute("id", `canvas-${name}`);
        document.body.appendChild(canvas);
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.style.position = 'absolute';
        canvas.style.zIndex = zIndex;
        // Set actual size in memory (scaled to account for extra pixel density).
        var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
        canvas.width = Math.floor(width * scale);
        canvas.height = Math.floor(height * scale);
        const ctx = canvas.getContext('2d');
        // Normalize coordinate system to use css pixels.
        ctx.scale(scale, scale);
        return canvas;
    }
    static getCurrentCanvas() {
        return Array.from(document.querySelectorAll("canvas")).sort(c => +c.style.zIndex)[0];
    }
    static setCanvasZIndex(canvasName, zIndex) {
        this.getCanvasByName(canvasName).style.zIndex = `${zIndex}`;
    }
    static bringCanvasToTop(canvasName) {
        const allCanvases = Array.from(document.querySelectorAll("canvas"));
        const getMax = (a, b) => Math.max(a, b);
        const maxZIndex = allCanvases?.map(c => +c.style.zIndex).reduce(getMax, 0);
        this.setCanvasZIndex(canvasName, maxZIndex + 1);
    }
    static resetCanvases() {
        const allCanvases = Array.from(document.querySelectorAll("canvas"));
        allCanvases.forEach(c => this.setCanvasZIndex(c.id, 0));
    }
    static hideCanvas(canvasName) {
        this.getCanvasByName(canvasName).style.display = "none";
    }
    static hideAllCanvas() {
        const allCanvases = Array.from(document.querySelectorAll("canvas"));
        allCanvases.forEach(c => c.style.display = "none");
    }
    static showAllCanvas() {
        const allCanvases = Array.from(document.querySelectorAll("canvas"));
        allCanvases.forEach(c => c.style.display = "initial");
    }
    static showCanvas(canvasName) {
        this.getCanvasByName(canvasName).style.display = "initial";
    }
    static getCanvasByName(canvasName) {
        const canvas = document.querySelector(`#canvas-${canvasName}`);
        if (!canvas) {
            throw "`No canvas found with name: ${canvasName}`";
        }
        return canvas;
    }
}
class CashMoneyService {
    static drawCashMoney(ctx) {
        var img = new Image();
        img.src = './egyptian-pound.jpg';
        img.onload = function () {
            ctx.drawImage(img, window.innerWidth - 450, window.innerHeight - 150, 400, 125);
            ctx.fillStyle = '#e8be9e';
            ctx.fillRect(window.innerWidth - 375, window.innerHeight - 125, 250, 25);
            ctx.font = '30pt Garamond';
            ctx.fillStyle = '#000';
            ctx.textAlign = "center";
            ctx.fillText('Cash money: ' + cashMoney, window.innerWidth - 250, window.innerHeight - 102, 250);
        };
    }
}
class CubeService {
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
    }
    drawCube(coordX, coordY, sideLength, colour, height = 0, xStart = 0, yStart = 0) {
        const { x, y } = ImportantService.ConvertCoordToReal(coordX, coordY, sideLength, height, xStart, yStart);
        // left
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x - sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x - sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 10);
        this.ctx.fill();
        // right
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x + sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 0);
        this.ctx.fill();
        // top
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 0.5);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 20);
        this.ctx.fill();
        this.ctx.fillStyle = '#000000';
        // this.ctx.fillText(coordX + ',' + coordY, x, y);
    }
    shadeColor(colour, percent) {
        colour = colour.substring(1);
        const num = parseInt(colour, 16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
}
class ImportantService {
    static ConvertCoordToReal(coordX, coordY, sideLength, height = 0, xStart = 0, yStart = 0) {
        const xOffset = window.innerWidth / 2;
        coordX = coordX * 50 / sideLength;
        coordY = coordY * 50 / sideLength;
        const x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * 10;
        const y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + (xStart + yStart) * 5;
        return { x, y };
    }
}
class LeaderboardService {
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
        this._camelCubeService = new CubeService(ctx);
    }
    _camelCubeService;
    drawLeaderboard() {
        const cols = Math.ceil(race.racingCamels.length / 5);
        let height = 0;
        race.racingCamels.sort((a, b) => b.completionPercentage - a.completionPercentage).forEach(racingCamel => {
            this.drawCamel(racingCamel, height);
            height -= 5;
        });
    }
    isCamelUserOwned(racingCamel) {
        return racingCamel == camel;
    }
    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    getProgressBarColour(color1, color2, weight) {
        var w1 = weight;
        var w2 = 1 - w1;
        var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
            Math.round(color1[1] * w1 + color2[1] * w2),
            Math.round(color1[2] * w1 + color2[2] * w2)];
        return "#" + this.componentToHex(rgb[0]) + this.componentToHex(rgb[1]) + this.componentToHex(rgb[2]);
    }
    drawCamel(camel, heightOffset) {
        const x = 5.5;
        const y = -6.5;
        this._camelCubeService.drawCube(x, y, 10, camel.camel.color, 1.5 + heightOffset, 0, -3);
        this._camelCubeService.drawCube(x, y, 10, camel.camel.color, 0 + heightOffset, 0, -2);
        this._camelCubeService.drawCube(x, y, 10, camel.camel.color, 1 + heightOffset, 0, -2);
        this._camelCubeService.drawCube(x, y, 10, camel.camel.color, 1 + heightOffset, 0, -1);
        this._camelCubeService.drawCube(x, y, 10, camel.camel.color, 2 + heightOffset, 0, -1);
        this._camelCubeService.drawCube(x, y, 10, camel.camel.color, heightOffset);
        this._camelCubeService.drawCube(x, y, 10, camel.camel.color, 1 + heightOffset);
        if (this.isCamelUserOwned(camel.camel)) {
            this.ctx.fillStyle = '#96876e';
            this.ctx.fillText('Your camel', window.innerWidth - 100, 59 - heightOffset * 10);
        }
        this.ctx.fillStyle = '#000';
        this.ctx.font = '10pt Garamond';
        const completionPercentage = Math.min(1, Math.round(camel.completionPercentage * 100) / 100);
        this.ctx.beginPath();
        this.ctx.fillStyle = '#fff';
        this.ctx.roundRect(window.innerWidth - 100, 70 - heightOffset * 10, 80, 10, 5);
        this.ctx.fill();
        this.ctx.closePath();
        const colour = this.getProgressBarColour([255, 238, 150], [61, 204, 83], 1 - camel.completionPercentage);
        this.ctx.beginPath();
        this.ctx.fillStyle = colour;
        this.ctx.roundRect(window.innerWidth - 100, 70 - heightOffset * 10, 80 * completionPercentage, 10, 5);
        this.ctx.fill();
        this.ctx.closePath();
    }
}
// Time
let secondsPassed;
let oldTimeStamp = 0;
// Recruitment
let camel;
let lastUsedId = 0;
let recruitmentService;
let cashMoney = 100;
// Race
let raceCamelCanvas;
let raceBackgroundCanvas;
let raceSimulation;
let raceSelection;
let raceDrawing;
let gymDrawing;
let race;
let startRace = new Event("startRace");
let leaderboardService;
let enterRaceSelection = new Event("enterRaceSelection");
// Map
let map;
// Audio
let musicService;
function init() {
    // Camel
    CanvasService.createCanvas('3', CanvasNames.Recruitment);
    CanvasService.createCanvas('1', CanvasNames.RaceBackground);
    CanvasService.createCanvas('2', CanvasNames.RaceCamel);
    CanvasService.createCanvas('4', CanvasNames.MapOverview);
    CanvasService.createCanvas('1', CanvasNames.GymCamel);
    CanvasService.createCanvas('0', CanvasNames.GymBackground);
    CanvasService.createCanvas('5', CanvasNames.RaceSelection);
    recruitmentService = new RecruitmentService();
    // Race
    raceDrawing = new RaceDrawing();
    raceSimulation = new RaceSimulation();
    raceSelection = new RaceSelection();
    leaderboardService = new LeaderboardService(CanvasService.getCanvasByName(CanvasNames.RaceCamel).getContext("2d"));
    // Gym
    gymDrawing = new GymDrawing();
    // Map
    CanvasService.hideAllCanvas();
    MapOverview.showMap();
    MapOverview.renderMap();
    // Audio
    musicService = new MusicService();
    window.addEventListener('keydown', () => {
        musicService.startAudio();
    });
    document.addEventListener("enterRaceSelection", async (_) => {
        CanvasService.hideAllCanvas();
        CanvasService.showCanvas(CanvasNames.RaceSelection);
        CanvasService.bringCanvasToTop(CanvasNames.RaceSelection);
        raceSelection.drawSelectionScreen();
    }, false);
    document.addEventListener("startRace", async (_) => {
        CanvasService.hideAllCanvas();
        CanvasService.showCanvas(CanvasNames.RaceBackground);
        CanvasService.showCanvas(CanvasNames.RaceCamel);
        CanvasService.bringCanvasToTop(CanvasNames.RaceBackground);
        CanvasService.bringCanvasToTop(CanvasNames.RaceCamel);
        musicService.setAudio("RaceAudio");
        musicService.startAudio();
        const delay = (ms) => new Promise(res => setTimeout(res, ms));
        raceDrawing.drawRaceCourse(race);
        window.requestAnimationFrame(gameLoop);
        await delay(8500).then(_ => {
            raceSimulation.startRace(race);
        });
    }, false);
    // document.addEventListener(
    //     "goToGym",
    //     (_: any) => {
    //         gymDrawing.drawGym();
    //         window.requestAnimationFrame(gameLoop);
    //     },
    //     false
    // );
}
function gameLoop(timeStamp) {
    secondsPassed = Math.min((timeStamp - oldTimeStamp) / 1000, 0.1);
    oldTimeStamp = timeStamp;
    if (!!race && race.inProgress) {
        raceSimulation.simulateRaceStep(race);
    }
    raceDrawing.drawCamels(race);
    leaderboardService.drawLeaderboard();
    window.requestAnimationFrame(gameLoop);
}
window.onload = () => { init(); };
class MapOverview {
    static showMap() {
        CanvasService.bringCanvasToTop(CanvasNames.MapOverview);
        CanvasService.showCanvas(CanvasNames.MapOverview);
    }
    static hideMap() {
        CanvasService.hideCanvas(CanvasNames.MapOverview);
    }
    static getMousePosition(event) {
        const canvas = CanvasService.getCanvasByName(CanvasNames.MapOverview);
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }
    static renderMap() {
        const canvas = CanvasService.getCanvasByName(CanvasNames.MapOverview);
        const ctx = canvas?.getContext("2d");
        if (!ctx)
            return;
        const scaleToWidth = window.innerHeight > 0.815 * window.innerWidth;
        let rect = {
            x: 0,
            y: 0,
            width: window.innerHeight / 0.815,
            height: window.innerHeight
        };
        if (scaleToWidth) {
            rect = {
                x: 0,
                y: 0,
                width: window.innerWidth,
                height: 0.815 * window.innerWidth
            };
        }
        const img = new Image();
        img.src = './graphics/camelmap-nobreed.svg';
        ctx.drawImage(img, rect.x, rect.y, rect.width, rect.height);
        canvas.addEventListener('click', (event) => {
            const mousePosition = this.getMousePosition(event);
            if (mousePosition.x < rect.width / 2 && mousePosition.y < rect.height / 2) {
                CanvasService.showAllCanvas();
                this.hideMap();
                CanvasService.bringCanvasToTop(CanvasNames.Recruitment);
            }
            else if (mousePosition.x > rect.width / 2 && mousePosition.y < rect.height / 2) {
                CanvasService.showAllCanvas();
                this.hideMap();
                CanvasService.bringCanvasToTop(CanvasNames.GymBackground);
                CanvasService.bringCanvasToTop(CanvasNames.GymCamel);
                (new GymDrawing).drawGym();
            }
            else if (mousePosition.x > rect.width / 2 && mousePosition.y > rect.height / 2) {
                console.log("xxx");
            }
            else if (mousePosition.x < rect.width / 2 && mousePosition.y > rect.height / 2) {
                if (!!camel) {
                    document.dispatchEvent(enterRaceSelection);
                }
            }
        }, false);
        CashMoneyService.drawCashMoney(ctx);
    }
}
class RecruitmentService {
    constructor() {
        this._canvas = CanvasService.getCanvasByName(CanvasNames.Recruitment);
        this._ctx = this._canvas.getContext('2d');
        this._camelCubeService = new CubeService(this._ctx);
        this.drawInitCanvas();
    }
    _canvas;
    _ctx;
    _camelCubeService;
    _recruitedCamel = false;
    goToRecruitmentArea() {
        this._canvas.style.zIndex = '99';
    }
    leaveRecruitmentArea = () => {
        CanvasService.hideAllCanvas();
        MapOverview.showMap();
        MapOverview.renderMap();
    };
    validateEnoughCashMoney(cost) {
        return cashMoney - cost >= 0;
    }
    leaveRecruitmentAreaIfSuccessfulRecruitment = () => {
        if (this._recruitedCamel) {
            camel = new Camel(++lastUsedId, InitCamelQuality.High);
            this.leaveRecruitmentArea();
        }
    };
    tryBuyCamel(cost) {
        const camelAlreadyExists = camel !== undefined && camel !== null;
        // if (camelAlreadyExists) {
        // alert ('Already recruited a camel!');
        // return;
        // }
        if (!this.validateEnoughCashMoney(cost)) {
            alert('Not enough cash money!');
            return;
        }
        cashMoney = cashMoney - cost;
        alert(camelAlreadyExists ? 'Recruited a new replacement camel!' : 'Recruited a camel!');
        this._recruitedCamel = true;
    }
    spendHighCashMoney = () => {
        this.tryBuyCamel(300);
        this.leaveRecruitmentAreaIfSuccessfulRecruitment();
    };
    spendMediumCashMoney = () => {
        this.tryBuyCamel(200);
        this.leaveRecruitmentAreaIfSuccessfulRecruitment();
    };
    spendLowCashMoney = () => {
        this.tryBuyCamel(100);
        this.leaveRecruitmentAreaIfSuccessfulRecruitment();
    };
    drawInitCanvas() {
        this._ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        this._ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        let btnService = new CanvasBtnService(this._canvas);
        const radius = 25;
        btnService.createBtn(240, 250, 550, 50, radius, '#cc807a', '#f2ada7', '#fff', this.spendLowCashMoney, 'Recruit lowly camel - $100');
        this.drawCamel(-3.25, 4.25, '#cc807a');
        btnService.createBtn(840, 250, 550, 50, radius, '#debb49', '#f5d671', '#fff', this.spendMediumCashMoney, 'Recruit mediocre camel - $200');
        this.drawCamel(2.75, -1.75, '#debb49');
        btnService.createBtn(540, 650, 550, 50, radius, '#569929', '#7ac24a', '#fff', this.spendHighCashMoney, 'Recruit high camel - $300');
        this.drawCamel(7.75, 9.25, '#509124');
        CashMoneyService.drawCashMoney(this._ctx);
    }
    drawCamel = (xCoord, yCoord, colour) => {
        this._camelCubeService.drawCube(xCoord, yCoord, 40, colour, 1.5, 0, -10);
        this._camelCubeService.drawCube(xCoord, yCoord, 40, colour, 0, 0, -6);
        this._camelCubeService.drawCube(xCoord, yCoord, 40, colour, 1, 0, -6);
        this._camelCubeService.drawCube(xCoord, yCoord, 40, colour, 1, 0, -2);
        this._camelCubeService.drawCube(xCoord, yCoord, 40, colour, 2, 0, -2);
        this._camelCubeService.drawCube(xCoord, yCoord, 40, colour, 0, 0, 2);
        this._camelCubeService.drawCube(xCoord, yCoord, 40, colour, 1, 0, 2);
    };
}
class MusicService {
    HomeScreenAudio;
    RaceAudio;
    currentAudio = "HomeScreenAudio";
    constructor() {
        this.HomeScreenAudio = new Audio("audio/Mii Camel.mp3");
        this.RaceAudio = new Audio("audio/Camel Mall.mp3");
        this.HomeScreenAudio.loop = true;
        this.RaceAudio.loop = true;
    }
    startAudio() {
        if (this.currentAudio == "HomeScreenAudio") {
            this.RaceAudio.pause();
            this.RaceAudio.currentTime = 0;
            this.HomeScreenAudio.play();
        }
        else if (this.currentAudio == "RaceAudio") {
            this.HomeScreenAudio.pause();
            this.HomeScreenAudio.currentTime = 0;
            this.RaceAudio.play();
        }
        else {
            this.HomeScreenAudio.pause();
            this.HomeScreenAudio.currentTime = 0;
            this.RaceAudio.pause();
            this.RaceAudio.currentTime = 0;
        }
    }
    setAudio(audioName) {
        this.currentAudio = audioName;
    }
}
class GymDrawing {
    constructor() {
        this._camelCanvas = CanvasService.getCanvasByName(CanvasNames.GymCamel);
        this._backgroundCanvas = CanvasService.getCanvasByName(CanvasNames.GymBackground);
        this.backgroundCubeService = new CubeService(this._backgroundCanvas.getContext("2d"));
        this.camelCubeService = new CubeService(this._camelCanvas.getContext("2d"));
    }
    _camelCanvas;
    _backgroundCanvas;
    backgroundCubeService;
    camelCubeService;
    drawGym() {
        const ctx = this._backgroundCanvas.getContext("2d");
        ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        const canvasColour = '#C2B280';
        this.drawFloor();
        this.drawTreadmill();
    }
    drawFloor() {
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                // if (race.track.filter(o => o[0] === i && o[1] === j).length > 0) {
                //     this.backgroundCubeService.drawCube(i, j, 50, '#5892a1', -0.2);
                // } else {
                const canvasColour = '#C2B280';
                this.backgroundCubeService.drawCube(i, j, 50, canvasColour);
                // }
            }
        }
    }
    drawTreadmill() {
        // Horizontal lines
        this.drawTreadmillHorizontalLine(7.1, '#999999');
        this.drawTreadmillHorizontalLine(7.2, '#999999');
        this.drawTreadmillHorizontalLine(7.3, '#444444');
        this.drawTreadmillHorizontalLine(7.4, '#999999');
        this.drawTreadmillHorizontalLine(7.5, '#999999');
        this.drawTreadmillHorizontalLine(7.6, '#444444');
        this.drawTreadmillHorizontalLine(7.7, '#999999');
        this.drawTreadmillHorizontalLine(7.8, '#999999');
        this.drawTreadmillHorizontalLine(7.9, '#444444');
        // Left bar
        this.drawTreadmillVerticalLine(7.1, '#000000');
        // Front bar
        this.drawTreadmillHorizontalLine(7, '#000000');
        // Right bar
        this.drawTreadmillVerticalLine(7.8, '#000000');
        this.drawTreadmillUppyDownyLine(7.1, 7, '#000000');
        this.drawTreadmillTopBar('#000000');
        this.drawTreadmillUppyDownyLine(7.8, 7, '#000000');
    }
    drawTreadmillUppyDownyLine(alongth, downth, color) {
        for (let i = 1; i < 10; i++) {
            this.backgroundCubeService.drawCube(downth, alongth, 5, color, i);
        }
    }
    drawTreadmillVerticalLine(alongth, color) {
        for (let i = 0; i < 10; i++) {
            this.backgroundCubeService.drawCube(7 + (i / 10), alongth, 5, color);
        }
    }
    drawTreadmillHorizontalLine(downth, color) {
        for (let i = 2; i < 8; i++) {
            this.backgroundCubeService.drawCube(downth, 7 + (i / 10), 5, color);
        }
    }
    drawTreadmillTopBar(color) {
        for (let i = 2; i < 8; i++) {
            this.backgroundCubeService.drawCube(7, 7 + (i / 10), 5, color, 9);
        }
    }
    // public drawCamels(race: Race) {
    //     const ctx = this._camelCanvas.getContext("2d")!;
    //     ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    //     race.racingCamels.forEach(camel => this.drawCamel(camel, race));
    // }
    drawCamel(camel, race) {
        camel.handleJumpTick();
        const numberOfRaceTrackCoords = race.track.length;
        const currectCoordIndex = Math.floor(camel.completionPercentage * numberOfRaceTrackCoords);
        const currentCoordPercentage = currectCoordIndex / numberOfRaceTrackCoords;
        const nextCoordPercentage = (currectCoordIndex + 1) / numberOfRaceTrackCoords;
        const percentageTowardsNextCoord = (camel.completionPercentage - currentCoordPercentage) /
            (nextCoordPercentage - currentCoordPercentage);
        const currentCoord = race.track[currectCoordIndex];
        const nextCoord = currectCoordIndex < numberOfRaceTrackCoords - 1 ? race.track[currectCoordIndex + 1] : currentCoord;
        const movingInPositiveX = currentCoord[0] < nextCoord[0];
        const movingInNegativeX = currentCoord[0] > nextCoord[0];
        const movingInPositiveY = currentCoord[1] < nextCoord[1];
        const movingInNegativeY = currentCoord[1] > nextCoord[1];
        const offset = percentageTowardsNextCoord;
        const newXCoord = movingInPositiveX ? currentCoord[0] + offset :
            movingInNegativeX ? currentCoord[0] - offset :
                currentCoord[0];
        const newYCoord = movingInPositiveY ? currentCoord[1] + offset :
            movingInNegativeY ? currentCoord[1] - offset :
                currentCoord[1];
        if (movingInNegativeY) {
            this.drawNegativeYCamel(newXCoord, newYCoord, camel);
        }
        else if (movingInNegativeX) {
            this.drawNegativeXCamel(newXCoord, newYCoord, camel);
        }
        else if (movingInPositiveY) {
            this.drawPositiveYCamel(newXCoord, newYCoord, camel);
        }
        else if (movingInPositiveX) {
            this.drawPositiveXCamel(newXCoord, newYCoord, camel);
        }
    }
    drawNegativeYCamel(newXCoord, newYCoord, camel) {
        const xCoord = newXCoord + 0.25;
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1.5 + camel.jumpHeight, 0, -3);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 0 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 2 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, camel.jumpHeight);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1 + camel.jumpHeight);
    }
    drawNegativeXCamel(newXCoord, newYCoord, camel) {
        const xCoord = newXCoord;
        const yCoord = newYCoord + 0.5;
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1.5 + camel.jumpHeight, -2, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 0 + camel.jumpHeight, -1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1 + camel.jumpHeight, -1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 0, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 2 + camel.jumpHeight, 0, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 0 + camel.jumpHeight, 1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 1, -1.5);
    }
    drawPositiveYCamel(newXCoord, newYCoord, camel) {
        const xCoord = newXCoord + 0.25;
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 0 + camel.jumpHeight, 0, -3);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 0, -3);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 2 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 0 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1.5 + camel.jumpHeight, 0);
    }
    drawPositiveXCamel(newXCoord, newYCoord, camel) {
        const xCoord = newXCoord;
        const yCoord = newYCoord + 0.5;
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 0 + camel.jumpHeight, -1.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1 + camel.jumpHeight, -1.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1 + camel.jumpHeight, -0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 2 + camel.jumpHeight, -0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 0 + camel.jumpHeight, 0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1.5 + camel.jumpHeight, 1.5, -1.5);
    }
}
class GymSession {
    _sessionActive = false;
    startSession() {
        this._sessionActive = true;
    }
    endSession() {
        if (!this._sessionActive) {
            return;
        }
        this._sessionActive = false;
    }
}
class TrainSession extends GymSession {
    _skill;
    _xpGained = 0;
    _staminaRemaining = 0;
    constructor(_skill, _maxStamina) {
        super();
        this._skill = _skill;
        this._staminaRemaining = _maxStamina;
    }
    startSession() {
        this._xpGained = 0;
        super.startSession();
    }
    onSuccessfulAction() {
        // Review
        if (!this._sessionActive) {
            return;
        }
        this._xpGained += 9;
        this._staminaRemaining += -3; // TODO: range of values
        this.postAction();
    }
    onFailedAction() {
        if (!this._sessionActive) {
            return;
        }
        this._staminaRemaining += -10;
        return this.postAction();
    }
    postAction() {
        if (!this._sessionActive) {
            return;
        }
        if (this._staminaRemaining <= 0) {
            this._xpGained /= 2;
            this.endSession();
        }
    }
    endSession() {
        super.endSession();
        this._skill.addXp(this._xpGained);
    }
}
class SpaSession extends GymSession {
    _skill;
    _startTime = 0;
    _staiminaGained = 0;
    constructor(_skill) {
        super();
        this._skill = _skill;
    }
    startSession() {
        this._startTime = secondsPassed;
        super.startSession();
    }
    endSession() {
        super.endSession();
        this._staiminaGained = secondsPassed - this._startTime;
        if (this._staiminaGained < this._skill.level) {
            this._skill.addSkillValue(this._staiminaGained);
        }
        else {
            this._skill.addSkillValue(this._skill.level);
        }
    }
}
class Gym {
    getTreadmillSession(camel) {
        return new TrainSession(camel.camelSkills.sprintSpeed, camel.camelSkills.stamina.skillValue);
    }
    getSpaSession(camel) {
        if (cashMoney >= 50) {
            cashMoney += -50;
            return new SpaSession(camel.camelSkills.stamina);
        }
    }
}
var InitCamelQuality;
(function (InitCamelQuality) {
    InitCamelQuality[InitCamelQuality["Low"] = 0] = "Low";
    InitCamelQuality[InitCamelQuality["Medium"] = 1] = "Medium";
    InitCamelQuality[InitCamelQuality["High"] = 2] = "High";
})(InitCamelQuality || (InitCamelQuality = {}));
class Camel {
    id;
    constructor(id, quality) {
        this.id = id;
        let sprintSpeed = Math.ceil(Math.random() * 10 * (quality + 1));
        let agility = Math.ceil(Math.random() * 10 * (quality + 1));
        let stamina = Math.ceil(Math.random() * 10 * (quality + 1));
        this.camelSkills = new CamelSkillsBuilder()
            .withSprintSpeed(sprintSpeed)
            .withAgility(agility)
            .withStamina(stamina)
            .build();
    }
    color = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    camelSkills;
}
class RaceDrawing {
    constructor() {
        this._backgroundCanvas = CanvasService.getCanvasByName(CanvasNames.RaceBackground);
        this._camelCanvas = CanvasService.getCanvasByName(CanvasNames.RaceCamel);
        this.backgroundCubeService = new CubeService(this._backgroundCanvas.getContext("2d"));
        this.camelCubeService = new CubeService(this._camelCanvas.getContext("2d"));
    }
    _backgroundCanvas;
    _camelCanvas;
    backgroundCubeService;
    camelCubeService;
    drawRaceCourse(race) {
        const ctx = this._backgroundCanvas.getContext("2d");
        ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        const canvasColour = '#C2B280';
        const lighterColour = '#d8bd80';
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if (race.track.filter(o => o[0] === i && o[1] === j).length > 0) {
                    this.backgroundCubeService.drawCube(i, j, 50, '#938b71', -0.2);
                }
                else {
                    const height = Math.random() / 3;
                    const colour = height < 0.1 ? canvasColour : lighterColour;
                    this.backgroundCubeService.drawCube(i, j, 50, colour, height);
                }
            }
        }
    }
    drawCamels(race) {
        const ctx = this._camelCanvas.getContext("2d");
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        race.racingCamels.forEach(camel => this.drawCamel(camel, race));
    }
    drawCamel(camel, race) {
        const numberOfRaceTrackCoords = race.track.length;
        const completionPercentage = Math.min(camel.completionPercentage, 1);
        const currectCoordIndex = Math.floor(completionPercentage * numberOfRaceTrackCoords);
        const currentCoordPercentage = currectCoordIndex / numberOfRaceTrackCoords;
        const nextCoordPercentage = (currectCoordIndex + 1) / numberOfRaceTrackCoords;
        const percentageTowardsNextCoord = (completionPercentage - currentCoordPercentage) /
            (nextCoordPercentage - currentCoordPercentage);
        const currentCoord = currectCoordIndex < numberOfRaceTrackCoords ? race.track[currectCoordIndex] : race.track[currectCoordIndex - 1];
        const nextCoord = currectCoordIndex < numberOfRaceTrackCoords - 1 ? race.track[currectCoordIndex + 1] : currentCoord;
        const movingInPositiveX = currentCoord[0] < nextCoord[0];
        const movingInNegativeX = currentCoord[0] > nextCoord[0];
        const movingInPositiveY = currentCoord[1] < nextCoord[1];
        const movingInNegativeY = currentCoord[1] > nextCoord[1];
        const offset = percentageTowardsNextCoord;
        const newXCoord = movingInPositiveX ? currentCoord[0] + offset :
            movingInNegativeX ? currentCoord[0] - offset :
                currentCoord[0];
        const newYCoord = movingInPositiveY ? currentCoord[1] + offset :
            movingInNegativeY ? currentCoord[1] - offset :
                currentCoord[1];
        if (movingInNegativeY) {
            this.drawNegativeYCamel(newXCoord, newYCoord, camel);
        }
        else if (movingInNegativeX) {
            this.drawNegativeXCamel(newXCoord, newYCoord, camel);
        }
        else if (movingInPositiveY) {
            this.drawPositiveYCamel(newXCoord, newYCoord, camel);
        }
        else if (movingInPositiveX) {
            this.drawPositiveXCamel(newXCoord, newYCoord, camel);
        }
    }
    drawNegativeYCamel(newXCoord, newYCoord, camel) {
        const xCoord = newXCoord + 0.25;
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1.5 + camel.jumpHeight, 0, -3);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 0 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 2 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, camel.jumpHeight);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1 + camel.jumpHeight);
    }
    drawNegativeXCamel(newXCoord, newYCoord, camel) {
        const xCoord = newXCoord;
        const yCoord = newYCoord + 0.5;
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1.5 + camel.jumpHeight, -2, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 0 + camel.jumpHeight, -1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1 + camel.jumpHeight, -1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 0, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 2 + camel.jumpHeight, 0, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 0 + camel.jumpHeight, 1, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 1, -1.5);
    }
    drawPositiveYCamel(newXCoord, newYCoord, camel) {
        const xCoord = newXCoord + 0.25;
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 0 + camel.jumpHeight, 0, -3);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 0, -3);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 2 + camel.jumpHeight, 0, -2);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 0 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 0, -1);
        this.camelCubeService.drawCube(xCoord, newYCoord, 10, camel.camel.color, 1.5 + camel.jumpHeight, 0);
    }
    drawPositiveXCamel(newXCoord, newYCoord, camel) {
        const xCoord = newXCoord;
        const yCoord = newYCoord + 0.5;
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 0 + camel.jumpHeight, -1.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1 + camel.jumpHeight, -1.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1 + camel.jumpHeight, -0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 2 + camel.jumpHeight, -0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 0 + camel.jumpHeight, 0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1 + camel.jumpHeight, 0.5, -1.5);
        this.camelCubeService.drawCube(xCoord, yCoord, 10, camel.camel.color, 1.5 + camel.jumpHeight, 1.5, -1.5);
    }
}
class RaceSelection {
    constructor() {
        this._canvas = CanvasService.getCanvasByName(CanvasNames.RaceSelection);
        this._ctx = this._canvas.getContext('2d');
    }
    _ctx;
    _canvas;
    drawSelectionScreen() {
        const btnService = new CanvasBtnService(this._canvas);
        this._ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        this._ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        const radius = 25;
        const enterStreetRace = () => this.selectRace(40, 100, 0, 5);
        const enterLocalDerby = () => this.selectRace(80, 500, 200, 8);
        const enterWorldCup = () => this.selectRace(120, 10000, 300, 15);
        const middleX = this._canvas.width / window.devicePixelRatio / 2;
        const middleY = this._canvas.height / window.devicePixelRatio / 2;
        btnService.createBtn(middleX - 400, middleY / 2, 800, 50, radius, '#cc807a', '#f2ada7', '#fff', enterStreetRace, 'Street race | Entry $0 | Prize $100');
        btnService.createBtn(middleX - 400, middleY, 800, 50, radius, '#debb49', '#f5d671', '#fff', enterLocalDerby, 'Local derby | Entry $200 | Prize $500');
        btnService.createBtn(middleX - 400, middleY * 4 / 3, 800, 50, radius, '#569929', '#7ac24a', '#fff', enterWorldCup, 'World cup | Entry $300 | Prize $10000');
        CashMoneyService.drawCashMoney(this._ctx);
    }
    selectRace(raceLength, prizeMoney, entryFee, raceSize) {
        if (cashMoney >= entryFee) {
            cashMoney -= entryFee;
        }
        race = raceSimulation.createRace(camel, raceLength, prizeMoney, raceSize);
        document.dispatchEvent(startRace);
    }
}
class RaceSimulation {
    _finishedCamels = [];
    createRace(enteringCamel, raceLength, prizeCashMoney, raceSize) {
        const camelsInRace = [enteringCamel];
        for (let i = 0; i < raceSize; i++) {
            // TODO randomise quality and allow quality about init camel quality
            const competitorCamel = new Camel(++lastUsedId, InitCamelQuality.High);
            camelsInRace.push(competitorCamel);
        }
        const trackCreator = new RaceTrackCreator();
        const track = trackCreator.CreateTrack(raceLength);
        return new Race(raceLength, camelsInRace, track, prizeCashMoney);
    }
    startRace(race) {
        if (race.length <= 0) {
            throw new Error('Tried to start a race with bad length');
        }
        if (race.racingCamels.length === 0) {
            throw new Error('Tried to start a race with no camels');
        }
        race.inProgress = true;
        race.racingCamels.forEach(x => x.startJump());
    }
    simulateRaceStep(race) {
        race.racingCamels.forEach(racingCamel => {
            if (this._finishedCamels.indexOf(racingCamel) > -1) {
                return;
            }
            racingCamel.handleJumpTick();
            const hasSprint = racingCamel.stamina > 0;
            const baseMovementSpeed = hasSprint ? 5 + (racingCamel.camel.camelSkills.sprintSpeed.level) : 0.5 * racingCamel.camel.camelSkills.sprintSpeed.level;
            racingCamel.raceSpeedPerSecond = baseMovementSpeed * Math.random() / 5;
            const completedDistance = race.length * racingCamel.completionPercentage;
            const newCompletedDistance = completedDistance + secondsPassed * racingCamel.raceSpeedPerSecond;
            racingCamel.completionPercentage = newCompletedDistance / race.length;
            if (racingCamel.completionPercentage >= 1) {
                this._finishedCamels.push(racingCamel);
                if (this._finishedCamels.length >= 3) {
                    this.handleFinishedRace(race);
                }
            }
            if (hasSprint) {
                racingCamel.stamina -= 0.1; //0.06
            }
        });
    }
    handleFinishedRace(race) {
        race.inProgress = false;
        const position = this._finishedCamels.map(o => o.camel).indexOf(camel);
        const prizeCashMoney = this.getPrizeMoney(race, position);
        cashMoney += prizeCashMoney;
        this._finishedCamels = [];
        musicService.setAudio('HomeScreenAudio');
        musicService.startAudio();
        CanvasService.hideAllCanvas();
        MapOverview.showMap();
        MapOverview.renderMap();
    }
    getPrizeMoney(race, position) {
        const prizePool = race.prizeCashMoney;
        if (position === 0) {
            return prizePool * 0.75;
        }
        if (position === 1) {
            return prizePool * 0.2;
        }
        if (position === 2) {
            return prizePool * 0.05;
        }
        return 0;
    }
}
class RaceTrackCreator {
    CreateTrack(length) {
        if (length <= 0) {
            throw new Error('Tried to create a track with invalid length');
        }
        const allCoords = [];
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                allCoords.push([i, j]);
            }
        }
        let track = [];
        while (track.length !== length) {
            track = [];
            let trackToAddCoord = allCoords[Math.floor(Math.random() * allCoords.length)];
            track.push(trackToAddCoord);
            for (var i = 0; i < length; i++) {
                const possibleMoves = allCoords
                    .filter(o => Math.abs(trackToAddCoord[0] - o[0]) + Math.abs(trackToAddCoord[1] - o[1]) === 1);
                const refinedPossibleMoves = [];
                possibleMoves.forEach((move) => {
                    const trackIntersections = track
                        .filter(o => Math.abs(move[0] - o[0]) + Math.abs(move[1] - o[1]) === 1)
                        .length;
                    if (trackIntersections <= 1) {
                        refinedPossibleMoves.push(move);
                    }
                });
                if (refinedPossibleMoves.length === 0) {
                    break;
                }
                trackToAddCoord = refinedPossibleMoves[Math.floor(Math.random() * refinedPossibleMoves.length)];
                track.push(trackToAddCoord);
            }
        }
        return Array.from(track);
    }
}
class Race {
    length;
    track;
    prizeCashMoney;
    constructor(length, camels, track, prizeCashMoney) {
        this.length = length;
        this.track = track;
        this.prizeCashMoney = prizeCashMoney;
        camels.forEach(camel => {
            const racingCamel = new RacingCamel(camel);
            this.racingCamels.push(racingCamel);
        });
    }
    racingCamels = [];
    inProgress = false;
    winner;
}
class RacingCamel {
    camel;
    constructor(camel) {
        this.camel = camel;
        this._initialVelocity = 5 + (this.camel.camelSkills.agility.level / 10);
        this.stamina = this.camel.camelSkills.stamina.level;
    }
    completionPercentage = 0;
    raceSpeedPerSecond = 0;
    stamina = 0;
    _jumpHeight = 0;
    get jumpHeight() {
        return this._jumpHeight;
    }
    _gravityAcceleration = 9.81;
    _scaleFactor = 20;
    _initialVelocity = 0;
    _currentVelocity = 0;
    startJump() {
        this._currentVelocity = this._initialVelocity;
    }
    handleJumpTick() {
        if (this.completionPercentage >= 1) {
            this._jumpHeight = 0;
            this._currentVelocity = 0;
            return;
        }
        if (this._currentVelocity == 0) {
            // Have to start the jump
            return;
        }
        this._jumpHeight += this._currentVelocity / this._scaleFactor;
        this._currentVelocity += -(this._gravityAcceleration) / this._scaleFactor;
        if (this._jumpHeight < 0) {
            this._jumpHeight = 0;
            this._currentVelocity = 0;
        }
        // Remove
        if (this._jumpHeight == 0) {
            this.startJump();
        }
    }
}
class CamelSkill {
    _name;
    constructor(_name) {
        this._name = _name;
        const xp = this.getXpRequiredForVirtualLevel(1);
        this._currentXp = xp;
        this._skillValue = this.level;
    }
    _minSkillLevel = 1;
    _maxSkillLevel = 99;
    _currentXp = 0;
    _skillValue = 0;
    get name() {
        return this._name;
    }
    getXpRequiredForVirtualLevel(level) {
        return (level - 1) * 100;
    }
    getVirtualLevelWithXp(xp) {
        return Math.floor(xp / 100) + 1;
    }
    setLevel(value) {
        this._currentXp = this.getXpRequiredForVirtualLevel(value);
    }
    get level() {
        const virtualLevel = this.getVirtualLevelWithXp(this._currentXp);
        if (virtualLevel <= this._minSkillLevel) {
            return this._minSkillLevel;
        }
        if (virtualLevel >= this._maxSkillLevel) {
            return this._maxSkillLevel;
        }
        return virtualLevel;
    }
    addSkillValue(value) {
        this._skillValue += value;
    }
    get skillValue() {
        return this._skillValue;
    }
    addXp(value) {
        this._currentXp += value;
        if (this.getVirtualLevelWithXp(this._currentXp) > this.getVirtualLevelWithXp(this._currentXp - value)) {
            this._skillValue = this.level;
        }
    }
}
class CamelSkills {
    sprintSpeed = new CamelSkill("Sprint Speed");
    stamina = new CamelSkill("Stamina");
    agility = new CamelSkill("Agility");
}
class CamelSkillsBuilder {
    _camelSkills = new CamelSkills();
    withSprintSpeed(value) {
        this._camelSkills.sprintSpeed.setLevel(value);
        return this;
    }
    withAgility(value) {
        this._camelSkills.agility.setLevel(value);
        return this;
    }
    withStamina(value) {
        this._camelSkills.stamina.setLevel(value);
        return this;
    }
    build() {
        return this._camelSkills;
    }
}
