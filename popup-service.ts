class PopupService {
    constructor() {
    }

    public static drawAlertPopup(text: string) {
        const canvas = CanvasService.getCanvasByName(CanvasNames.PopupCanvas);
        CanvasService.bringCanvasToTop(CanvasNames.PopupCanvas);
        CanvasService.showCanvas(CanvasNames.PopupCanvas);

        const ctx = canvas?.getContext('2d');
        if (!ctx) return;

        const width = 400;
        const height = 120;

        const x = (canvas.width / window.devicePixelRatio) / 2 - width / 2; 
        const y = window.innerHeight/2 - height/4; 

        const bgColour = GlobalStaticConstants.backgroundColour;
        const textColour =GlobalStaticConstants.highlightColour;
        const highlightColour =GlobalStaticConstants.highlightColour;

        // Draw the background rectangle
        const backgroundRect: [number, number, number, number] = [
            x,
            y,
            width,
            height
        ];
        ctx.strokeStyle = highlightColour;
        ctx.lineWidth = 3;
        ctx.fillStyle = bgColour;
        ctx.rect(...backgroundRect);
        ctx.fill();
        ctx.stroke();
        
        // Draw the popup content
        const textLines = this.getLines(ctx, text, width/2 - 50);
        let textOffset = 0;
        ctx.fillStyle = textColour;
        ctx.font = 'bold 20px Arial';

        textLines.forEach((t) => {
            ctx.fillText(t, x + 20, y + backgroundRect[3]/3 + textOffset);
            textOffset += 30;
        });
        
        // Draw the close button
        ctx.fillStyle = highlightColour;
        ctx.fillRect(x + backgroundRect[2] - 60, y, 60, 30);
        ctx.fillStyle = "#fff";
        ctx.font = '14px Arial';
        ctx.fillText('Close', x + backgroundRect[2] - 55, y + 20, backgroundRect[3]);
        
        // Add an event listener to handle the close button click
        canvas.addEventListener('click', function(event) {
            var rect = canvas.getBoundingClientRect();
            var mouseX = event.clientX - rect.left;
            var mouseY = event.clientY - rect.top;
            
            if (
                mouseX >= backgroundRect[0] &&
                mouseX <= backgroundRect[0] + backgroundRect[2] &&
                mouseY >= backgroundRect[1] &&
                mouseY <= backgroundRect[1] + backgroundRect[3]) 
            {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                CanvasService.hideCanvas(CanvasNames.PopupCanvas);
            }
        });
    }
    
    public static drawTwoOptionPopup(canvas: HTMLCanvasElement,
        x:number,
        y:number,
        option1Text: string,
        option2Text: string,
        option1Callback: any,
        option2Callback: any) {
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
    }

    private static getLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number):string[] {
        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];

        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var width = ctx.measureText(currentLine + " " + word).width;
            
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }
}
