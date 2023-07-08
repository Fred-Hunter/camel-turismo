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
        backgroundColour: string,
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
        context.rect(rect.x, rect.y, rect.width, rect.height);
        context.fillStyle = backgroundColour;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = '#000000';
        context.stroke();
        context.closePath();
        context.font = '30pt Kremlin Pro Web';
        context.fillStyle = fontColour;
        context.fillText(text, rect.x + rect.width / 8, rect.y + 3*rect.height/4, rect.x + 7*rect.width / 8);
    }  
}