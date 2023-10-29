import { GameState } from "./game-state.js";
import { GlobalStaticConstants } from "./global-static-constants.js";
export class CashMoneyService {
    static drawCashMoney(ctx) {
        var img = new Image();
        img.src = './assets/egyptian-pound.jpg';
        img.onload = function () {
            ctx.save();
            ctx.drawImage(img, GlobalStaticConstants.innerWidth - 450, GlobalStaticConstants.innerHeight - 150, 400, 125);
            ctx.fillStyle = '#e8be9e';
            ctx.fillRect(GlobalStaticConstants.innerWidth - 375, GlobalStaticConstants.innerHeight - 125, 250, 25);
            ctx.font = '30pt Garamond';
            ctx.fillStyle = '#000';
            ctx.textAlign = "center";
            ctx.fillText('Cash money: ' + GameState.cashMoney, GlobalStaticConstants.innerWidth - 250, GlobalStaticConstants.innerHeight - 102, 250);
            ctx.restore();
        };
    }
}
