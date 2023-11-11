import { CanvasNames } from "../global/canvas-names.js";
import { CanvasService } from "../global/canvas-service.js";
import { ImportantService } from "../global/important-service.js";
import { Page } from "../navigation/page.js";
import { AcademyBuildingLevel, AcademyBuildingType } from "./academy.js";
export class AcademyComponent {
    _navigator;
    _academyCommands;
    _academyDrawing;
    constructor(_navigator, _academyCommands, _academyDrawing) {
        this._navigator = _navigator;
        this._academyCommands = _academyCommands;
        this._academyDrawing = _academyDrawing;
        this._academyCanvas = CanvasService.getCanvasByName(CanvasNames.Academy);
    }
    _academyCanvas;
    _clickEventListeners = [];
    _selectedBuildingType;
    load() {
        this.setupAcademyControls();
        this._academyCommands.initAcademy();
        this._academyDrawing.drawGround();
        this._academyDrawing.drawAcademy();
        this._academyDrawing.drawBack(() => this.unload());
        this.registerClick();
        CanvasService.showCanvas(CanvasNames.Academy);
    }
    unload() {
        this._clickEventListeners.forEach(o => {
            this._academyCanvas.removeEventListener('click', o, false);
        });
        this._clickEventListeners = [];
        let academySection = document.getElementById('academy');
        academySection?.remove();
        this._navigator.requestPageNavigation(Page.mapOverview);
    }
    setupAcademyControls() {
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
    createSelectButton(academySection, buildingType) {
        const button = document.createElement('button');
        button.classList.add('academy__button');
        button.innerText = this.getButtonText(buildingType);
        button.onclick = () => this._selectedBuildingType = buildingType;
        academySection.appendChild(button);
    }
    getButtonText(buildingType) {
        switch (buildingType) {
            case AcademyBuildingType.Dwelling: return "Dwelling";
            case AcademyBuildingType.Stables: return "Stables";
            case AcademyBuildingType.Farm: return "Farm";
        }
    }
    registerClick() {
        const clickHandler = (event) => {
            if (this._selectedBuildingType === undefined) {
                return;
            }
            const rect = this._academyCanvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const coords = ImportantService.ConvertRealToCoord(x, y, 2);
            this._academyCommands.AddBuildingToAcademy(this._selectedBuildingType, AcademyBuildingLevel.Basic, { x: Math.floor(coords.x2), y: Math.floor(coords.y2) });
            this._academyDrawing.drawAcademy();
        };
        this._clickEventListeners.push(clickHandler);
        this._academyCanvas.addEventListener('click', clickHandler);
    }
}
