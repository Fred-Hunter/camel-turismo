class RaceSimulation {
    createRace(
        enteringCamel: Camel,
        raceLength: number,
        prizeCashMoney: number,
        raceSize: number): Race {
        const camelsInRace = [enteringCamel];

        for (let i = 0; i < raceSize; i++) {
            // TODO randomise quality and allow quality about init camel quality
            const competitorCamel = new Camel(++lastUsedId, InitCamelQuality.High);
            camelsInRace.push(competitorCamel);
        }

        const trackCreator = new RaceTrackCreator();
        const track = trackCreator.CreateTrack(raceLength);

        return new Race(raceLength, camelsInRace, track, prizeCashMoney);
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
            const baseMovementSpeed = hasSprint ? 5 + (racingCamel.camel.camelSkills.sprintSpeed.level) : 0.5 * racingCamel.camel.camelSkills.sprintSpeed.level;
            racingCamel.raceSpeedPerSecond = baseMovementSpeed * Math.random() / 5;

            const completedDistance = race.length * racingCamel.completionPercentage;
            const newCompletedDistance = completedDistance + secondsPassed * racingCamel.raceSpeedPerSecond;

            racingCamel.completionPercentage = newCompletedDistance / race.length;

            if (racingCamel.completionPercentage >= 1) {
                this.handleFinishedRace(race);
            }

            if (hasSprint) {
                racingCamel.stamina -= 0.1; //0.06
            }
        });
    }

    handleFinishedRace(race: Race) {
        race.inProgress = false;

        const position = race.racingCamels
            .sort((a, b) => b.completionPercentage - a.completionPercentage)
            .map(o => o.camel)
            .indexOf(camel);

        const prizeCashMoney = this.getPrizeMoney(race, position);

        cashMoney += prizeCashMoney;

        musicService.setAudio('HomeScreenAudio');
        musicService.startAudio();

        CanvasService.hideAllCanvas();
        MapOverview.showMap();
        MapOverview.renderMap();
    }

    getPrizeMoney(race: Race, position: number) {
        const prizePool = race.prizeCashMoney;

        if (position === 0) {
            return prizePool * 0.75;
        }

        if (position === 1) {
            return prizePool * 0.2;
        }

        if (position === 1) {
            return prizePool * 0.05;
        }

        return 0;
    }
}