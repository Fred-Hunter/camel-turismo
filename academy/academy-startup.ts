import { GlobalComponents } from "../global/global-components.js";
import { GlobalServices } from "../global/global-services.js";
import { AcademyCommands } from "./academy-commands.js";
import { AcademyComponent } from "./academy-component.js";
import { AcademyDrawing } from "./academy-drawing.js";

export class AcademyStartup {
    constructor(
        private readonly _globalServices: GlobalServices) { }

    public registerComponents() {
        const academyCommands = new AcademyCommands();
        const academyDrawing = new AcademyDrawing();

        GlobalComponents.academyComponent = new AcademyComponent(
            this._globalServices.navigatorService,
            academyCommands,
            academyDrawing);
    }
}