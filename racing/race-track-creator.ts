class RaceTrackCreator {
    public createTrack(length: number): number[][] {

        if (length <= 0) {
            throw new Error('Tried to create a track with invalid length');
        }

        const allCoords = [];

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                allCoords.push([i, j]);
            }
        }

        let track: number[][] = [];

        while (track.length !== length) {
            track = [];
            let trackToAddCoord = allCoords[Math.floor(Math.random() * allCoords.length)];
            track.push(trackToAddCoord);

            for (var i = 0; i < length; i++) {
                const possibleMoves = allCoords
                    .filter(o => Math.abs(trackToAddCoord[0] - o[0]) + Math.abs(trackToAddCoord[1] - o[1]) === 1);

                const refinedPossibleMoves: number[][] = [];

                possibleMoves.forEach((move) => {
                    const trackIntersections = track
                        .filter(o => Math.abs(move[0] - o[0]) + Math.abs(move[1] - o[1]) === 1)
                        .length;

                    if (trackIntersections <= 1) {
                        refinedPossibleMoves.push(move);
                    }
                });

                if (refinedPossibleMoves.length === 0) {
                    break;
                }

                trackToAddCoord = refinedPossibleMoves[Math.floor(Math.random() * refinedPossibleMoves.length)];

                track.push(trackToAddCoord);
            }
        }


        return Array.from(track);
    }
}