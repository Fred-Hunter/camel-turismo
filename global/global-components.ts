import { AcademyComponent } from "../academy/academy-component.js";
import { IsometricEditorComponent } from "../editor/isometric-editor.js";
import { LoadingScreen } from "../loading/loading-screen.js";
import { CamelSelectComponent } from "../management/camel-select/camel-select-component.js";
import { CamelSkillComponent } from "../management/skills/camel-skill-component.js";
import { Race } from "../racing/models/race.js";
import { RaceComponent } from "../racing/race-component.js";
import { RaceSelection } from "../racing/race-selection.js";
import { RecruitmentService } from "../recruitment/recruitment-service.js";
import { ScrollsComponent } from "../scrolls/scrolls-component.js";
import { GlobalServices } from "./global-services.js";

export class GlobalComponents {
    // Game state
    public static race: Race;

    // Global service
    public static globalServices: GlobalServices

    // Components
    // Recruitment
    public static recruitmentService: RecruitmentService;

    // Camel management
    public static camelSkillComponent: CamelSkillComponent;
    public static camelManagementSelectComponent: CamelSelectComponent;

    // Race
    public static raceSelection: RaceSelection;
    public static raceComponent: RaceComponent;
    public static raceCamelSelectComponent: CamelSelectComponent;

    // Loading
    public static loadingScreen: LoadingScreen;

    // Drawing
    public static isometricEditorComponent: IsometricEditorComponent;
    public static drawingMode = false;

    // Scrolls
    public static scrollsComponent: ScrollsComponent;

    // Academy
    public static academyComponent: AcademyComponent;
}
