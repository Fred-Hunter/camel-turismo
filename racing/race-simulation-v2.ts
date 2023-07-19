class RaceSimulation {
    constructor() { }
    private _nextPosition: number = 1;

    startRace(race: Race): void {
        this._nextPosition = 1;

        race.racingCamels.forEach(x => x.startJump());
    }

    simulateRaceStep(race: Race) {
        race.racingCamels.forEach(racingCamel => {
            if (racingCamel.finalPosition) {
                return;
            }

            racingCamel.handleJumpTick();

            const remainingDistance = race.length * (1 - racingCamel.completionPercentage);

            const distancePerSecondWhileSprinting = racingCamel.camel.sprintSpeed.level / 5;
            const distancePerSecondWhileWalking = 0.25 * racingCamel.camel.sprintSpeed.level / 5;
            const staminaDecreasePerSecond = 6;

            let tryToSprint = false;

            if (racingCamel.camel.temperament === CamelTemperament.Aggressive) {
                tryToSprint = true;
            } else if (racingCamel.camel.temperament === CamelTemperament.Temperamental) {
                tryToSprint = Math.random() < 0.5;
            } else {
                const secondsToFinish = remainingDistance / distancePerSecondWhileSprinting;
                const canSprintToEnd = racingCamel.stamina - secondsToFinish * staminaDecreasePerSecond >= -2;

                tryToSprint = canSprintToEnd;
            }

            const hasSprint = racingCamel.stamina - GameState.secondsPassed * staminaDecreasePerSecond >= 0 && tryToSprint;
            const baseDistancePerSecond = hasSprint ? distancePerSecondWhileSprinting : distancePerSecondWhileWalking;
            const distancePerSecond = baseDistancePerSecond + (Math.random() - 0.5);

            const completedDistance = race.length * racingCamel.completionPercentage;
            const newCompletedDistance = completedDistance + GameState.secondsPassed * distancePerSecond;

            racingCamel.completionPercentage = newCompletedDistance / race.length;

            if (racingCamel.completionPercentage >= 1) {
                racingCamel.finalPosition = this._nextPosition++;
                if (race.racingCamels.filter(o => o.finalPosition).length >= 3) {
                    race.raceState = RaceState.finished;
                    return;
                }
            }

            if (hasSprint) {
                racingCamel.stamina -= GameState.secondsPassed * staminaDecreasePerSecond;
            }
        });
    }
}