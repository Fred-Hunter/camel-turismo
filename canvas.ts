class Game {
    constructor(
        private readonly _canvas: HTMLCanvasElement) {
        this.cubeService = new CubeService(_canvas.getContext("2d")!);
    }

    private cubeService: CubeService;

    private get ctx(): CanvasRenderingContext2D {
        return this._canvas.getContext("2d")!;
    }

    public draw = () => {} //test please ignore
}
