class CamelSkillDrawing {
    constructor(private readonly _navigator: NavigatorService) {
        this._canvas = CanvasService.getCanvasByName(CanvasNames.CamelManagement);
        this._ctx = this._canvas.getContext('2d')!;
        this._btnService = new CanvasBtnService(this._canvas, _navigator);
    }

    private readonly _ctx: CanvasRenderingContext2D;
    private readonly _canvas: HTMLCanvasElement;
    private readonly _btnService: CanvasBtnService

    public drawPage(camel: Camel, levelUpSkillFunc: (camelSkill: CamelSkill) => void) {
        this._ctx.save();
        this._ctx.font = '12pt Garamond';

        this._ctx.clearRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        this._btnService.removeEventListeners();

        const maxX = this._canvas.width / GlobalStaticConstants.devicePixelRatio;

        this.drawOverview(camel, maxX / 40, maxX / 40);
        this.drawSkills(camel, levelUpSkillFunc);
        this._btnService.drawBackButton(Page.mapOverview);

        this._ctx.restore();
    }

    private drawOverview(camel: Camel, x: number, y: number) {
        const nameText = `${camel.name}`;
        const nameTextLength = this._ctx.measureText(nameText).width;

        const xpText = `XP: ${camel.unspentXp}`;
        const xpTextLength = this._ctx.measureText(xpText).width;

        this._ctx.fillText(nameText, x, y);
        this._ctx.fillText(xpText, x + nameTextLength + 20, y);
        this._ctx.fillText(camel.potentialDescription, x + nameTextLength + xpTextLength + 40, y);
    }

    private drawSkills(camel: Camel, levelUpSkillFunc: (camelSkill: CamelSkill) => void) {
        const maxX = this._canvas.width / GlobalStaticConstants.devicePixelRatio;

        const xPadding = maxX / 40;
        const yPadding = maxX / 40;

        const height = 40;

        this.drawSkill(camel.agility, xPadding, yPadding + height, levelUpSkillFunc);
        this.drawSkill(camel.sprintSpeed, xPadding, yPadding + 2 * height, levelUpSkillFunc);
        this.drawSkill(camel.stamina, xPadding, yPadding + 3 * height, levelUpSkillFunc);
        this.drawSkillStar([camel.agility, camel.sprintSpeed, camel.stamina], maxX / 2, yPadding + 9 * height);
    }

    private drawSkill(skill: CamelSkill, x: number, y: number, levelUpSkillFunc: (camelSkill: CamelSkill) => void) {
        const level = skill.level;
        const xpToNextLevel = skill.getXpToNextLevel();

        this._ctx.fillText(`${skill.name}: ${level}`, x, y);

        if (xpToNextLevel > 0) {
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

    private drawSkillStar(skills: CamelSkill[], x: number, y: number) {
        const maxRadius = 99;

        // Center for small screens, otherwise offset from edge
        x = x > 2 * maxRadius ? 2 * maxRadius : x;
        const numberOfSkills = skills.length;
        let points: any[] = [];

        // Draw ring
        this._ctx.strokeStyle = GlobalStaticConstants.mediumColour;
        this._ctx.beginPath();
        this._ctx.arc(x, y, maxRadius, 0, 2 * Math.PI);
        this._ctx.stroke();

        this._ctx.lineWidth = 2;
        this._ctx.strokeStyle = "black";
        this._ctx.fillStyle = "black";

        skills.forEach((s, i) => {

            // Calculate point
            const angle = 2 * Math.PI * i / numberOfSkills;
            const radius = maxRadius * s.level / 100;
            const spotX = (r: number) => x + r * Math.cos(angle);
            const spotY = (r: number) => y + r * Math.sin(angle);
            points?.push({ x: spotX(radius), y: spotY(radius) });

            // Draw point
            this._ctx.beginPath();
            this._ctx.moveTo(spotX(radius), spotY(radius));
            this._ctx.arc(spotX(radius), spotY(radius), 2, 0, 2 * Math.PI);
            this._ctx.stroke();
            this._ctx.fill();

            // Draw label
            const labelLength = this._ctx.measureText(s.name).width + 10;
            this._ctx.fillText(s.name, spotX(1) < x ? spotX(maxRadius) - 5 - labelLength : spotX(maxRadius) + 5, spotY(maxRadius));

        });

        // Draw and fill shape
        this._ctx.beginPath();
        points.forEach(p => {
            this._ctx.lineTo(p.x, p.y);
        })
        this._ctx.lineTo(points[0].x, points[0].y);
        this._ctx.stroke();
        this._ctx.fillStyle = GlobalStaticConstants.mediumColour;
        this._ctx.fill();

        // Draw center
        this._ctx.beginPath();
        this._ctx.moveTo(x, y);
        this._ctx.arc(x, y, 1, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.fillStyle = "black";
        this._ctx.fill();

    }
}
