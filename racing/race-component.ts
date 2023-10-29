import { CanvasNames } from "../global/canvas-names";
import { CanvasService } from "../global/canvas-service";
import { race } from "../main";
import { Countdown } from "./countdown/countdown";
import { LeaderboardService } from "./leaderboard-service";
import { RaceState } from "./models/race-state";
import { RaceDrawing } from "./race-drawing";
import { RaceManagement } from "./race-managment";

export class RaceComponent {
    constructor(
        private readonly _raceDrawing: RaceDrawing,
        private readonly _raceManagement: RaceManagement,
        private readonly _leaderboardService: LeaderboardService,
        private readonly _countdown: Countdown)
     { }

    public load(): void {
        CanvasService.showCanvas(CanvasNames.RaceBackground);
        CanvasService.showCanvas(CanvasNames.RaceCamel);
        CanvasService.showCanvas(CanvasNames.Countdown);

        CanvasService.bringCanvasToTop(CanvasNames.RaceBackground);
        CanvasService.bringCanvasToTop(CanvasNames.RaceCamel);
        CanvasService.bringCanvasToTop(CanvasNames.Countdown);
    }

    public handleRaceLoop(timeStamp: number): void {
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
