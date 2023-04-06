import { counties } from "./modules/counties.js"
import { data } from "./modules/data.js"
import { addCountyPeriodItems, updateCountyTimeline } from "./modules/addCountyPeriodItems.js"
import { openSeaViewerFunc } from "./modules/openSeaMapViewer.js"
import { updateHighlightedCounty } from "./imageMapster.js"
import { testMapCarouselArrow } from "./modules/testMapCarouselArrow.js"
import { addThumbImages } from "./modules/addThumbImages.js"
import { genYearIndex } from "./modules/genYearIndex.js"
import { changeActiveImg } from "./modules/changeActiveImg.js"

const yearInput = document.querySelector('#year-search')
const countySelect = document.querySelector('#county-select')

data.county = counties[0].id

let yearIndex = 0
let imgNum = 4;

// change thumb map num on screen change
function changeImgNum() {
    if ($(window).width() > 1200) {
        imgNum = 5
    }
    else {
        imgNum = 4
    }
}
$(window).on("load", changeImgNum);
$(window).on("resize", changeImgNum);

// bootstrap function for popover
$(function () {
    $('[data-toggle="popover"]').popover()
})

// loop to create items in the search by county select
for (let i = 0; i < counties.length; i++) {
    const countySelectOption = document.createElement('option')
    countySelectOption.innerText = counties[i].id
    countySelectOption.value = counties[i].id
    countySelect.append(countySelectOption)
}

// search by county select - event listener on change
countySelect.addEventListener('change', () => {
    data.county = countySelect.value
    yearInput.value = ''
    data.year = yearInput.value
    addCountyPeriodItems(imgNum)

    openSeaViewerFunc(0)
    updateHighlightedCounty(data.county)
    yearIndex = 0
    addThumbImages(yearIndex, imgNum)
    changeActiveImg()
    $('html, body').animate({ scrollTop: $("#year-container").offset().top }, 300);
})

// image mapster 'html mapped' florida mpa - change county when clicked on the map itself
document.querySelectorAll('area').forEach(county => {
    county.addEventListener('click', () => {
        data.county = county.alt.replace('County', '').trim()
        $("#county-select").selectpicker('val', data.county)
        yearInput.value = ''
        data.year = yearInput.value
        addCountyPeriodItems(imgNum)

        openSeaViewerFunc(0)
        // copySelectionsToHiddenField()
        yearIndex = 0
        addThumbImages(yearIndex, imgNum)
        changeActiveImg()
        $('html, body').animate({ scrollTop: $("#year-container").offset().top }, 300);
    })
})

// image mapster 'html mapped' florida map - arrows event listener - change county to next/prev select item
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
        addCountyPeriodItems(imgNum)

        openSeaViewerFunc(0)
        yearIndex = 0
        addThumbImages(yearIndex, imgNum)
        changeActiveImg()
        $('html, body').animate({ scrollTop: $("#year-container").offset().top }, 300);
    })
})

// narrow by year form input - change year on keyup after delay to smooth it out
let timer;
yearInput.addEventListener('keyup', function (e) {
    e.preventDefault()

    if (yearInput.value.length > 0 && yearInput.value.length <= 3) {
        clearTimeout(timer);
        timer = setTimeout(() => yearInputFunctions(), 2500);
    }
    if (yearInput.value.length === 4) {
        clearTimeout(timer);
        timer = setTimeout(() => yearInputFunctions(), 1300);
    }
});

const yearInputFunctions = () => {
    genYearIndex(yearInput.value, yearIndex, imgNum)
    addCountyPeriodItems(imgNum)
    console.log(`this is the year index ${yearIndex} and this is the image num ${imgNum}`)
    yearIndex = parseInt(document.querySelector('.active-img').id) - 1
}

// reset button under narrow by year form - reset timeline and map to default
document.querySelector('#reset-results-btn').addEventListener('click', () => {
    yearInput.value = ''
    data.year = yearInput.value
    addCountyPeriodItems(imgNum)
    openSeaViewerFunc(0)
    yearIndex = 0
   
    addThumbImages(yearIndex, imgNum)
    changeActiveImg()
})

// map carousel thumbnail arrows- add next/prev set of maps on next/prev arrow click
document.querySelectorAll('.thumb-arrows').forEach(arrow => {

    let clickDisabled = false;
    arrow.addEventListener('click', () => {
        if (clickDisabled)
            return;
           
        yearIndex = parseInt(document.querySelector('.active-img').id) - 1
        const thumbImages = document.querySelectorAll('.thumb-map-img')
        if (arrow.id === 'next-thumb-arrow' && thumbImages[thumbImages.length - 1].id !== '21') {
            yearIndex += 5
            addThumbImages(yearIndex, imgNum)
        } if (arrow.id === 'prev-thumb-arrow' && thumbImages[0].id !== '1') {
            yearIndex -= 5
            addThumbImages(yearIndex, imgNum)
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

// side scroll arrows to ease transitions to diff sections
document.querySelectorAll('.nav-arrows').forEach(arrow => {
    arrow.addEventListener('click', () => {
        if (arrow.id === 'nav-to-county') {
            $('html, body').animate({ scrollTop: $(".county-title-container").offset().top }, 700);
        } if (arrow.id === 'nav-to-map') {
            $('html, body').animate({ scrollTop: $("#county-timeline-header").offset().top }, 700);
        } if (arrow.id === 'nav-to-search') {
            $('html, body').animate({ scrollTop: $("#year-container").offset().top }, 700);
        }
    })
})



addCountyPeriodItems(imgNum)
setTimeout(() => {
    openSeaViewerFunc(yearIndex)
    addThumbImages(yearIndex, imgNum)
    changeActiveImg()
    testMapCarouselArrow()
}, 100);