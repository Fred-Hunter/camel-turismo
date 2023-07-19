class RaceSimulationV2 {
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

            const speedMultiplier = 1 / 10;
            const staminaMultiplier = 0.8;
            const agilityMultiplier = 6;
            const finalSpeedMultiplier = 1.5;
            const starterSpeed = 2;


            let speed = 0;
            const remainingDistance = race.length * (1 - racingCamel.completionPercentage);
            const completedDistance = race.length * racingCamel.completionPercentage;

            const sprintDuration = this.GetVariantNumber(6, 2);

            const sprintingSpeed = starterSpeed + racingCamel.camel.sprintSpeed.level * speedMultiplier;
            const baseSpeed = 0.5 * sprintingSpeed;
            const deadSpeed = 0.25;
            const accelerationRate = agilityMultiplier * racingCamel.agility / 100;
            const decelerationRate = (1 + racingCamel.currentSpeed / 10) / ((racingCamel.stamina + 10) * staminaMultiplier);
            const baseInconsistancyRate = 150; // TODO new skill just dropped?
            let inconsistancyRate = baseInconsistancyRate;
            let form = 0;


            if (racingCamel.camel.temperament === CamelTemperament.Aggressive) {

                // Initial sprint
                const maxSprintSpeedReached = Math.min((1 + sprintDuration) * accelerationRate, sprintingSpeed)
                if (completedDistance < sprintDuration) {
                    speed = Math.min((1 + completedDistance) * accelerationRate, sprintingSpeed);
                }
                else {
                    const distanceSinceSprint = completedDistance - sprintDuration;
                    speed =  Math.min(sprintingSpeed, maxSprintSpeedReached) - distanceSinceSprint * decelerationRate;
                }
            }
            else {
                speed = Math.min(
                    (1 + completedDistance) * accelerationRate, // initial acceleration
                    baseSpeed, // top speed
                    baseSpeed - completedDistance * decelerationRate); // deceleration

                // Final sprint
                if (remainingDistance < sprintDuration) {
                    speed = Math.max(speed, Math.min(
                        sprintDuration - remainingDistance * accelerationRate, // sprint acceleration
                        sprintingSpeed)) // top speed
                }
            }

            // Now we spice things up
            if (racingCamel.completionPercentage > 50) inconsistancyRate *= 2;
            racingCamel.form += this.GetVariantNumber(speed === deadSpeed ? inconsistancyRate / 40 : 0, inconsistancyRate / 10);
            racingCamel.form *= 0.90;
            speed += form;

            speed = Math.max(speed, deadSpeed); // still walking
            speed *= finalSpeedMultiplier;

            racingCamel.currentSpeed = speed

            const newCompletedDistance = completedDistance + GameState.secondsPassed * speed;

            racingCamel.completionPercentage = newCompletedDistance / race.length;

            if (racingCamel.completionPercentage >= 1) {
                racingCamel.finalPosition = this._nextPosition++;
                if (race.racingCamels.filter(o => o.finalPosition).length >= 3) {
                    race.raceState = RaceState.finished;
                    return;
                }
            }
        });
    }

    private GetVariantNumber(value: number, variance: number){
        return Math.round(100 * (value - variance / 2 + variance * Math.random())) / 100
    }
}