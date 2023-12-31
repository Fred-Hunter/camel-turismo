import { CanvasNames } from "../../global/canvas-names.js";
import { CanvasService } from "../../global/canvas-service.js";
import { GameState } from "../../global/game-state.js";
export class CamelSkillComponent {
    _camelSkillDrawing;
    _camelSkillCommands;
    constructor(_camelSkillDrawing, _camelSkillCommands) {
        this._camelSkillDrawing = _camelSkillDrawing;
        this._camelSkillCommands = _camelSkillCommands;
    }
    load() {
        CanvasService.showCanvas(CanvasNames.CamelManagement);
        this._camelSkillDrawing.drawPage(GameState.camel, (camelSkill) => this.levelUpSkill(GameState.camel, camelSkill));
    }
    levelUpSkill = (camel, skill) => {
        this._camelSkillCommands.levelUpSkill(camel, skill);
        this.load();
    };
}
