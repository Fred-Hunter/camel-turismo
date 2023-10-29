import { CanvasBtnService } from "../global/canvas-btn-service";
import { GlobalComponents } from "../global/global-components";
import { GlobalStaticConstants } from "../global/global-static-constants";
import { Page } from "../navigation/page";
import { CalendarService } from "./calendar-service";

export class CalendarOverviewDrawing {
    static drawCalendarOverview(canvas: HTMLCanvasElement) {
        const btnService = new CanvasBtnService(canvas, GlobalComponents.globalServices.navigatorService);

        const calendar = CalendarService.getCalendar();
        const widthUnit = GlobalStaticConstants.innerWidth / 20;
        const heightUnit = GlobalStaticConstants.innerHeight / 20;

        btnService.createBtn(
            15 * widthUnit, // x
            0.5 * heightUnit, // y
            4 * widthUnit, // width
            2 * heightUnit, // height
            10,
            10,
            CalendarService.getSeasonDarkerColour(calendar.Season),
            CalendarService.getSeasonLighterColour(calendar.Season),
            '#fff',
            () => GlobalComponents.globalServices.navigatorService.requestPageNavigation(Page.calendarDetails),
            ['Day ' + calendar.Day.toString(), CalendarService.getSeasonAsString(calendar.Season)]);
    }
}
