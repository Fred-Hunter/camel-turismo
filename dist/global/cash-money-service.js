import { GameState } from "./game-state.js";
import { GlobalStaticConstants } from "./global-static-constants.js";
export class CashMoneyService {
    static drawCashMoney(ctx) {
        var img = new Image();
        img.src = './assets/egyptian-pound.jpg';
        img.onload = function () {
            ctx.save();
            ctx.drawImage(img, GlobalStaticConstants.innerWidth - 300, GlobalStaticConstants.innerHeight - 120, 300, 95);
            ctx.font = 'bold 25pt Garamond';
            ctx.fillStyle = GlobalStaticConstants.highlightColour;
            ctx.strokeStyle = '#e8be9e';
            ctx.lineWidth = 3;
            ctx.textAlign = "center";
            const text = ['Cash money: ' + GameState.cashMoney, GlobalStaticConstants.innerWidth - 160, GlobalStaticConstants.innerHeight - 70, 300];
            ctx.strokeText(...text);
            ctx.fillText(...text);
            ctx.restore();
        };
    }
}
