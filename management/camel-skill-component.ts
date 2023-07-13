class CamelSkillComponent {
    constructor(private readonly _camelSkillDrawing: CamelSkillDrawing,
        private readonly _camelSkillCommands: CamelSkillCommands,
    ) { }

    public load(camel: Camel) {
        this._camelSkillDrawing.drawPage(camel, (camelSkill: CamelSkill) => this.levelUpSkill(camel, camelSkill));
    }

    private levelUpSkill = (camel: Camel, skill: CamelSkill) => {
        this._camelSkillCommands.levelUpSkill(camel, skill);
        this.load(camel);
    }
}
