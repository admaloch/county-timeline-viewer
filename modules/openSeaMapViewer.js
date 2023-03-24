import { mapCoords } from "./mapData.js";

// initialize open sea dragon  map 
var viewer = OpenSeadragon({
    id: "openseadragon1",
    showNavigator: true,
    prefixUrl: "/openseadragon/images/",
    tileSources: [
        {
            type: "legacy-image-pyramid",
            levels: [
                {
                    url: "https://www.floridamemory.com/FMP/maps/small/fmc0001.jpg",
                    width: 1000,
                    height: 733
                },
                {
                    url: "https://www.floridamemory.com/FMP/maps/medium/fmc0001.jpg",
                    width: 2500,
                    height: 1832
                },
                {
                    url: "https://www.floridamemory.com/FMP/maps/large/fmc0001.jpg",
                    width: 4962,
                    height: 3636
                }
            ]
        }
    ]
});


// open sea dragon function to change map zoom cords based on narrow by year input
export const viewerFunc = (yearIndex, width, height) => {
    var tiledImage = viewer.world.getItemAt(0);
    var imageRect = new OpenSeadragon.Rect(mapCoords[yearIndex].x, mapCoords[yearIndex].y, width, height);
    var viewportRect = tiledImage.imageToViewportRectangle(imageRect);
    viewer.viewport.fitBounds(viewportRect, true);

}