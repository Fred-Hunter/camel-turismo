import { CanvasBtnService } from "../global/canvas-btn-service";
import { GlobalStaticConstants } from "../global/global-static-constants";
import { globalServices } from "../main";
import { Page } from "../navigation/page";
import { CalendarService } from "./calendar-service";
export class CalendarOverviewDrawing {
    static drawCalendarOverview(canvas) {
        const btnService = new CanvasBtnService(canvas, globalServices.navigatorService);
        const calendar = CalendarService.getCalendar();
        const widthUnit = GlobalStaticConstants.innerWidth / 20;
        const heightUnit = GlobalStaticConstants.innerHeight / 20;
        btnService.createBtn(15 * widthUnit, // x
        0.5 * heightUnit, // y
        4 * widthUnit, // width
        2 * heightUnit, // height
        10, 10, CalendarService.getSeasonDarkerColour(calendar.Season), CalendarService.getSeasonLighterColour(calendar.Season), '#fff', () => globalServices.navigatorService.requestPageNavigation(Page.calendarDetails), ['Day ' + calendar.Day.toString(), CalendarService.getSeasonAsString(calendar.Season)]);
    }
}
