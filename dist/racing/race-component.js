import { Colour } from "../assets/colours.js";
import { CanvasNames } from "../global/canvas-names.js";
import { CanvasService } from "../global/canvas-service.js";
import { GameState } from "../global/game-state.js";
import { GlobalComponents } from "../global/global-components.js";
import { GlobalStaticConstants } from "../global/global-static-constants.js";
import { RaceDrawingParameters } from "./models/race-drawing-parameters.js";
import { RaceState } from "./models/race-state.js";
import { RaceType } from "./race-type.js";
export class RaceComponent {
    _raceDrawing;
    _raceManagement;
    _leaderboardService;
    _countdown;
    constructor(_raceDrawing, _raceManagement, _leaderboardService, _countdown) {
        this._raceDrawing = _raceDrawing;
        this._raceManagement = _raceManagement;
        this._leaderboardService = _leaderboardService;
        this._countdown = _countdown;
    }
    load() {
        CanvasService.showCanvas(CanvasNames.RaceBackground);
        CanvasService.showCanvas(CanvasNames.RaceCamel);
        CanvasService.showCanvas(CanvasNames.Countdown);
        CanvasService.bringCanvasToTop(CanvasNames.RaceBackground);
        CanvasService.bringCanvasToTop(CanvasNames.RaceCamel);
        CanvasService.bringCanvasToTop(CanvasNames.Countdown);
    }
    handleRaceLoop(timeStamp) {
        if (!GlobalComponents.race || GlobalComponents.race.raceState === RaceState.none) {
            return;
        }
        if (GlobalComponents.race.raceState === RaceState.inProgress) {
            this._raceManagement.simulateRaceStep(GlobalComponents.race);
            if (GlobalComponents.race.raceType === RaceType.WaterRace &&
                GameState.oldTimeStamp - GlobalComponents.race.lastAnimatedBackgroundTimestamp > 1000) {
                this.drawRaceCourse();
            }
            this._raceDrawing.drawCamels(GlobalComponents.race);
            this._leaderboardService.drawLeaderboard();
        }
        if (GlobalComponents.race.raceState === RaceState.triggered) {
            this.drawRaceCourse();
            GlobalComponents.race.triggeredTimestamp = timeStamp;
            this._raceDrawing.drawCamels(GlobalComponents.race);
            GlobalComponents.race.raceState = RaceState.initialised;
        }
        if (GlobalComponents.race.raceState === RaceState.initialised) {
            if (!GlobalStaticConstants.debugMode) {
                this._countdown.displayCountdown(8000 - (timeStamp - GlobalComponents.race.triggeredTimestamp));
                if (timeStamp - GlobalComponents.race.triggeredTimestamp >= 7500) {
                    CanvasService.hideCanvas(CanvasNames.Countdown);
                    this._raceManagement.startRace(GlobalComponents.race);
                }
            }
            else {
                CanvasService.hideCanvas(CanvasNames.Countdown);
                this._raceManagement.startRace(GlobalComponents.race);
            }
        }
        if (GlobalComponents.race.raceState === RaceState.finished) {
            this._raceManagement.handleFinishedRace(GlobalComponents.race);
        }
    }
    drawRaceCourse() {
        const raceParams = new RaceDrawingParameters(GlobalComponents.race.track);
        if (GlobalComponents.race.raceType == RaceType.WaterRace) {
            raceParams.groundColours.push({ colour: Colour.blue, frequency: 1 });
            raceParams.addObjects = false;
            const updateCycle = Math.round((GameState.oldTimeStamp - GlobalComponents.race.triggeredTimestamp) / 1000) % 4;
            if (updateCycle === 0) {
                raceParams.heightVarianceMultiplier = 0.25;
            }
            else if (updateCycle === 1) {
                raceParams.heightVarianceMultiplier = 0.5;
            }
            else if (updateCycle === 2) {
                raceParams.heightVarianceMultiplier = 1;
            }
            else {
                raceParams.heightVarianceMultiplier = 0.5;
            }
            raceParams.colourVarianceMultiplier = 1.5;
        }
        else {
            raceParams.groundColours.push({ colour: Colour.sand, frequency: 1 });
        }
        if (GlobalComponents.race.raceType == RaceType.CityShowdown) {
            raceParams.worldFilter = "grayscale(90%)";
        }
        if (GlobalComponents.race.raceType == RaceType.SpookyShowdown) {
            raceParams.worldFilter = "hue-rotate(90deg)";
        }
        GlobalComponents.race.lastAnimatedBackgroundTimestamp = GameState.oldTimeStamp;
        this._raceDrawing.drawRaceCourse(raceParams, 1);
    }
}
