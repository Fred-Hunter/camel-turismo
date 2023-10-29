import { CanvasNames } from "../global/canvas-names";
import { CanvasService } from "../global/canvas-service";
import { race } from "../main";
import { RaceState } from "./models/race-state";
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
        if (!race || race.raceState === RaceState.none) {
            return;
        }
        if (race.raceState === RaceState.inProgress) {
            this._raceManagement.simulateRaceStep(race);
            this._raceDrawing.drawCamels(race);
            this._leaderboardService.drawLeaderboard();
        }
        if (race.raceState === RaceState.triggered) {
            this._raceDrawing.drawRaceCourse(race);
            race.triggeredTimestamp = timeStamp;
            this._raceDrawing.drawCamels(race);
            race.raceState = RaceState.initialised;
        }
        if (race.raceState === RaceState.initialised) {
            this._countdown.displayCountdown(8000 - (timeStamp - race.triggeredTimestamp));
            if (timeStamp - race.triggeredTimestamp >= 7500) {
                CanvasService.hideCanvas(CanvasNames.Countdown);
                this._raceManagement.startRace(race);
            }
        }
        if (race.raceState === RaceState.finished) {
            this._raceManagement.handleFinishedRace(race);
        }
    }
}
