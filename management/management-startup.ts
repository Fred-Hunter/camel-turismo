import { GameState } from "../global/game-state";
import { GlobalComponents } from "../global/global-components";
import { GlobalServices } from "../global/global-services";
import { Page } from "../navigation/page";
import { Camel } from "./camel-creation/camel";
import { CamelSelectComponent } from "./camel-select/camel-select-component";
import { CamelSkillCommands } from "./skills/camel-skill-commands";
import { CamelSkillComponent } from "./skills/camel-skill-component";
import { CamelSkillDrawing } from "./skills/camel-skill-drawing";

export class ManagementStartup {
    constructor(
        private readonly _globalServices: GlobalServices) { }

    public registerComponents() {
        const camelSkillDrawing = new CamelSkillDrawing(this._globalServices.navigatorService);
        const camelSkillCommands = new CamelSkillCommands();

        GlobalComponents.camelSkillComponent = new CamelSkillComponent(camelSkillDrawing, camelSkillCommands);

        const selectCamelFunc = (camel: Camel) => {
            GameState.camel = camel;
            this._globalServices.navigatorService.requestPageNavigation(Page.management);
        };
        
        GlobalComponents.camelManagementSelectComponent = new CamelSelectComponent(selectCamelFunc);
    }
}
