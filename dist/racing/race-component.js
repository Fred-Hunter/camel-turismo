import { CanvasNames } from "../global/canvas-names.js";
import { CanvasService } from "../global/canvas-service.js";
import { GlobalComponents } from "../global/global-components.js";
import { RaceState } from "./models/race-state.js";
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
            this._raceDrawing.drawCamels(GlobalComponents.race);
            this._leaderboardService.drawLeaderboard();
        }
        if (GlobalComponents.race.raceState === RaceState.triggered) {
            this._raceDrawing.drawRaceCourse(GlobalComponents.race);
            GlobalComponents.race.triggeredTimestamp = timeStamp;
            this._raceDrawing.drawCamels(GlobalComponents.race);
            GlobalComponents.race.raceState = RaceState.initialised;
        }
        if (GlobalComponents.race.raceState === RaceState.initialised) {
            this._countdown.displayCountdown(8000 - (timeStamp - GlobalComponents.race.triggeredTimestamp));
            if (timeStamp - GlobalComponents.race.triggeredTimestamp >= 7500) {
                CanvasService.hideCanvas(CanvasNames.Countdown);
                this._raceManagement.startRace(GlobalComponents.race);
            }
        }
        if (GlobalComponents.race.raceState === RaceState.finished) {
            this._raceManagement.handleFinishedRace(GlobalComponents.race);
        }
    }
}
