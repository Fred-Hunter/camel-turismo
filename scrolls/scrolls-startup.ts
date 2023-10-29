import { GlobalComponents } from "../global/global-components.js";
import { GlobalServices } from "../global/global-services.js";
import { ScrollsComponent } from "./scrolls-component.js";

export class ScrollsStartup {
    constructor(
        private readonly _globalServices: GlobalServices) { }

    public registerComponents() {
        GlobalComponents.scrollsComponent = new ScrollsComponent(GlobalComponents.globalServices.navigatorService);
    }
}
