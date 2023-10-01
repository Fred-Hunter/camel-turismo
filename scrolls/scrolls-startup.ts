class ScrollsStartup {
    constructor(
        private readonly _globalServices: GlobalServices) { }

    public registerComponents() {
        scrollsComponent = new ScrollsComponent(globalServices.navigatorService);
    }
}