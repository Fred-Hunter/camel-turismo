import { CanvasNames } from "../global/canvas-names";
import { CanvasService } from "../global/canvas-service";
import { GlobalComponents } from "../global/global-components";
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
