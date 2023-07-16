class NavigatorService {
    private _pageLoaded = false;
    private _currentPage = Page.loading;

    public requestPageNavigation(page: Page): void {
        if (!this.canNavigate(page)) {
            return;
        }

        this._pageLoaded = false
        this._currentPage = page;
    }

    public doNavigation(): void {
        if (this._pageLoaded === false) {
            CanvasService.hideAllCanvas();

            switch (this._currentPage) {
                case Page.loading:
                    this.navigateToLoading();
                    break;
                case Page.mapOverview:
                    this.navigateToOverview();
                    break;
                case Page.management:
                    this.navigateToManagement();
                    break;
                case Page.raceSelection:
                    this.navigateToRaceSelection();
                    break;
                case Page.race:
                    this.navigateToRace();
                    break;
            }

            this._pageLoaded = true;
        }
    }

    private canNavigate(requestedPage: Page): boolean {
        switch (requestedPage) {
            case Page.raceSelection:
                return !!camel;
        }

        return true;
    }

    private navigateToLoading() {
        CanvasService.showCanvas(CanvasNames.LoadingScreen);
        loadingScreen.drawLoadingScreen();
    }

    private navigateToOverview() {
        MapOverview.showMap();
        MapOverview.renderMap();
    }

    private navigateToManagement() {
        CanvasService.showCanvas(CanvasNames.CamelManagement);
        camelSkillComponent.load(camel);
    }

    private navigateToRaceSelection() {
        CanvasService.showCanvas(CanvasNames.RaceSelection);
        raceSelection.drawSelectionScreen();
    }

    private navigateToRace() {
        CanvasService.showCanvas(CanvasNames.RaceBackground);
        CanvasService.showCanvas(CanvasNames.RaceCamel);
        CanvasService.showCanvas(CanvasNames.Countdown);

        CanvasService.bringCanvasToTop(CanvasNames.RaceBackground);
        CanvasService.bringCanvasToTop(CanvasNames.RaceCamel);
        CanvasService.bringCanvasToTop(CanvasNames.Countdown);
    }
}