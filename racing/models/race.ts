class Race {
    constructor(public length: number) { }

    camels: RacingCamel[] = [];
    inProgress: boolean = false;
    winner: undefined;
}