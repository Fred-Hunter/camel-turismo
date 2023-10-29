import { CanvasNames } from "../../global/canvas-names.js";
import { CanvasService } from "../../global/canvas-service.js";
import { GameState } from "../../global/game-state.js";
import { Camel } from "../camel-creation/camel.js";
import { CamelSkill } from "./camel-skill.js";
import { CamelSkillCommands } from "./camel-skill-commands.js";
import { CamelSkillDrawing } from "./camel-skill-drawing.js";

export class CamelSkillComponent {
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
