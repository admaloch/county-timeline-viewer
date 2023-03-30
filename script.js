import { counties } from "./modules/counties.js"
import { data } from "./modules/data.js"
import { mapDatesArr } from "./modules/mapData.js"
import { addCountyPeriodItems, updateCountyTimeline } from "./modules/addCountyPeriodItems.js"
import { openSeaViewerFunc } from "./modules/openSeaMapViewer.js"
import { updateHighlightedCounty } from "./imageMapster.js"
import { testMapCarouselArrow } from "./modules/testMapCarouselArrow.js"
import { addThumbImages } from "./modules/addThumbImages.js"
// import { changeActiveImg } from "./modules/changeActiveImg.js"

const yearInput = document.querySelector('#year-search')
const countySelect = document.querySelector('#county-select')
data.county = counties[0].id

let yearIndex = 0
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
    yearInput.value = ''
    data.year = yearInput.value
    addCountyPeriodItems()
    openSeaViewerFunc(0)
    updateHighlightedCounty(data.county)
    yearIndex = 0
    addThumbImages(yearIndex)
    changeActiveImg()
})

// grab current county selected for interactive mapster plugin map
document.querySelectorAll('area').forEach(county => {
    county.addEventListener('click', () => {
        data.county = county.alt.replace('County', '').trim()
        $("#county-select").selectpicker('val', data.county)
        yearInput.value = ''
        data.year = yearInput.value
        addCountyPeriodItems()
        openSeaViewerFunc(0)
        // copySelectionsToHiddenField()
        yearIndex = 0
        addThumbImages(yearIndex)
        changeActiveImg()
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
        yearInput.value = ''
        data.year = yearInput.value
        $('.selectpicker').selectpicker('refresh')
        updateHighlightedCounty(data.county)
        addCountyPeriodItems()
        openSeaViewerFunc(0)
        yearIndex = 0
        addThumbImages(yearIndex)
        changeActiveImg()
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
        let yearInputNumber = parseInt(yearInput.value)
        if (yearInputNumber >= 1820 && yearInputNumber <= currentYear) {
            for (let i = 0; i < mapDatesArr.length; i++) {
                if (yearInputNumber >= parseInt(mapDatesArr[i].slice(0, 4)))
                    yearIndex = i;
            }
        } else {
            yearIndex = 0
        }
        addCountyPeriodItems()
        openSeaViewerFunc(yearIndex)
        addThumbImages(yearIndex - 1)
        if (yearInputNumber >= 1820 && yearInputNumber <= currentYear) {
            document.querySelectorAll('.thumb-map-img')[0].classList.add('active-img')
            document.querySelector('.active-img').nextElementSibling.classList.add('d-none')
        }
        testMapCarouselArrow()
        changeActiveImg()
    }, 1000);
});

// event listner for clicking a map thumbnail 
const changeActiveImg = () => {
    const sliderImages = document.querySelectorAll('.thumb-map-img')
    sliderImages.forEach(img => {
        img.addEventListener('click', () => {
            sliderImages.forEach(images => {
                images.classList.remove('active-img')
                images.nextElementSibling.classList.remove('d-none')
            })
            img.classList.add('active-img')
            img.nextElementSibling.classList.add('d-none')
            console.log(img)
            openSeaViewerFunc(img.id)
            let currId = img.id
           updateCountyTimeline(currId)
        })
    })
}

// map image carousel event listner- change thumb images on arrow click
document.querySelectorAll('.thumb-arrows').forEach(arrow => {

    let clickDisabled = false;
    arrow.addEventListener('click', () => {
        if (clickDisabled)
            return;
        const thumbImages = document.querySelectorAll('.thumb-map-img')
        if (arrow.id === 'next-thumb-arrow' && thumbImages[thumbImages.length - 1].id !== '21') {
            yearIndex += 5
            addThumbImages(yearIndex)
        } if (arrow.id === 'prev-thumb-arrow' && thumbImages[0].id !== '1') {
            yearIndex -= 5
            addThumbImages(yearIndex)
        }
        document.querySelectorAll('.thumb-map-img')[0].classList.add('active-img')
        changeActiveImg()
        testMapCarouselArrow()
        const currActiveImg = document.querySelector('.active-img')
        currActiveImg.nextElementSibling.classList.add('d-none')
        openSeaViewerFunc(currActiveImg.id)
        let currId = document.querySelectorAll('.thumb-map-img')[0].id
       updateCountyTimeline(currId)
        clickDisabled = true;
        setTimeout(function () { clickDisabled = false; }, 500);
    })
})


// openSeaViewerFunc(yearIndex)
addThumbImages(yearIndex)
addCountyPeriodItems()
changeActiveImg()
testMapCarouselArrow()

