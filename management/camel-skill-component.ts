class CamelSkillComponent {
    constructor(private readonly _camelSkillDrawing: CamelSkillDrawing,
        private readonly _camelSkillCommands: CamelSkillCommands,
    ) { }

    public load() {
        CanvasService.showCanvas(CanvasNames.CamelManagement);
        this._camelSkillDrawing.drawPage(GameState.camel!, (camelSkill: CamelSkill) => this.levelUpSkill(GameState.camel!, camelSkill));
    }

    private levelUpSkill = (camel: Camel, skill: CamelSkill) => {
        this._camelSkillCommands.levelUpSkill(camel, skill);
        this.load();
    }
}
