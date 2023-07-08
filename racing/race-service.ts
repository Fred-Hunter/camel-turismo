class RaceService {
    createRace(
        length: number,
        camels: Camel[]): Race {
        if(camels.length <= 0){
            throw new Error('Tried to create a race with no camels');
        }

        const raceCamels: RacingCamel[] = [];
        
        camels.forEach(camel => {
            
        });

        raceCamels.push()

        let race = new Race(length);

        return race;
    }

    startRace(race: Race): void {
        if (race.length <= 0) {
            throw new Error('Tried to start a race with bad length');
        }

        if (race.camels.length === 0) {
            throw new Error('Tried to start a race with bad number of camels');
        }

        race.inProgress = true;
    }

    simulateRaceStep(race: Race) {
        race.camels.forEach((racingCamel: RacingCamel) => {
            racingCamel.raceSpeedPerSecond = racingCamel.camel.camelSkills.sprintSpeed.level * 20 * Math.random();

            const completedDistance = race.length * racingCamel.completionPercentage;
            const newCompletedDistance = completedDistance + secondsPassed * racingCamel.raceSpeedPerSecond;

            racingCamel.completionPercentage = newCompletedDistance / race.length;

            if (racingCamel.completionPercentage >= 1) {
                race.inProgress = false;
            }
        });
    }
}