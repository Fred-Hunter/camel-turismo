import { GameState } from "../global/game-state.js";
import { GlobalComponents } from "../global/global-components.js";
import { Page } from "../navigation/page.js";
import { CamelSelectComponent } from "./camel-select/camel-select-component.js";
import { CamelSkillCommands } from "./skills/camel-skill-commands.js";
import { CamelSkillComponent } from "./skills/camel-skill-component.js";
import { CamelSkillDrawing } from "./skills/camel-skill-drawing.js";
export class ManagementStartup {
    _globalServices;
    constructor(_globalServices) {
        this._globalServices = _globalServices;
    }
    registerComponents() {
        const camelSkillDrawing = new CamelSkillDrawing(this._globalServices.navigatorService);
        const camelSkillCommands = new CamelSkillCommands();
        GlobalComponents.camelSkillComponent = new CamelSkillComponent(camelSkillDrawing, camelSkillCommands);
        const selectCamelFunc = (camel) => {
            GameState.camel = camel;
            this._globalServices.navigatorService.requestPageNavigation(Page.management);
        };
        GlobalComponents.camelManagementSelectComponent = new CamelSelectComponent(selectCamelFunc);
    }
}
