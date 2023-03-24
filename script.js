import { counties } from "./modules/counties.js"
import { data } from "./modules/data.js"
import { changeMapImage } from "./modules/changeMapImage.js"
import { mapDatesArr, imgAltArr } from "./modules/mapData.js"
import { addThumbImages } from "./imgCarousel.js"
import { addCountyPeriodItems } from "./modules/addCountyPeriodItems.js"
import { viewerFunc } from "./modules/openSeaMapViewer.js"
import { updateHighlightedCounty } from "./imageMapster.js"

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
    console.log(countySelect.selectedIndex)
    data.county = countySelect.value
    yearInput.value = ''
    data.year = yearInput.value
    addCountyPeriodItems()
    viewerFunc(0, 5000, 3700)
    updateHighlightedCounty(data.county)
})

// grab current county selected for interactive mapster plugin map
document.querySelectorAll('area').forEach(county => {
    county.addEventListener('click', () => {
        data.county = county.alt.replace('County', '').trim()
        $("#county-select").selectpicker('val', data.county)

        addCountyPeriodItems()
        viewerFunc(0, 5000, 3700)
        copySelectionsToHiddenField()

    })

})

// interactive map arrows event listener - change county to next on list
document.querySelectorAll('.map-arrows').forEach(arrow => {
    arrow.addEventListener('click', () => {
        if (arrow.id === 'prev-map-arrow') {
            countySelect.selectedIndex--
        } else {
            countySelect.selectedIndex++
        }
        data.county = countySelect.value
        $('.selectpicker').selectpicker('refresh')
        updateHighlightedCounty(data.county)
        addCountyPeriodItems()
    })
})



// event listener for narrow by year input
let timer;
yearInput.addEventListener('keyup', function (e) {
    e.preventDefault()
    clearTimeout(timer);

    timer = setTimeout(() => {
        const currentYear = new Date().getFullYear()
        if (yearInput.value.length == 0) {
            data.year = yearInput.value;
        } else if (yearInput.value >= 0 && yearInput.value <= currentYear) {
            data.year = parseInt(yearInput.value);

        } else {
            data.year = 'null'
        }
        addCountyPeriodItems()
        let yearInputNumber = parseInt(yearInput.value)
        let yearIndex = 0
        if (yearInputNumber >= 0 && yearInputNumber <= currentYear) {
            for (let i = 0; i < mapDatesArr.length; i++) {
                if (yearInputNumber >= mapDatesArr[i])
                    yearIndex = i;
            }
            if (yearInputNumber >= 0 && yearInputNumber <= 1820) {
                yearIndex = 1
            }
        } else {
            console.log('invalid number')
        }

        if (!yearIndex) {
            viewerFunc(0, 5000, 3700)
            // console.log('empty year', yearIndex)
        } else {
            viewerFunc(yearIndex, 600, 655)
        }
        // addThumbImages(yearIndex)
        // let activeImg = document.querySelector('.active-img')
        // changeMapImage(activeImg)

    }, 1000);
});




addCountyPeriodItems()

