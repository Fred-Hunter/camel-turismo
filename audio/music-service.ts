class MusicService {
    private HomeScreenAudio: HTMLAudioElement;
    private RaceAudio: HTMLAudioElement;
    public currentAudio = "HomeScreenAudio";

    constructor() {
        this.HomeScreenAudio = new Audio("audio/Mii Camel.mp3");
        this.RaceAudio = new Audio("audio/Camel Mall.mp3");

        this.HomeScreenAudio.loop = true;
        this.RaceAudio.loop = true;
    }

    startAudio() {
        if (this.currentAudio == "HomeScreenAudio") {
            this.RaceAudio.pause();
            this.HomeScreenAudio.play();
        } else if (this.currentAudio == "RaceAudio") {
            this.HomeScreenAudio.pause();
            this.RaceAudio.play();
        } else {
            this.HomeScreenAudio.pause();
            this.RaceAudio.pause();
        }
    }

    setAudio(audioName:string) {
        this.currentAudio = audioName
    }
}