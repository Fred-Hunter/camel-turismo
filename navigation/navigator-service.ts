import { CalendarDetailsDrawing } from "../calendar/calendar-details-drawing";
import { CanvasNames } from "../global/canvas-names";
import { CanvasService } from "../global/canvas-service";
import { GameState } from "../global/game-state";
import { GlobalComponents } from "../global/global-components";
import { MapOverview } from "../map/map-overview";
import { Page } from "./page";

export class NavigatorService {
    private _pageLoaded = false;
    private _currentPage = Page.loading;
    private _postNavigationFunc: () => void = () => { };

    public requestPageNavigation(page: Page, postNavigationFunc?: () => void): void {
        if (!this.canNavigate(page)) {
            return;
        }

        this._postNavigationFunc = postNavigationFunc ?? (() => { });
        this._pageLoaded = false
        this._currentPage = page;
    }

    public doNavigation(): void {
        if (this._pageLoaded === false) {
            CanvasService.hideAllCanvas();
            const camelSelectSection = document.getElementById('camel-select');

            if (!!camelSelectSection) {
                camelSelectSection.innerHTML = ''
                camelSelectSection.style.display = 'none';
            }

            const scrollsSection = document.getElementById('scrolls');

            if (!!scrollsSection) {
                scrollsSection.innerHTML = ''
                scrollsSection.style.display = 'none';
            }

            switch (this._currentPage) {
                case Page.loading:
                    this.navigateToLoading();
                    break;
                case Page.mapOverview:
                    MapOverview.load();
                    break;
                case Page.management:
                    GlobalComponents.camelSkillComponent.load();
                    break;
                case Page.raceSelection:
                    GlobalComponents.raceSelection.load();
                    break;
                case Page.race:
                    GlobalComponents.raceComponent.load();
                    break;
                case Page.raceCamelSelect:
                    GlobalComponents.raceCamelSelectComponent.load();
                    break;
                case Page.managementSelect:
                    GlobalComponents.camelManagementSelectComponent.load();
                    break;
                case Page.calendarDetails:
                    this.navigateToCalendarDetails();
                    break;
                case Page.debug:
                    GlobalComponents.isometricEditorComponent.load();
                    break;
                case Page.scrolls:
                    GlobalComponents.scrollsComponent.load();
                    break;
            }

            this._postNavigationFunc();
            this._pageLoaded = true;
        }
    }

    private canNavigate(requestedPage: Page): boolean {
        switch (requestedPage) {
            case Page.raceSelection:
                return !!GameState.camel;
        }

        return true;
    }

    private navigateToLoading() {
        CanvasService.showCanvas(CanvasNames.LoadingScreen);
        GlobalComponents.loadingScreen.drawLoadingScreen();
    }

    private navigateToCalendarDetails() {
        CanvasService.showCanvas(CanvasNames.CalendarDetails);
        CalendarDetailsDrawing.drawCalendarDetails();
    }
}
