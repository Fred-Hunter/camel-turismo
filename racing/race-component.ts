class RaceComponent {
    constructor(
        private readonly _raceDrawing: RaceDrawing,
        private readonly _raceSimulation: RaceSimulation,
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
        if (!!race && race.inProgress) {
            this._raceSimulation.simulateRaceStep(race);
            this._raceDrawing.drawCamels(race);
            this._leaderboardService.drawLeaderboard();
        }

        if (!!race && race.triggered) {
            if (!race.initialised) {
                this._raceDrawing.drawRaceCourse(race);
                race.triggeredTimestamp = timeStamp;
                this._raceDrawing.drawCamels(race);
                race.initialised = true;
            }

            this._countdown.displayCountdown(8000 - (timeStamp - race.triggeredTimestamp));

            if (timeStamp - race.triggeredTimestamp >= 7500) {
                CanvasService.hideCanvas(CanvasNames.Countdown);
                race.triggered = false
                this._raceSimulation.startRace(race);
            }
        }
    }
}