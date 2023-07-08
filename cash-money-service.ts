class CashMoneyService {
    public static drawCashMoney(ctx: CanvasRenderingContext2D): void {
        var img = new Image();
        img.src = './egyptian-pound.jpg';
        img.onload = function() {
            ctx.drawImage(img, window.innerWidth - 450, window.innerHeight - 150, 400, 125);
            ctx.fillStyle = '#e8be9e';
            ctx.fillRect(window.innerWidth - 375, window.innerHeight - 125, 250, 25);
            ctx.font = '30pt Garamond';
            ctx.fillStyle = '#000';
            ctx.textAlign = "center";
            ctx.fillText('Cash money: ' + cashMoney, window.innerWidth - 250, window.innerHeight - 102, 250);
        }
    }
}