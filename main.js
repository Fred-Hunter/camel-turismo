"use strict";
var CanvasService = /** @class */ (function () {
    function CanvasService() {
    }
    CanvasService.prototype.getCanvas = function (zIndex) {
        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        var width = window.innerWidth;
        var height = window.innerHeight;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.style.position = 'absolute';
        canvas.style.zIndex = zIndex;
        // Set actual size in memory (scaled to account for extra pixel density).
        var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
        canvas.width = Math.floor(width * scale);
        canvas.height = Math.floor(height * scale);
        var ctx = canvas.getContext('2d');
        // Normalize coordinate system to use css pixels.
        ctx.scale(scale, scale);
        return canvas;
    };
    return CanvasService;
}());
var Game = /** @class */ (function () {
    function Game(_canvas) {
        this._canvas = _canvas;
        this.draw = function () { };
        this.cubeService = new CubeService(_canvas.getContext("2d"));
    }
    Object.defineProperty(Game.prototype, "ctx", {
        get: function () {
            return this._canvas.getContext("2d");
        },
        enumerable: false,
        configurable: true
    });
    return Game;
}());
var CubeService = /** @class */ (function () {
    function CubeService(ctx) {
        this.ctx = ctx;
    }
    CubeService.prototype.drawHighlightIfMousedOver = function (coordX, coordY, sideLength, colour) {
        var xOffset = window.innerWidth / 2;
        var x = xOffset + (coordX - coordY) * sideLength;
        var y = (coordX + coordY) * 0.5 * sideLength + 100;
        // top
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 0.5);
        this.ctx.closePath();
        var isMousedOver = false; //this.ctx.isPointInPath(clientMouseX * window.devicePixelRatio, clientMouseY * window.devicePixelRatio);
        if (isMousedOver) {
            this.ctx.globalAlpha = 0.5;
            this.ctx.fillStyle = this.shadeColor(colour, 30);
            this.ctx.fill();
        }
        this.ctx.globalAlpha = 1;
        return isMousedOver;
    };
    CubeService.prototype.drawCubeArray = function (coordXStart, coordXEnd, coordYStart, coordYEnd, sideLength, colour, height) {
        if (height === void 0) { height = 0; }
        if (coordXStart > coordXEnd || coordYStart > coordYEnd) {
            return;
        }
        for (var i = coordXStart; i <= coordXEnd; i++) {
            for (var j = coordYStart; j <= coordYEnd; j++) {
                this.drawCube(i, j, sideLength, colour, height);
            }
        }
    };
    CubeService.prototype.drawCube = function (coordX, coordY, sideLength, colour, height, xStart, yStart) {
        if (height === void 0) { height = 0; }
        if (xStart === void 0) { xStart = 0; }
        if (yStart === void 0) { yStart = 0; }
        var xOffset = window.innerWidth / 2;
        coordX = coordX * 50 / sideLength;
        coordY = coordY * 50 / sideLength;
        var x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * 10;
        var y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + (xStart + yStart) * 5;
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
    };
    CubeService.prototype.drawLeft = function (coordX, coordY, sideLength, colour, height, xStart, yStart) {
        if (height === void 0) { height = 0; }
        if (xStart === void 0) { xStart = 0; }
        if (yStart === void 0) { yStart = 0; }
        var xOffset = window.innerWidth / 2;
        coordX = coordX * 50 / sideLength;
        coordY = coordY * 50 / sideLength;
        var x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * 10;
        var y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + (xStart + yStart) * 5;
        // left
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x - sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x - sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 10);
        this.ctx.fill();
    };
    CubeService.prototype.drawRight = function (coordX, coordY, sideLength, colour, height, xStart, yStart) {
        if (height === void 0) { height = 0; }
        if (xStart === void 0) { xStart = 0; }
        if (yStart === void 0) { yStart = 0; }
        var xOffset = window.innerWidth / 2;
        coordX = coordX * 50 / sideLength;
        coordY = coordY * 50 / sideLength;
        var x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * 10;
        var y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + (xStart + yStart) * 5;
        // right
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x + sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 0);
        this.ctx.fill();
    };
    CubeService.prototype.drawTop = function (coordX, coordY, sideLength, colour, height, xStart, yStart) {
        if (height === void 0) { height = 0; }
        if (xStart === void 0) { xStart = 0; }
        if (yStart === void 0) { yStart = 0; }
        var xOffset = window.innerWidth / 2;
        coordX = coordX * 50 / sideLength;
        coordY = coordY * 50 / sideLength;
        var x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * 10;
        var y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + (xStart + yStart) * 5;
        // top
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 0.5);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 20);
        this.ctx.fill();
    };
    CubeService.prototype.drawRealCube = function (x, y, sideLength, colour) {
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
    };
    CubeService.prototype.drawPyramid = function (coordX, coordY, sideLength, colour, height, xStart, yStart) {
        if (height === void 0) { height = 0; }
        if (xStart === void 0) { xStart = 0; }
        if (yStart === void 0) { yStart = 0; }
        var xOffset = window.innerWidth / 2;
        coordX = coordX * 50 / sideLength;
        coordY = coordY * 50 / sideLength;
        var x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * 10;
        var y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + yStart * 10;
        // left
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x - sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 10);
        this.ctx.fill();
        // right
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 0);
        this.ctx.fill();
        this.ctx.fill();
    };
    CubeService.prototype.shadeColor = function (colour, percent) {
        colour = colour.substring(1);
        var num = parseInt(colour, 16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    };
    return CubeService;
}());
var secondsPassed;
var oldTimeStamp;
var racingService;
function init() {
    racingService = new RaceService();
    window.requestAnimationFrame(gameLoop);
}
function gameLoop(timeStamp) {
    secondsPassed = Math.min((timeStamp - oldTimeStamp) / 1000, 0.1);
    oldTimeStamp = timeStamp;
    window.requestAnimationFrame(gameLoop);
}
window.onload = function () { init(); };
var RaceService = /** @class */ (function () {
    function RaceService() {
    }
    RaceService.prototype.createRace = function (length, camels) {
        if (camels.length <= 0) {
            throw new Error('Tried to create a race with no camels');
        }
        var raceCamels = [];
        camels.forEach(function (camel) {
        });
        raceCamels.push();
        var race = new Race(length);
        return race;
    };
    RaceService.prototype.startRace = function (race) {
        if (race.length <= 0) {
            throw new Error('Tried to start a race with bad length');
        }
        if (race.camels.length === 0) {
            throw new Error('Tried to start a race with bad number of camels');
        }
        race.inProgress = true;
    };
    RaceService.prototype.simulateRaceStep = function (race) {
        race.camels.forEach(function (racingCamel) {
            racingCamel.raceSpeedPerSecond = racingCamel.camel.sprintSpeed * 20 * Math.random();
            var completedDistance = race.length * racingCamel.completionPercentage;
            var newCompletedDistance = completedDistance + secondsPassed * racingCamel.raceSpeedPerSecond;
            racingCamel.completionPercentage = newCompletedDistance / race.length;
            if (racingCamel.completionPercentage >= 1) {
                race.inProgress = false;
            }
        });
    };
    return RaceService;
}());
var Race = /** @class */ (function () {
    function Race(length) {
        this.length = length;
        this.camels = [];
        this.inProgress = false;
    }
    return Race;
}());
var RacingCamel = /** @class */ (function () {
    function RacingCamel(camel) {
        this.camel = camel;
        this.completionPercentage = 0;
        this.raceSpeedPerSecond = 0;
    }
    return RacingCamel;
}());
