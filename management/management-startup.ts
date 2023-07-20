class ManagementStartup {
    constructor(
        private readonly _globalServices: GlobalServices) { }

    public registerComponents() {
        const camelSkillDrawing = new CamelSkillDrawing(this._globalServices.navigatorService);
        const camelSkillCommands = new CamelSkillCommands();

        camelSkillComponent = new CamelSkillComponent(camelSkillDrawing, camelSkillCommands);

        const selectCamelFunc = (camel: Camel) => {
            GameState.camel = camel;
            this._globalServices.navigatorService.requestPageNavigation(Page.management);
        };
        
        camelManagementSelectComponent = new CamelSelectComponent(selectCamelFunc);
    }
}