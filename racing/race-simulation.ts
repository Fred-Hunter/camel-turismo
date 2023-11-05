import { GameState } from "../global/game-state.js";
import { CamelTemperament } from "../management/camel-creation/camel-temperament.js";
import { Race } from "./models/race.js";
import { RaceState } from "./models/race-state.js";
import { RacingCamel } from "./models/racing-camel.js";

export class RaceSimulation {
	constructor() {}
	private _nextPosition: number = 1;

	startRace(race: Race): void {
		this._nextPosition = 1;

		race.racingCamels.forEach((x) => x.startJump());
	}

	simulateRaceStep(race: Race) {
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
			const motivationMultiplier = 0.3;

			const finalSpeedMultiplier = 0.8 * race.raceSpeed;

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
				// Aggressive does an initial sprint
				const maxSprintSpeedReached = Math.min((1 + sprintDuration) * accelerationRate, sprintingSpeed);
				if (completedDistance < sprintDuration) {
					speed = Math.min((1 + completedDistance) * accelerationRate, sprintingSpeed);
				} else {
					const distanceSinceSprint = completedDistance - sprintDuration;
					speed = Math.min(sprintingSpeed, maxSprintSpeedReached) - distanceSinceSprint * decelerationRate;
				}
			} else {
                // Other temprements do a final sprint
				speed = Math.min(
					(1 + completedDistance) * accelerationRate, // initial acceleration
					baseSpeed, // top speed
					baseSpeed - completedDistance * decelerationRate // deceleration
				);

				// Final sprint
				if (remainingDistance < sprintDuration) {
					speed = Math.max(
						speed,
						Math.min(
							sprintDuration - remainingDistance * accelerationRate, // sprint acceleration
							sprintingSpeed
						) // top speed
					);
				}
			}

			// Apply form
			const bias = speed === deadSpeed ? inconsistancyRate / 40 : 0;
			racingCamel.form += this.GetVariantNumber(bias, inconsistancyRate / 10);
			racingCamel.form *= 0.999;
			speed += form;

            // Apply motivation
            racingCamel.motivation = this.CalculateMotivation(racingCamel, race);
            speed += speed * racingCamel.motivation * motivationMultiplier;

            // Ensure we're still walking
			speed = Math.max(speed, deadSpeed);

			speed *= finalSpeedMultiplier;

            // Update completion
			racingCamel.currentSpeed = speed;
			const newCompletedDistance = completedDistance + GameState.secondsPassed * speed;
			racingCamel.completionPercentage = newCompletedDistance / race.length;

			if (racingCamel.completionPercentage >= 1) {
				racingCamel.finalPosition = this._nextPosition++;
                const finishedCamels = race.racingCamels.filter((o) => o.finalPosition).length;
				if ( finishedCamels >= 3 || finishedCamels == race.racingCamels.length) {
					race.raceState = RaceState.finished;
					return;
				}
			}
		});
	}

    private CalculateMotivation(protagonistCamel: RacingCamel, race: Race) {
        const confidence = protagonistCamel.confidence;
        let motivation = 0;
        const nearbyCamels = race.racingCamels.filter(rc => 
            rc !== protagonistCamel &&
            Math.abs(rc.completionPercentage - protagonistCamel.completionPercentage) <= 0.1 &&
            rc.completionPercentage < 0.95);

        nearbyCamels.forEach(villianCamel => {
            const sign = Math.sign(confidence - villianCamel.intimidation);
            motivation += sign * Math.log10(1 + Math.abs(confidence - villianCamel.intimidation))
        });

        // We normalise it to roughly be in the interval (-1, 1)
        motivation = motivation / (2 * Math.max(1, nearbyCamels.length));

        return motivation;
    }

	private GetVariantNumber(value: number, variance: number) {
		return Math.round(100 * (value - variance / 2 + variance * Math.random())) / 100;
	}
}
