class CamelSkillDrawing {
    constructor(  ) {
        this._canvas = CanvasService.getCanvasByName(CanvasNames.CamelManagement);
        this._ctx = this._canvas.getContext('2d')!;
        this._btnService = new CanvasBtnService(this._canvas);
    }

    private readonly _ctx: CanvasRenderingContext2D;
    private readonly _canvas: HTMLCanvasElement;
    private readonly _btnService: CanvasBtnService

    public drawPage(camel: Camel, levelUpSkillFunc: (camelSkill: CamelSkill) => void) {
        this._ctx.save();
        this._ctx.font = '12pt Garamond';

        this._ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this._btnService.removeEventListeners();

        const maxX = this._canvas.width / window.devicePixelRatio;

        this.drawOverview(camel, maxX / 40, maxX / 40);
        this.drawSkills(camel, levelUpSkillFunc);
        this._btnService.drawBackButton();

        this._ctx.restore();
    }

    private drawOverview(camel: Camel, x: number, y: number) {
        const nameText = `${camel.name}`;
        const nameTextLength = this._ctx.measureText(nameText).width;

        this._ctx.fillText(nameText, x, y);
        this._ctx.fillText(`XP: ${camel.unspentXp}`, x + nameTextLength + 20, y);
    }

    private drawSkills(camel: Camel, levelUpSkillFunc: (camelSkill: CamelSkill) => void) {
        const maxX = this._canvas.width / window.devicePixelRatio;

        const xPadding = maxX / 40;
        const yPadding = maxX / 40;

        const height = 40;

        this.drawSkill(camel.agility, xPadding, yPadding + height, levelUpSkillFunc);
        this.drawSkill(camel.sprintSpeed, xPadding, yPadding + 2 * height, levelUpSkillFunc);
        this.drawSkill(camel.stamina, xPadding, yPadding + 3 * height, levelUpSkillFunc);
    }

    private drawSkill(skill: CamelSkill, x: number, y: number, levelUpSkillFunc: (camelSkill: CamelSkill) => void) {        
        const level = skill.level;
        const xpToNextLevel = skill.getXpToNextLevel();

        this._ctx.fillText(`${skill.name}: ${level}`, x, y);

        this._ctx.fillText(`XP to next: ${xpToNextLevel}`, x + 150, y);

        this._btnService.createBtn(
            x + 270, 
            y - 20, 
            30, 
            30, 
            0,
            '#cc807a',
            '#f2ada7', 
            '#fff',
            () => levelUpSkillFunc(skill),
            `+`);
    }
}
