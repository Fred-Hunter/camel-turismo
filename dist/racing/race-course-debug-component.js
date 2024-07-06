import { Colour } from "../assets/colours.js";
import { CanvasNames } from "../global/canvas-names.js";
import { CanvasService } from "../global/canvas-service.js";
import { RaceDrawingParameters } from "./models/race-drawing-parameters.js";
export class RaceCourseDebugComponent {
    _raceDrawing;
    constructor(_raceDrawing) {
        this._raceDrawing = _raceDrawing;
    }
    load() {
        CanvasService.showCanvas(CanvasNames.RaceBackground);
        CanvasService.bringCanvasToTop(CanvasNames.RaceBackground);
        this.renderCourse();
    }
    renderCourse() {
        const raceParams = new RaceDrawingParameters([]);
        // raceParams.worldXStart = -50;
        // raceParams.worldYStart = -50;
        // raceParams.worldXSize = 100;
        // raceParams.worldYSize = 100;
        raceParams.heightVarianceMultiplier = 2;
        raceParams.colourVarianceMultiplier = 1.5;
        raceParams.addObjects = false;
        // raceParams.groundColours.push(
        //     { colour: Colour.green, frequency: 7 },
        //     { colour: Colour.brown, frequency: 1 },
        // );
        raceParams.groundColours.push({ colour: Colour.blue, frequency: 20 });
        this._raceDrawing.drawRaceCourse(raceParams, 1);
    }
}
