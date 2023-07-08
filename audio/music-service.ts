class MusicService {
    private HomeScreenAudio: HTMLAudioElement;
    private RaceAudio: HTMLAudioElement;

    constructor() {
        this.HomeScreenAudio = new Audio("audio/Mii Camel.mp3");
        this.RaceAudio = new Audio("Music/Camel Mall.mp3");
        this.HomeScreenAudio.loop = true;
    }

    startRaceAudio(): void {
        this.HomeScreenAudio.pause();
        this.RaceAudio.loop = true;
    }

    startHomeScreenAudio(): void {
        this.RaceAudio.pause();
        this.HomeScreenAudio.play();
    }
}