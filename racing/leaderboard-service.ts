class LeaderboardService {
	constructor(public ctx: CanvasRenderingContext2D) {
		this._camelCubeService = new CubeService(ctx);
	}

	private _camelCubeService: CubeService;

	sortCamels(a: RacingCamel, b: RacingCamel) {
		if (b.finalPosition && !a.finalPosition) {
			return 1;
		}
		if (!b.finalPosition && a.finalPosition) {
			return -1;
		}
		if (!b.finalPosition && !a.finalPosition) {
			return b.completionPercentage - a.completionPercentage;
		}

		return a.finalPosition! - b.finalPosition!;
	}

	drawLeaderboard() {
		const cols = Math.ceil(race.racingCamels.length / 5);

		let height = 0;
		race.racingCamels
			.sort((a, b) => this.sortCamels(a, b))
			.forEach((racingCamel) => {
				this.drawCamel(racingCamel, height);
				height -= 5;
			});
	}

	private isCamelUserOwned(racingCamel: Camel): boolean {
		return racingCamel == GameState.camel;
	}

	private componentToHex(c: any) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	private getProgressBarColour(color1: number[], color2: number[], weight: number): string {
		var w1 = weight;
		var w2 = 1 - w1;
		var rgb = [Math.round(color1[0] * w1 + color2[0] * w2), Math.round(color1[1] * w1 + color2[1] * w2), Math.round(color1[2] * w1 + color2[2] * w2)];

		return "#" + this.componentToHex(rgb[0]) + this.componentToHex(rgb[1]) + this.componentToHex(rgb[2]);
	}

	private drawCamel(camel: RacingCamel, heightOffset: number): void {
		const x = 5.5;
		const y = -6.5;
		const camelService = new CanvasCamelService(this.ctx);

		camelService.drawCamelScreenCoords(GlobalStaticConstants.innerWidth - 150, 70 - heightOffset * 10, 10, camel.camel.colour);
		this.ctx.fillStyle = "#96876e";

		this.ctx.fillStyle = "red";
		this.ctx.fillText(
			`${camel.camel.sprintSpeed.level}:${camel.agility}:${camel.stamina}:${camel.currentSpeed}`,
			GlobalStaticConstants.innerWidth - 130,
			70 - heightOffset * 10
		);

		if (this.isCamelUserOwned(camel.camel)) {
			this.ctx.fillStyle = "#96876e";
			this.ctx.fillText(camel.camel.name, GlobalStaticConstants.innerWidth - 100, 59 - heightOffset * 10);
		}

		this.ctx.fillStyle = "#000";
		this.ctx.font = "10pt Garamond";
		const completionPercentage = Math.min(1, Math.round(camel.completionPercentage * 100) / 100);
		this.ctx.beginPath();
		this.ctx.fillStyle = "#fff";
		this.ctx.roundRect(GlobalStaticConstants.innerWidth - 100, 70 - heightOffset * 10, 80, 10, 5);
		this.ctx.fill();
		this.ctx.closePath();

		const colour = this.getProgressBarColour([255, 238, 150], [61, 204, 83], 1 - camel.completionPercentage);

		this.ctx.beginPath();
		this.ctx.fillStyle = colour;
		this.ctx.roundRect(GlobalStaticConstants.innerWidth - 100, 70 - heightOffset * 10, 80 * completionPercentage, 10, 5);
		this.ctx.fill();
		this.ctx.closePath();
	}
}
