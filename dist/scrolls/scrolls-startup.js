import { GlobalComponents } from "../global/global-components.js";
import { ScrollsComponent } from "./scrolls-component.js";
export class ScrollsStartup {
    _globalServices;
    constructor(_globalServices) {
        this._globalServices = _globalServices;
    }
    registerComponents() {
        GlobalComponents.scrollsComponent = new ScrollsComponent(GlobalComponents.globalServices.navigatorService);
    }
}
