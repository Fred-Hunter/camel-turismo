import { CamelCreator } from "../management/camel-creation/camel-creator";
import { CamelPropertyGenerator } from "../management/camel-creation/camel-property-generator";
import { CamelStable } from "../global/camel-stable";
import { globalServices } from "../main";
import { RecruitmentService } from "../recruitment/recruitment-service";
import { LoadingScreen } from "../loading/loading-screen";
import { CamelSkillCreator } from "../management/camel-creation/camel-skill-creator";
import { ManagementStartup } from "../management/management-startup";
import { LevelCurveFactory } from "../management/skills/level-curve-factory";
import { NavigatorService } from "../navigation/navigator-service";
import { RacingStartup } from "../racing/racing-startup";
import { ScrollsStartup } from "../scrolls/scrolls-startup";
import { CanvasBtnService } from "./canvas-btn-service";
import { CanvasNames } from "./canvas-names";
import { CanvasService } from "./canvas-service";
import { CubeService } from "./cube-service";
import { GlobalComponents } from "./global-components";
export class Startup {
    constructor() { }
    registerComponents() {
        const racingStartup = new RacingStartup(globalServices);
        racingStartup.registerComponents();
        const managementStartup = new ManagementStartup(globalServices);
        managementStartup.registerComponents();
        const scrollsStartup = new ScrollsStartup(globalServices);
        scrollsStartup.registerComponents();
        GlobalComponents.recruitmentService = new RecruitmentService(globalServices.navigatorService, globalServices.camelCreator);
        GlobalComponents.loadingScreen = new LoadingScreen(globalServices.navigatorService);
        this.registerDebugComponents();
    }
    registerAudio() {
        window.addEventListener('keydown', () => {
            globalServices.musicService.startAudio();
        });
    }
    createCanvases() {
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
    createGlobalServices() {
        const navigatorService = new NavigatorService();
        const musicService = new MusicService();
        const camelPropertyGenerator = new CamelPropertyGenerator();
        const levelCurveFactor = new LevelCurveFactory();
        const camelSkillCreator = new CamelSkillCreator(levelCurveFactor);
        const camelCreator = new CamelCreator(camelPropertyGenerator, camelSkillCreator);
        const camelStable = new CamelStable(camelCreator);
        return {
            musicService,
            navigatorService,
            camelCreator,
            camelStable
        };
    }
    registerDebugComponents() {
        const canvas = CanvasService.getCanvasByName(CanvasNames.Debug);
        const cubeService = new CubeService(canvas.getContext("2d"));
        const btnService = new CanvasBtnService(canvas, globalServices.navigatorService);
        GlobalComponents.isometricEditorComponent = new IsometricEditorComponent(canvas, cubeService, btnService);
    }
}
