import { Colour } from "../assets/colours.js";
import { CanvasBtnService } from "../global/canvas-btn-service.js";
import { GlobalComponents } from "../global/global-components.js";
import { GlobalStaticConstants } from "../global/global-static-constants.js";
import { Page } from "../navigation/page.js";
import { CalendarService } from "./calendar-service.js";
export class CalendarOverviewDrawing {
    static drawCalendarOverview(canvas) {
        const btnService = new CanvasBtnService(canvas);
        const calendar = CalendarService.getCalendar();
        const widthUnit = GlobalStaticConstants.innerWidth / 20;
        const heightUnit = GlobalStaticConstants.innerHeight / 20;
        btnService.createBtn(15 * widthUnit, // x
        0.5 * heightUnit, // y
        4 * widthUnit, // width
        2 * heightUnit, // height
        10, 10, CalendarService.getSeasonDarkerColour(calendar.Season), CalendarService.getSeasonLighterColour(calendar.Season), Colour.white, () => GlobalComponents.globalServices.navigatorService.requestPageNavigation(Page.calendarDetails), ['Day ' + calendar.Day.toString(), CalendarService.getSeasonAsString(calendar.Season)]);
    }
}
