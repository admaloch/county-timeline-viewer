import { counties } from "./modules/counties.js"
import { data } from "./modules/data.js"
import { changeMapImage } from "./modules/changeMapImage.js"
import { mapDatesArr, imgAltArr } from "./modules/mapArray.js"
import { addThumbImages } from "./imgCarousel.js"
import { addCountyPeriodItems } from "./modules/addCountyPeriodItems.js"
import { coords } from "./modules/coords.js";

const yearInput = document.querySelector('#year-search')
const countySelect = document.querySelector('#county-select')

data.county = counties[0].id

// loop to create items in the search by county select
for (let i = 0; i < counties.length; i++) {
    const countySelectOption = document.createElement('option')
    countySelectOption.innerText = counties[i].id
    countySelectOption.value = counties[i].id
    countySelect.append(countySelectOption)
}

// event listener for search by county on change
countySelect.addEventListener('change', () => {
    data.county = countySelect.value
    yearInput.value = ''
    data.year = yearInput.value
    addCountyPeriodItems()
    console.log(data.county)
})

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
//full = 5000, 3700
// zoom img size = 600, 655
const viewerFunc = (yearIndex, width, height) => {
    var tiledImage = viewer.world.getItemAt(0);
    var imageRect = new OpenSeadragon.Rect(coords[yearIndex].x, coords[yearIndex].y, width, height);
    var viewportRect = tiledImage.imageToViewportRectangle(imageRect);
    viewer.viewport.fitBounds(viewportRect, true);
   
}







// event listener for narrow by year input
let timer;
yearInput.addEventListener('keyup', function (e) {
    clearTimeout(timer);

    timer = setTimeout(() => {
        const currentYear = new Date().getFullYear()




        if (yearInput.value.length == 0) {
            data.year = yearInput.value;
        } else if (yearInput.value > 0 && yearInput.value <= currentYear) {
            data.year = parseInt(yearInput.value);

        } else {
            data.year = 'null'
        }
        addCountyPeriodItems()
        let yearInputNumber = parseInt(yearInput.value)
        console.log(`year input number is ${yearInputNumber}`)
        let yearIndex = mapDatesArr.findIndex(x => x >= yearInputNumber)
        console.log(`year index is ${yearIndex}`)
        if (yearIndex === -1) {
            viewerFunc(0, 5000, 3700)
            // console.log('empty year', yearIndex)
        } else {
            viewerFunc(yearIndex, 600, 655)
            // console.log('successful year', yearIndex)
        }




        // addThumbImages(yearIndex)
        // let activeImg = document.querySelector('.active-img')
        // changeMapImage(activeImg)

    }, 1000);
});


// grab current county selected for interactive mapster plugin map
document.querySelectorAll('area').forEach(county => {
    county.addEventListener('click', () => {
        data.county = county.alt.replace('County', '').trim()
        $("#county-select").selectpicker('val', data.county)
        addCountyPeriodItems()
    })
})

addCountyPeriodItems()

