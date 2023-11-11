import { CanvasNames } from "../global/canvas-names.js";
import { CanvasService } from "../global/canvas-service.js";
import { ImportantService } from "../global/important-service.js";
import { NavigatorService } from "../navigation/navigator-service.js";
import { Page } from "../navigation/page.js";
import { AcademyCommands } from "./academy-commands.js";
import { AcademyDrawing } from "./academy-drawing.js";
import { AcademyBuildingLevel, AcademyBuildingType, AcademyCoord } from "./academy.js";

export class AcademyComponent {
    constructor(
        private readonly _navigator: NavigatorService,
        private readonly _academyCommands: AcademyCommands,
        private readonly _academyDrawing: AcademyDrawing
    ) {
        this._academyCanvas = CanvasService.getCanvasByName(CanvasNames.Academy);
    }

    private _academyCanvas: HTMLCanvasElement;
    private _clickEventListeners: Array<(event: MouseEvent) => void> = [];
    private _selectedBuildingType: AcademyBuildingType | undefined;

    public load(): void {
        this.setupAcademyControls();

        this._academyCommands.initAcademy();
        this._academyDrawing.drawGround();
        this._academyDrawing.drawAcademy();
        this._academyDrawing.drawBack(() => this.unload());
        this.registerClick();
        CanvasService.showCanvas(CanvasNames.Academy);
    }

    public unload(): void {
        this._clickEventListeners.forEach(o => {
            this._academyCanvas.removeEventListener('click', o, false)
        });

        this._clickEventListeners = [];
        let academySection = document.getElementById('academy');
        academySection?.remove();
        this._navigator.requestPageNavigation(Page.mapOverview);
    }

    private setupAcademyControls() {
        let academySection = document.getElementById('academy');

        if (!academySection) {
            academySection = document.createElement('section');
            academySection.id = 'academy';

            document.body.appendChild(academySection);
            academySection.style.display = 'flex';
        }

        this.createSelectButton(academySection, AcademyBuildingType.Dwelling);
        this.createSelectButton(academySection, AcademyBuildingType.Farm);
        this.createSelectButton(academySection, AcademyBuildingType.Stables);
    }

    private createSelectButton(academySection: HTMLElement, buildingType: AcademyBuildingType): void {
        const button = document.createElement('button');
        button.classList.add('academy__button');
        button.innerText = this.getButtonText(buildingType);

        button.onclick = () => this._selectedBuildingType = buildingType;

        academySection.appendChild(button);
    }

    private getButtonText(buildingType: AcademyBuildingType): string {
        switch (buildingType) {
            case AcademyBuildingType.Dwelling: return "Dwelling";
            case AcademyBuildingType.Stables: return "Stables";
            case AcademyBuildingType.Farm: return "Farm";
        }
    }

    private registerClick() {
        const clickHandler = (event: MouseEvent) => {
            if (this._selectedBuildingType === undefined) {
                return;
            }

            const rect = this._academyCanvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const coords = ImportantService.ConvertRealToCoord(x, y, 2);

            this._academyCommands.AddBuildingToAcademy(
                this._selectedBuildingType,
                AcademyBuildingLevel.Basic,
                { x: Math.floor(coords.x2) as AcademyCoord, y: Math.floor(coords.y2) as AcademyCoord });

            this._academyDrawing.drawAcademy();
        };

        this._clickEventListeners.push(clickHandler);
        this._academyCanvas.addEventListener('click', clickHandler);
    }
}