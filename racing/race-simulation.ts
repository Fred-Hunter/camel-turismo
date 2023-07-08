class RaceSimulation {
    createRace(enteringCamel: Camel, raceLength: number): Race {
        const camelsInRace = [enteringCamel];

        for (let i = 0; i < 4; i++) {
            // TODO randomise quality and allow quality about init camel quality
            const competitorCamel = new Camel(++lastUsedId, InitCamelQuality.High);
            camelsInRace.push(competitorCamel);
        }

        const trackCreator = new RaceTrackCreator();
        const track = trackCreator.CreateTrack(100);

        return new Race(raceLength, camelsInRace, track);
    }

    startRace(race: Race): void {
        if (race.length <= 0) {
            throw new Error('Tried to start a race with bad length');
        }

        if (race.racingCamels.length === 0) {
            throw new Error('Tried to start a race with no camels');
        }

        race.inProgress = true;
        race.racingCamels.forEach(x => x.startJump());
    }

    simulateRaceStep(race: Race) {
        race.racingCamels.forEach(racingCamel => {
            const hasSprint = racingCamel.stamina > 0;
            const baseMovementSpeed = hasSprint ? 5 + (racingCamel.camel.camelSkills.sprintSpeed.level / 2) : 5;
            racingCamel.raceSpeedPerSecond = baseMovementSpeed * 20 * Math.random();

            const completedDistance = race.length * racingCamel.completionPercentage;
            const newCompletedDistance = completedDistance + secondsPassed * racingCamel.raceSpeedPerSecond;

            racingCamel.completionPercentage = newCompletedDistance / race.length;

            if (racingCamel.completionPercentage >= 1) {
                race.inProgress = false;
            }

            if (hasSprint) {
                racingCamel.stamina -= 0.06;
            }
        });
    }
}