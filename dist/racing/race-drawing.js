import { CactusCoords } from "../assets/isometric-coords/cactus-coords.js";
import { OasisCoords } from "../assets/isometric-coords/oasis-coords.js";
import { PyramidCoords } from "../assets/isometric-coords/pyramids.js";
import { RookCoords } from "../assets/isometric-coords/rock-coords.js";
import { CanvasNames } from "../global/canvas-names.js";
import { CanvasService } from "../global/canvas-service.js";
import { CubeService } from "../global/cube-service.js";
import { GlobalStaticConstants } from "../global/global-static-constants.js";
import { ImportantService } from "../global/important-service.js";
import { IsometricCoordsDrawer } from "../assets/isometric-coords/isometric-coords-drawer.js";
import { PalmTreeCoords } from "../assets/isometric-coords/palm-tree-coords.js";
import { CamelCoords } from "../assets/isometric-coords/camel-coords.js";
import { Colour } from "../assets/colours.js";
export class RaceDrawing {
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
    drawRaceCourse(raceParams, scale) {
        const ctx = this._backgroundCanvas.getContext("2d");
        ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        ctx.fillRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        this._backgroundCanvas.style.filter = "none";
        if (!!raceParams.worldFilter) {
            ctx.filter = raceParams.worldFilter;
            this._backgroundCanvas.style.filter = raceParams.worldFilter;
        }
        for (let x = raceParams.worldXStart; x < raceParams.worldXSize; x++) {
            for (let y = raceParams.worldYStart; y < raceParams.worldYSize; y++) {
                const track = raceParams.track.filter(o => o[0] === x && o[1] === y);
                if (track.length > 0) {
                    this.backgroundCubeService.drawCube(Colour.lightGrey, x, y, 1, track[0][2]);
                }
                else {
                    const height = raceParams.heightVarianceMultiplier * Math.random() / 4;
                    const shadeFactor = raceParams.colourVarianceMultiplier * (height - 0.125);
                    const colour = raceParams.pickRandomGroundColour();
                    this.backgroundCubeService.drawCube(colour, x, y, scale, height, shadeFactor);
                    const shouldIncludeObject = raceParams.addObjects && Math.floor(Math.random() * 10) === 4;
                    if (shouldIncludeObject) {
                        const object = this.getObject();
                        IsometricCoordsDrawer.draw(x, y, object, this.backgroundCubeService, height, scale);
                    }
                }
            }
        }
        ctx.filter = "none";
    }
    getObject() {
        const random = Math.floor(Math.random() * 10);
        if (random < 1) {
            return PalmTreeCoords.tree;
        }
        else if (random < 1.5) {
            return RookCoords.smallRock1;
        }
        else if (random < 2) {
            return RookCoords.smallRock2;
        }
        else if (random < 2.5) {
            return OasisCoords.oasis;
        }
        else if (random < 6) {
            return CactusCoords.cactus;
        }
        else if (random < 8) {
            return CactusCoords.cactus2;
        }
        else if (random < 9) {
            return PyramidCoords.dilapidated;
        }
        else {
            // this.drawStaticCamel(i, j, height);
            return [];
        }
    }
    drawCamels(race) {
        const ctx = this._camelCanvas.getContext("2d");
        ctx.clearRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
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
        let camelCoords = [];
        if (movingInNegativeY) {
            camelCoords = CamelCoords.getNegativeY(camel.camel.colour);
        }
        else if (movingInNegativeX) {
            camelCoords = CamelCoords.getNegativeX(camel.camel.colour);
        }
        else if (movingInPositiveY) {
            camelCoords = CamelCoords.getPositiveY(camel.camel.colour);
        }
        else if (movingInPositiveX) {
            camelCoords = CamelCoords.getPositiveX(camel.camel.colour);
        }
        IsometricCoordsDrawer.drawCamel(newXCoord, newYCoord, camelCoords, this.camelCubeService, currentCoord[2] + camel.jumpHeight, 1, 0.2);
        this.drawChevrons(camel, newXCoord, newYCoord);
    }
    drawChevrons(camel, xCoord, yCoord) {
        const ctx = this._camelCanvas.getContext("2d");
        ctx.save();
        ctx.lineWidth = 2;
        const chevronSize = 4;
        if (camel.motivation < -0.6) {
            ctx.strokeStyle = "red";
            this.drawChevron(ctx, xCoord, yCoord, chevronSize, false, 2);
        }
        else if (camel.motivation < -0.3) {
            ctx.strokeStyle = "red";
            this.drawChevron(ctx, xCoord, yCoord, chevronSize, false, 1);
        }
        else if (camel.motivation > 0.6) {
            ctx.strokeStyle = "green";
            this.drawChevron(ctx, xCoord, yCoord, chevronSize, true, 2);
        }
        else if (camel.motivation > 0.3) {
            ctx.strokeStyle = "green";
            this.drawChevron(ctx, xCoord, yCoord, chevronSize, true, 1);
        }
        ctx.restore();
    }
    drawChevron(ctx, xCoord, yCoord, size, isUp, numberOfChevrons) {
        const realCoords = ImportantService.ConvertCoordToReal(xCoord, yCoord);
        const yOffset = isUp ? size : -size;
        for (let i = 0; i < numberOfChevrons; i++) {
            ctx.beginPath();
            ctx.moveTo(realCoords.x - size, realCoords.y + yOffset * (i + 1) - 40);
            ctx.lineTo(realCoords.x, realCoords.y + yOffset * i - 40);
            ctx.lineTo(realCoords.x + size, realCoords.y + yOffset * (i + 1) - 40);
            ctx.stroke();
        }
    }
}
