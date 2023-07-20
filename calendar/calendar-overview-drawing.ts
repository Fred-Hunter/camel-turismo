class CalendarOverviewDrawing {
    static drawCalendarOverview(canvas: HTMLCanvasElement) {
        const btnService = new CanvasBtnService(canvas, globalServices.navigatorService);

        const calendar = CalendarService.getCalendar();

        btnService.createBtn(
            7 * GlobalStaticConstants.innerWidth / 10,
            GlobalStaticConstants.innerHeight / 10,
            5 * GlobalStaticConstants.innerWidth / 20,
            2 * GlobalStaticConstants.innerHeight / 10,
            10,
            10,
            CalendarService.getSeasonDarkerColour(calendar.Season),
            CalendarService.getSeasonLighterColour(calendar.Season),
            '#fff',
            () => globalServices.navigatorService.requestPageNavigation(Page.calendarDetails),
            ['Day ' + calendar.Day.toString(), CalendarService.getSeasonAsString(calendar.Season)]);
    }
}