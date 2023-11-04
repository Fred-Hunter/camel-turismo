import { CanvasBtnService } from "../../global/canvas-btn-service.js";
import { CanvasNames } from "../../global/canvas-names.js";
import { CanvasService } from "../../global/canvas-service.js";
import { GlobalStaticConstants } from "../../global/global-static-constants.js";
import { NavigatorService } from "../../navigation/navigator-service.js";
import { Page } from "../../navigation/page.js";
import { Camel } from "../camel-creation/camel.js";
import { CamelSkill } from "./camel-skill.js";

export class CamelSkillDrawing {
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
        let xTextOffset = 0;
        const xPaddingOffset = 20;

        const nameText = `${camel.name}`;
        const xpText = `XP: ${camel.unspentXp}`;

        this._ctx.fillText(nameText, x, y);
        xTextOffset += this._ctx.measureText(nameText).width;

        this._ctx.fillText(xpText, x + xTextOffset + xPaddingOffset, y);
        xTextOffset += this._ctx.measureText(xpText).width;

        this._ctx.fillText(camel.potentialDescription, x + xTextOffset + 2 * xPaddingOffset, y);
        xTextOffset += this._ctx.measureText(camel.potentialDescription).width;

        // Why y - 20?
        this.drawAwards(camel, x + xTextOffset + 3 * xPaddingOffset, y - 20);
    }

    private drawSkills(camel: Camel, levelUpSkillFunc: (camelSkill: CamelSkill) => void) {
        const maxX = this._canvas.width / GlobalStaticConstants.devicePixelRatio;

        const xPadding = maxX / 40;
        const yPadding = maxX / 40;

        const height = 40;

        this.drawSkill(camel.agility, xPadding, yPadding + height, levelUpSkillFunc);
        this.drawSkill(camel.sprintSpeed, xPadding, yPadding + 2 * height, levelUpSkillFunc);
        this.drawSkill(camel.stamina, xPadding, yPadding + 3 * height, levelUpSkillFunc);
        this.drawSkill(camel.intimidation, xPadding, yPadding + 4 * height, levelUpSkillFunc);
        this.drawSkill(camel.confidence, xPadding, yPadding + 5 * height, levelUpSkillFunc);
        
        this.drawSkillStar([camel.agility, camel.sprintSpeed, camel.stamina, camel.intimidation, camel.confidence], maxX / 2, yPadding + 9 * height);  
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
                5,
                '#cc807a',
                '#f2ada7',
                '#fff',
                () => levelUpSkillFunc(skill),
                [`+`]);
        }
    }

    private drawSkillStar(skills: CamelSkill[], x: number, y: number) {
        const maxRadius = 99;

        // Center for small screens, otherwise offset from edge
        x = x > 2 * maxRadius ? 2 * maxRadius : x;

        // Draw ring
        this._ctx.strokeStyle = GlobalStaticConstants.mediumColour;
        this._ctx.beginPath();
        this._ctx.arc(x, y, maxRadius, 0, 2 * Math.PI);
        this._ctx.stroke();

        this._ctx.lineWidth = 2;
        this._ctx.strokeStyle = "black";
        this._ctx.fillStyle = "black";

        this.drawPotentialOnStar(skills, maxRadius, x, y);
        this.drawSkillsOnStar(skills, maxRadius, x, y);

        // Draw center
        this._ctx.beginPath();
        this._ctx.moveTo(x, y);
        this._ctx.arc(x, y, 1, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.fillStyle = "black";
        this._ctx.fill();
    }

    private drawSkillsOnStar(skills: CamelSkill[], maxRadius: number, x: number, y: number) {
        const numberOfSkills = skills.length;
        let points: any[] = [];

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
    }

    private drawPotentialOnStar(skills: CamelSkill[], maxRadius: number, x: number, y: number) {
        const numberOfSkills = skills.length;
        let points: any[] = [];

        this._ctx.save();
        this._ctx.fillStyle = GlobalStaticConstants.lightColour;
        this._ctx.strokeStyle = GlobalStaticConstants.lightColour;

        skills.forEach((s, i) => {
            // Calculate point
            const angle = 2 * Math.PI * i / numberOfSkills;
            const radius = maxRadius * s.potential / 100;
            const spotX = (r: number) => x + r * Math.cos(angle);
            const spotY = (r: number) => y + r * Math.sin(angle);
            points?.push({ x: spotX(radius), y: spotY(radius) });

            // Draw point
            this._ctx.beginPath();
            this._ctx.moveTo(spotX(radius), spotY(radius));
            this._ctx.arc(spotX(radius), spotY(radius), 2, 0, 2 * Math.PI);
            this._ctx.stroke();
            this._ctx.fill();
        });

        // Draw and fill shape
        this._ctx.beginPath();
        points.forEach(p => {
            this._ctx.lineTo(p.x, p.y);
        })

        this._ctx.lineTo(points[0].x, points[0].y);
        this._ctx.stroke();

        this._ctx.fill();
        this._ctx.restore();
    }

    private drawAwards(camel: Camel, x: number, y: number) {
        const achievementLevel = camel.achievementsUnlocked;
        if (achievementLevel < 1) return;

        const maxAchievementLevel = 8;
        const scaling = 1/8;

        const context = this._ctx;

        const img = new Image();
		img.src = "./graphics/medals.svg";
        img.onload = function() {
            const spriteWidth = img.naturalWidth / maxAchievementLevel;
            context.drawImage(
                img, // img
                (achievementLevel - 1) * spriteWidth, // sx
                0, // sy
                spriteWidth, // sw
                img.naturalHeight, // sh
                x, // dx
                y, // dy
                spriteWidth * scaling, // dw
                img.naturalHeight * scaling); // dh
        };
    }
}
