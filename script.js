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

// let yearIndex = 0
// let imgNum = 4;

// change thumb map num on screen change
function changeImgNum() {
    if ($(window).width() > 1200) {
        data.imgNum = 5
    }
    else {
        data.imgNum = 4
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
    addCountyPeriodItems()

    openSeaViewerFunc(0)
    updateHighlightedCounty(data.county)
    data.yearIndex = 0
    addThumbImages()
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
        addCountyPeriodItems()

        openSeaViewerFunc(0)
        // copySelectionsToHiddenField()
        data.yearIndex = 0
        addThumbImages()
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
        addCountyPeriodItems()

        openSeaViewerFunc(0)
        data.yearIndex = 0
        addThumbImages()
        changeActiveImg()
        $('html, body').animate({ scrollTop: $("#year-container").offset().top }, 300);
    })
})

// narrow by year form input - change year on keyup after delay to smooth it out
let timer;
yearInput.addEventListener('keyup', function (e) {
    e.preventDefault()
    data.year = yearInput.value
    if (data.year.length > 0 && data.year.length <= 3) {
        clearTimeout(timer);
        timer = setTimeout(() => yearInputFunctions(), 2500);
    }
    if (data.year.length === 4) {
        clearTimeout(timer);
        timer = setTimeout(() => yearInputFunctions(), 1300);
    }
});

// yearinput event listner has diff. delays depending on input -
// ex. if user puts in 18 it takes longer to trigger than 1845 as they may be thinking of how to finish teh date
// this function just consolidates the code as the outcomes are the same for each delay
const yearInputFunctions = () => {
    genYearIndex()
    addCountyPeriodItems()
    // data.yearIndex = parseInt(document.querySelector('.active-img').id) - 1
}

// reset button under narrow by year form - reset timeline and map to default
document.querySelector('#reset-results-btn').addEventListener('click', () => {
    yearInput.value = ''
    data.year = yearInput.value
    addCountyPeriodItems()
    openSeaViewerFunc(0)
    data.yearIndex = 0

    addThumbImages()
    changeActiveImg()
})

// map carousel thumbnail arrows- add next/prev set of maps on next/prev arrow click
document.querySelectorAll('.thumb-arrows').forEach(arrow => {

    let clickDisabled = false;
    arrow.addEventListener('click', () => {
        if (clickDisabled)
            return;

        data.yearIndex = parseInt(document.querySelectorAll('.thumb-map-img')[0].id) - 1
        console.log(data.yearIndex)
        const thumbImages = document.querySelectorAll('.thumb-map-img')
        if (arrow.id === 'next-thumb-arrow' && thumbImages[thumbImages.length - 1].id !== '21') {
            data.yearIndex += 5
            addThumbImages()
        } if (arrow.id === 'prev-thumb-arrow' && thumbImages[0].id !== '1') {
            data.yearIndex -= 5
            addThumbImages()
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




setTimeout(() => {
    openSeaViewerFunc(data.yearIndex)
    addCountyPeriodItems()
    addThumbImages()
    changeActiveImg()
    testMapCarouselArrow()
    


}, 100);

console.log(data.yearIndex)


