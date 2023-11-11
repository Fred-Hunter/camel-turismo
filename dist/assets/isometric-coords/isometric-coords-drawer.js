export class IsometricCoordsDrawer {
    static draw(parentXCoord, parentYCoord, asset, cubeService, height = 0, parentScale = 1, scale = 0.1, includeOffset = false) {
        const xOffset = includeOffset ? (Math.random() - 0.5) * 0.25 : 0;
        const yOffset = includeOffset ? (Math.random() - 0.5) * 0.25 : 0;
        asset.forEach(coord => {
            cubeService.drawSubCube(coord.colour, parentXCoord, parentYCoord, parentScale, scale, xOffset + coord.x * scale, yOffset + coord.y * scale, height);
        });
    }
    static drawCamel(parentXCoord, parentYCoord, asset, cubeService, height = 0, parentScale = 1, scale = 0.1) {
        asset.forEach(coord => {
            cubeService.drawCustomColourSubCube(coord.colour, parentXCoord, parentYCoord, parentScale, scale, coord.x * scale, coord.y * scale, height);
        });
    }
}
