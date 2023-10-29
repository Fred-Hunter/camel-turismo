import { GlobalComponents } from "../global/global-components";
import { GlobalServices } from "../global/global-services";
import { ScrollsComponent } from "./scrolls-component";

export class ScrollsStartup {
    constructor(
        private readonly _globalServices: GlobalServices) { }

    public registerComponents() {
        GlobalComponents.scrollsComponent = new ScrollsComponent(GlobalComponents.globalServices.navigatorService);
    }
}
