import { MusicService } from "../audio/music-service"
import { CamelCreator } from "../management/camel-creation/camel-creator"
import { NavigatorService } from "../navigation/navigator-service"
import { CamelStable } from "./camel-stable"

export interface GlobalServices {
    musicService: MusicService,
    navigatorService: NavigatorService,
    camelCreator: CamelCreator,
    camelStable: CamelStable
}
