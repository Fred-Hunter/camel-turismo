import { GlobalComponents } from "../global/global-components";
import { globalServices } from "../main";
import { ScrollsComponent } from "./scrolls-component";
export class ScrollsStartup {
    _globalServices;
    constructor(_globalServices) {
        this._globalServices = _globalServices;
    }
    registerComponents() {
        GlobalComponents.scrollsComponent = new ScrollsComponent(globalServices.navigatorService);
    }
}
