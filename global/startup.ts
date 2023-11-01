import { CamelCreator } from "../management/camel-creation/camel-creator.js";
import { CamelPropertyGenerator } from "../management/camel-creation/camel-property-generator.js";
import { CamelStable } from "../global/camel-stable.js";
import { GlobalServices } from "./global-services.js";
import { RecruitmentService } from "../recruitment/recruitment-service.js";
import { LoadingScreen } from "../loading/loading-screen.js";
import { CamelSkillCreator } from "../management/camel-creation/camel-skill-creator.js";
import { ManagementStartup } from "../management/management-startup.js";
import { LevelCurveFactory } from "../management/skills/level-curve-factory.js";
import { NavigatorService } from "../navigation/navigator-service.js";
import { RacingStartup } from "../racing/racing-startup.js";
import { ScrollsStartup } from "../scrolls/scrolls-startup.js";
import { CanvasBtnService } from "./canvas-btn-service.js";
import { CanvasNames } from "./canvas-names.js";
import { CanvasService } from "./canvas-service.js";
import { CubeService } from "./cube-service.js";
import { GlobalComponents } from "./global-components.js";
import { IsometricEditorComponent } from "../editor/isometric-editor.js";
import { MusicService } from "../audio/music-service.js";

export class Startup {
    constructor() { }

    public registerComponents() {
        const racingStartup = new RacingStartup(GlobalComponents.globalServices);
        racingStartup.registerComponents();

        const managementStartup = new ManagementStartup(GlobalComponents.globalServices);
        managementStartup.registerComponents();

        const scrollsStartup = new ScrollsStartup(GlobalComponents.globalServices);
        scrollsStartup.registerComponents();

        GlobalComponents.recruitmentService = new RecruitmentService(GlobalComponents.globalServices.navigatorService, GlobalComponents.globalServices.camelCreator);
        GlobalComponents.loadingScreen = new LoadingScreen(GlobalComponents.globalServices.navigatorService);

        this.registerDebugComponents();
    }

    public registerAudio() {
        window.addEventListener('keydown', () => {
            GlobalComponents.globalServices.musicService.startAudio();
        })
    }

    public createCanvases() {
        CanvasService.createCanvas('3', CanvasNames.Recruitment);
        CanvasService.createCanvas('1', CanvasNames.RaceBackground);
        CanvasService.createCanvas('2', CanvasNames.RaceCamel);
        CanvasService.createCanvas('4', CanvasNames.MapOverview);
        CanvasService.createCanvas('1', CanvasNames.GymCamel);
        CanvasService.createCanvas('0', CanvasNames.GymBackground);
        CanvasService.createCanvas('0', CanvasNames.PopupCanvas);
        CanvasService.createCanvas('5', CanvasNames.RaceSelection);
        CanvasService.createCanvas('6', CanvasNames.Countdown);
        CanvasService.createCanvas('7', CanvasNames.CamelManagement);
        CanvasService.createCanvas('8', CanvasNames.LoadingScreen);
        CanvasService.createCanvas('0', CanvasNames.CalendarDetails);
        CanvasService.createCanvas('9', CanvasNames.Debug);
    }

    public createGlobalServices(): GlobalServices {
        const navigatorService = new NavigatorService();
        const musicService = new MusicService();

        const camelPropertyGenerator = new CamelPropertyGenerator();
        const levelCurveFactor = new LevelCurveFactory();
        const camelSkillCreator = new CamelSkillCreator(levelCurveFactor);
        const camelCreator = new CamelCreator(camelPropertyGenerator, camelSkillCreator);
        const camelStable = new CamelStable(camelCreator, camelPropertyGenerator);

        return {
            musicService,
            navigatorService,
            camelCreator,
            camelStable
        }
    }

    public registerDebugComponents() {
        const canvas = CanvasService.getCanvasByName(CanvasNames.Debug);
        const cubeService = new CubeService(canvas.getContext("2d")!);
        const btnService = new CanvasBtnService(canvas, GlobalComponents.globalServices.navigatorService);
        
        GlobalComponents.isometricEditorComponent = new IsometricEditorComponent(canvas, cubeService, btnService);
    }
}
