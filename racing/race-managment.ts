class RaceManagement {
    constructor(
        private readonly _musicService: MusicService,
        private readonly _raceSimulation: RaceSimulation,
        private readonly _camelCreator: CamelCreator,
    ) { }

    addCamelToRace(camel: Camel, race: Race) {
        const racingCamel = new RacingCamel(camel);
        race.racingCamels.push(racingCamel);
    }

    private addCpuCamelsToRace(
        raceSize: number,
        competitorQuality: InitCamelQuality,
        race: Race) {
        for (let i = 0; i < raceSize; i++) {
            const competitorCamel = this._camelCreator.createRandomCamelWithQuality(competitorQuality);

            this.addCamelToRace(competitorCamel, race);
        }
    }

    createRace(
        raceLength: number,
        prizeCashMoney: number,
        raceSize: number,
        difficulty: Difficulty): Race {
        let competitorQuality: InitCamelQuality;

        if (difficulty === Difficulty.Easy) {
            competitorQuality = InitCamelQuality.High;
        } else if (difficulty === Difficulty.Normal) {
            competitorQuality = InitCamelQuality.Cpu1;
        } else {
            competitorQuality = InitCamelQuality.Cpu5;
        }

        const trackCreator = new RaceTrackCreator();
        const track = trackCreator.CreateTrack(raceLength);

        const race = new Race(raceLength, track, prizeCashMoney);

        this.addCpuCamelsToRace(raceSize, competitorQuality, race);

        return race;
    }

    startRace(race: Race): void {
        if (race.length <= 0) {
            throw new Error('Tried to start a race with bad length');
        }

        if (race.racingCamels.length === 0) {
            throw new Error('Tried to start a race with no camels');
        }

        race.raceState = RaceState.inProgress;

        this._raceSimulation.startRace(race);
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

    simulateRaceStep(race: Race) {
        this._raceSimulation.simulateRaceStep(race);
    }

    handleFinishedRace(race: Race) {
        let position = race.racingCamels.filter(o => o.camel == GameState.camel)[0].finalPosition;

        position = position ??
            1 +
            race.racingCamels.sort((a, b) => b.completionPercentage - a.completionPercentage).map(o => o.camel).indexOf(GameState.camel!);

        const prizeCashMoney = this.getPrizeMoney(race, position);

        GameState.cashMoney += prizeCashMoney;

        const xpGained = (race.racingCamels.length - position + 1) * 100;
        GameState.camel!.unspentXp += xpGained;

        race.raceState = RaceState.none;

        this._musicService.setAudio('HomeScreenAudio');
        this._musicService.startAudio();

        CanvasService.hideAllCanvas();
        MapOverview.showMap();
        MapOverview.renderMap();

        PopupService.drawAlertPopup(`Congratulations, ${GameState.camel!.name} finished ${this.getPositionDisplay(position)}! You won $${prizeCashMoney}, and gained ${xpGained}xp!`);
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