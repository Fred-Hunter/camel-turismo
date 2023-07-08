class CanvasBtnService {
    constructor(public canvas: HTMLCanvasElement) {

    }

    getMousePosition(event: any) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }
  
    isInside(pos: any, rect: any) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
    }
  
    createBtn(
        xStart: number,
        yStart: number,
        width: number,
        height: number,
        radius: number,
        backgroundColour: string,
        borderColour: string,
        fontColour: string,
        onclickFunction: any,
        text: string) {
        var rect = {
            x: xStart,
            y: yStart,
            width: width,
            height: height
        };
    
        // Binding the click event on the canvas
        var context = this.canvas.getContext('2d')!;
        
        this.canvas.addEventListener('click', (event) => {
            let mousePos = this.getMousePosition(event);
        
            if (this.isInside(mousePos, rect)) {
                onclickFunction();
            }
        }, false);

        context.beginPath();
        context.roundRect(rect.x, rect.y, rect.width, rect.height, radius);
        context.fillStyle = backgroundColour;
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = borderColour;
        context.stroke();
        context.closePath();
        context.font = '30pt Kremlin Pro Web';
        context.fillStyle = fontColour;
        context.textAlign = "center";
        context.fillText(text, rect.x + rect.width / 2, rect.y + 5*rect.height/8, rect.x + rect.width);
    }  
}