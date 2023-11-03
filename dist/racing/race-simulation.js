import { GameState } from "../global/game-state.js";
import { CamelTemperament } from "../management/camel-creation/camel-temperament.js";
import { RaceState } from "./models/race-state.js";
export class RaceSimulation {
    constructor() { }
    _nextPosition = 1;
    startRace(race) {
        this._nextPosition = 1;
        race.racingCamels.forEach((x) => x.startJump());
    }
    simulateRaceStep(race) {
        race.racingCamels.forEach((racingCamel) => {
            if (racingCamel.finalPosition) {
                return;
            }
            racingCamel.handleJumpTick();
            // Multipliers
            const speedMultiplier = 1 / 10;
            const staminaMultiplier = 0.6;
            const agilityMultiplier = 6;
            const intelligenceMultiplier = 3;
            const finalSpeedMultiplier = 0.8;
            // Offsets
            const speedOffset = 10;
            const agilityOffset = 0;
            const staminaOffset = 10;
            const intelligenceOffset = 40;
            let speed = 0;
            const remainingDistance = race.length * (1 - racingCamel.completionPercentage);
            const completedDistance = race.length * racingCamel.completionPercentage;
            const sprintDuration = this.GetVariantNumber(6, 2);
            const sprintingSpeed = speedOffset + racingCamel.camel.sprintSpeed.level * speedMultiplier;
            const baseSpeed = 0.75 * sprintingSpeed;
            const deadSpeed = 0.25;
            const accelerationRate = agilityOffset + (agilityMultiplier * racingCamel.agility) / 100;
            const decelerationRate = (1 + racingCamel.currentSpeed / 10) / ((racingCamel.stamina + staminaOffset) * staminaMultiplier);
            const baseInconsistancyRate = intelligenceMultiplier + intelligenceOffset; // TODO new skill just dropped?
            let inconsistancyRate = (baseInconsistancyRate * racingCamel.completionPercentage) / 10;
            let form = 0;
            if (racingCamel.camel.temperament === CamelTemperament.Aggressive) {
                // Initial sprint
                const maxSprintSpeedReached = Math.min((1 + sprintDuration) * accelerationRate, sprintingSpeed);
                if (completedDistance < sprintDuration) {
                    speed = Math.min((1 + completedDistance) * accelerationRate, sprintingSpeed);
                }
                else {
                    const distanceSinceSprint = completedDistance - sprintDuration;
                    speed = Math.min(sprintingSpeed, maxSprintSpeedReached) - distanceSinceSprint * decelerationRate;
                }
            }
            else {
                speed = Math.min((1 + completedDistance) * accelerationRate, // initial acceleration
                baseSpeed, // top speed
                baseSpeed - completedDistance * decelerationRate); // deceleration
                // Final sprint
                if (remainingDistance < sprintDuration) {
                    speed = Math.max(speed, Math.min(sprintDuration - remainingDistance * accelerationRate, // sprint acceleration
                    sprintingSpeed)); // top speed
                }
            }
            // Now we spice things up
            const bias = speed === deadSpeed ? inconsistancyRate / 40 : 0;
            racingCamel.form += this.GetVariantNumber(bias, inconsistancyRate / 10);
            racingCamel.form *= 0.999;
            speed += form;
            speed = Math.max(speed, deadSpeed); // still walking
            speed *= finalSpeedMultiplier;
            racingCamel.currentSpeed = speed;
            const newCompletedDistance = completedDistance + GameState.secondsPassed * speed;
            racingCamel.completionPercentage = newCompletedDistance / race.length;
            if (racingCamel.completionPercentage >= 1) {
                racingCamel.finalPosition = this._nextPosition++;
                const finishedCamels = race.racingCamels.filter((o) => o.finalPosition).length;
                if (finishedCamels >= 3 || finishedCamels == race.racingCamels.length) {
                    race.raceState = RaceState.finished;
                    return;
                }
            }
        });
    }
    GetVariantNumber(value, variance) {
        return Math.round(100 * (value - variance / 2 + variance * Math.random())) / 100;
    }
}
