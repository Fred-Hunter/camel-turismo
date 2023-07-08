class RaceSimulation {
    private _finishedCamels: RacingCamel[] = [];

    createRace(
        enteringCamel: Camel,
        raceLength: number,
        prizeCashMoney: number,
        raceSize: number,
        difficulty: Difficulty): Race {
        const camelsInRace = [enteringCamel];

        let competitorQuality: InitCamelQuality;

        if (difficulty === Difficulty.Easy) {
            competitorQuality = InitCamelQuality.High;
        } else if (difficulty === Difficulty.Normal) {
            competitorQuality = InitCamelQuality.Cpu1;
        } else {
            competitorQuality = InitCamelQuality.Cpu5;
        }

        for (let i = 0; i < raceSize; i++) {
            const competitorCamel = new Camel(++lastUsedId, competitorQuality);
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
            if (this._finishedCamels.indexOf(racingCamel) > -1) {
                return;
            }

            racingCamel.handleJumpTick();
            const hasSprint = racingCamel.stamina > 0;
            const baseMovementSpeed = hasSprint ? 5 + (racingCamel.camel.camelSkills.sprintSpeed.level) : 0.5 * racingCamel.camel.camelSkills.sprintSpeed.level;
            racingCamel.raceSpeedPerSecond = baseMovementSpeed * Math.random() / 5;

            const completedDistance = race.length * racingCamel.completionPercentage;
            const newCompletedDistance = completedDistance + secondsPassed * racingCamel.raceSpeedPerSecond;

            racingCamel.completionPercentage = newCompletedDistance / race.length;

            if (racingCamel.completionPercentage >= 1) {
                this._finishedCamels.push(racingCamel);
                if (this._finishedCamels.length >= 3) {
                    this.handleFinishedRace(race);
                }
            }

            if (hasSprint) {
                racingCamel.stamina -= 0.1; //0.06
            }
        });
    }

    handleFinishedRace(race: Race) {
        race.inProgress = false;

        const position = this._finishedCamels.map(o => o.camel).indexOf(camel);

        const prizeCashMoney = this.getPrizeMoney(race, position);

        cashMoney += prizeCashMoney;

        this._finishedCamels = [];

        musicService.setAudio('HomeScreenAudio');
        musicService.startAudio();

        CanvasService.hideAllCanvas();
        MapOverview.showMap();
        MapOverview.renderMap();

        PopupService.drawAlertPopup(`Congratulations, your postion was ${position + 1}, and you won $${prizeCashMoney}!`);
    }

    getPrizeMoney(race: Race, position: number) {
        const prizePool = race.prizeCashMoney;

        if (position === 0) {
            return prizePool * 0.75;
        }

        if (position === 1) {
            return prizePool * 0.2;
        }

        if (position === 2) {
            return prizePool * 0.05;
        }

        return 0;
    }
}