class ManagementStartup {
    constructor(
        private readonly _musicService: MusicService,
        private readonly _navigatorService: NavigatorService) { }

    public registerComponents() {
        const camelSkillDrawing = new CamelSkillDrawing(this._navigatorService);
        const camelSkillCommands = new CamelSkillCommands();

        camelSkillComponent = new CamelSkillComponent(camelSkillDrawing, camelSkillCommands);
    }
}