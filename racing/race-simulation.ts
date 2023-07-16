class RaceSimulation {
    private _nextPosition: number = 1;

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
            const competitorCamel = new Camel(++GameState.lastUsedId, competitorQuality);
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
                    this.handleFinishedRace(race);
                }
            }

            if (hasSprint) {
                racingCamel.stamina -= GameState.secondsPassed * staminaDecreasePerSecond;
            }
        });
    }

    getPositionDisplay(position: number) {
        switch (position) {
            case 1:
                return '1st';
            case 2:
                return '2nd';
            case 3:
                return '3rd';
            default:
                return `${position}th`;
        }
    }

    handleFinishedRace(race: Race) {
        race.inProgress = false;

        let position = race.racingCamels.filter(o => o.camel == camel)[0].finalPosition;

        position = position ??
            1 +
            race.racingCamels.sort((a, b) => b.completionPercentage - a.completionPercentage).map(o => o.camel).indexOf(camel);

        const prizeCashMoney = this.getPrizeMoney(race, position);

        GameState.cashMoney += prizeCashMoney;

        this._nextPosition = 1;

        const xpGained = (race.racingCamels.length - position + 1) * 100;
        camel.unspentXp += xpGained;

        musicService.setAudio('HomeScreenAudio');
        musicService.startAudio();

        CanvasService.hideAllCanvas();
        MapOverview.showMap();
        MapOverview.renderMap();

        PopupService.drawAlertPopup(`Congratulations, ${camel.name} finished ${this.getPositionDisplay(position)}! You won $${prizeCashMoney}, and gained ${xpGained}xp!`);
    }

    getPrizeMoney(race: Race, position: number) {
        const prizePool = race.prizeCashMoney;

        if (position === 1) {
            return prizePool * 0.75;
        }

        if (position === 2) {
            return prizePool * 0.2;
        }

        if (position === 3) {
            return prizePool * 0.05;
        }

        return 0;
    }
}