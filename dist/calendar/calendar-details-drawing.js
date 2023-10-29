import { CanvasBtnService } from "../global/canvas-btn-service";
import { CanvasNames } from "../global/canvas-names";
import { CanvasService } from "../global/canvas-service";
import { GlobalStaticConstants } from "../global/global-static-constants";
import { globalServices } from "../main";
import { Page } from "../navigation/page";
import { CalendarService } from "./calendar-service";
export class CalendarDetailsDrawing {
    static drawCalendarDetails() {
        const canvas = CanvasService.getCanvasByName(CanvasNames.CalendarDetails);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        ctx.fillRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        const numberOfColumns = 6;
        const numberOfRows = 5;
        const calendarXStart = GlobalStaticConstants.innerWidth / 10;
        const calendarYStart = GlobalStaticConstants.innerHeight / 5;
        const calendarWidth = 4 * GlobalStaticConstants.innerWidth / 5;
        const calendarHeight = 7 * GlobalStaticConstants.innerHeight / 10;
        ctx.fillStyle = '#fff';
        ctx.fillRect(calendarXStart - 2, calendarYStart - 2, calendarWidth + 4, calendarHeight + 4);
        const calendar = CalendarService.getCalendar();
        const standardTileFillColour = this.getStandardTileColour(calendar.Season);
        ctx.fillStyle = standardTileFillColour;
        ctx.font = '40pt Garamond';
        ctx.textAlign = 'center';
        ctx.fillText(CalendarService.getSeasonAsString(calendar.Season), GlobalStaticConstants.innerWidth / 2, calendarYStart / 2, GlobalStaticConstants.innerWidth);
        ctx.font = '12pt Garamond';
        const currentDay = calendar.Day;
        const currentDayTileColour = this.getCurrentDayTileColour(calendar.Season);
        for (let column = 0; column < numberOfColumns; column++) {
            for (let row = 0; row < numberOfRows; row++) {
                const x = calendarXStart + (column * calendarWidth / (numberOfColumns)) + 2;
                const y = calendarYStart + (row * calendarHeight / (numberOfRows)) + 2;
                const width = (calendarWidth / numberOfColumns) - 4;
                const height = (calendarHeight / numberOfRows) - 4;
                const day = column + 1 + row * numberOfColumns;
                if (day === currentDay) {
                    ctx.fillStyle = currentDayTileColour;
                }
                ctx.fillRect(x, y, width, height);
                ctx.fillStyle = '#fff';
                ctx.fillText(day.toString(), x + width / 10, y + height / 5);
                ctx.fillStyle = standardTileFillColour;
            }
        }
        const btnService = new CanvasBtnService(canvas, globalServices.navigatorService);
        btnService.drawBackButton(Page.mapOverview, standardTileFillColour, currentDayTileColour);
    }
    static getStandardTileColour(season) {
        return CalendarService.getSeasonDarkerColour(season);
    }
    static getCurrentDayTileColour(season) {
        return CalendarService.getSeasonLighterColour(season);
    }
}
