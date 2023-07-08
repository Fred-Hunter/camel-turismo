class Race {
    constructor(
        public length: number,
        camels: Camel[],
        public track: number[][]) { 
            camels.forEach(camel => {
                const racingCamel = new RacingCamel(camel);
                this.racingCamels.push(racingCamel);
            });
    
        }

    racingCamels: RacingCamel[] = [];
    inProgress: boolean = false;
    winner: undefined;
}
