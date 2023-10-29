import { CanvasNames } from "../../global/canvas-names";
import { CanvasService } from "../../global/canvas-service";
import { GameState } from "../../global/game-state";
import { Camel } from "../camel-creation/camel";
import { CamelSkill } from "./camel-skill";
import { CamelSkillCommands } from "./camel-skill-commands";
import { CamelSkillDrawing } from "./camel-skill-drawing";

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
