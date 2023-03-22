import { counties } from "./modules/counties.js"
import { data } from "./modules/data.js"
import { changeMapImage } from "./modules/changeMapImage.js"
import { mapDatesArr } from "./modules/mapArray.js"
import { addThumbImages } from "./imgCarousel.js"
import { addCountyPeriodItems } from "./modules/addCountyPeriodItems.js"

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
        let yearIndex = mapDatesArr.findIndex(x => x >= yearInputNumber)
        console.log(yearIndex)
        addThumbImages(yearIndex)
        let activeImg = document.querySelector('.active-img')
        changeMapImage(activeImg)
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