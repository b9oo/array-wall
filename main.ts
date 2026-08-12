/**
 * Custom blocks for advanced tilemap manipulation and wall detection.
 */
//% color="#0b6a8a" icon="\uf0c9" block="Wall Extensions"
//% groups='["Locations"]'
namespace wallExtensions {

    /**
     * Returns an array containing the tile locations of all walls in the current tilemap.
     * This functions exactly like the "array of all tile locations" block, but dynamically filters for any tile marked as a wall.
     */
    //% block="array of all wall locations"
    //% blockId=wall_extensions_get_all_walls
    //% group="Locations"
    //% weight=100
    export function getAllWallLocations(): tiles.Location[] {
        const wallList: tiles.Location[] = [];
        const currentScene = game.currentScene();

        // Safety check to ensure a valid scene, tilemap, and map data matrix exist before proceeding
        if (!currentScene || !currentScene.tileMap || !currentScene.tileMap.data) {
            return wallList;
        }

        // Fetch the grid boundaries (width is columns, height is rows)
        const columns = currentScene.tileMap.data.width;
        const rows = currentScene.tileMap.data.height;

        // Iterate systematically through every grid coordinate inside the active tilemap
        for (let col = 0; col < columns; col++) {
            for (let row = 0; row < rows; row++) {
                // Read directly from the tilemap's structural data matrix to see if the tile acts as a wall
                if (currentScene.tileMap.data.isWall(col, row)) {
                    // Generate the location object and push it into the return array
                    wallList.push(tiles.getTileLocation(col, row));
                }
            }
        }

        return wallList;
    }
}
