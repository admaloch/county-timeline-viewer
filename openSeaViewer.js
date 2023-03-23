import { coords } from "./modules/coords.js";

// var viewer = OpenSeadragon({
//     id: "openseadragon1",
//     showNavigator: true,
//     prefixUrl: "/openseadragon/images/",
//     tileSources: [
//         {
//             type: "legacy-image-pyramid",
//             levels: [
//                 {
//                     url: "https://www.floridamemory.com/FMP/maps/small/fmc0001.jpg",
//                     width: 1000,
//                     height: 733
//                 },
//                 {
//                     url: "https://www.floridamemory.com/FMP/maps/medium/fmc0001.jpg",
//                     width: 2500,
//                     height: 1832
//                 },
//                 {
//                     url: "https://www.floridamemory.com/FMP/maps/large/fmc0001.jpg",
//                     width: 4962,
//                     height: 3636
//                 }
//             ]
//         }
//     ]
// });



// const viewerHandler = () => {
//     viewer.addHandler('open', function () {
//         var tiledImage = viewer.world.getItemAt(0);
//         var imageRect = new OpenSeadragon.Rect(coords.x, coords.y, 600, 655);
//         // tiledImage.setClip(imageRect)
//         var viewportRect = tiledImage.imageToViewportRectangle(imageRect);
//         viewer.viewport.fitBounds(viewportRect, true);
//     });
// }


