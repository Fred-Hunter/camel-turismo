import { LoadingScreen } from "../loading/loading-screen";
import { CamelSelectComponent } from "../management/camel-select/camel-select-component";
import { CamelSkillComponent } from "../management/skills/camel-skill-component";
import { Race } from "../racing/models/race";
import { RaceComponent } from "../racing/race-component";
import { RaceSelection } from "../racing/race-selection";
import { RecruitmentService } from "../recruitment/recruitment-service";
import { ScrollsComponent } from "../scrolls/scrolls-component";
import { GlobalServices } from "./global-services";

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
}
