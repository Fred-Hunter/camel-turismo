import { CanvasNames } from "../../global/canvas-names";
import { CanvasService } from "../../global/canvas-service";
import { GameState } from "../../global/game-state";
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
