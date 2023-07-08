class Race {
    constructor(
        public length: number,
        camels: Camel[]) { 
            camels.forEach(camel => {
                const racingCamel = new RacingCamel(camel);
                this.racingCamels.push(racingCamel);
                racingCamel.startJump();
            });
    
        }

    racingCamels: RacingCamel[] = [];
    inProgress: boolean = false;
    winner: undefined;
}
