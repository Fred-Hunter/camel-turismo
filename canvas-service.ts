class CanvasService {
    getCanvas(zIndex: string, id: string = ''): HTMLCanvasElement {
        const canvas = document.createElement('canvas');

        document.body.appendChild(canvas);

        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.style.position = 'absolute';
        canvas.style.zIndex = zIndex;

        // Set actual size in memory (scaled to account for extra pixel density).
        var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
        canvas.width = Math.floor(width * scale);
        canvas.height = Math.floor(height * scale);

        const ctx = canvas.getContext('2d')!;

        // Normalize coordinate system to use css pixels.
        ctx.scale(scale, scale);

        canvas.id = id;

        return canvas;
    }
}