import { counties } from "../modules/counties.js"
import { data } from "../modules/data.js"
import { addCountyPeriodItems, updateCountyTimeline } from "../modules/addCountyPeriodItems.js"
import { openSeaViewerFunc } from "../modules/openSeaMapViewer.js"
import { updateHighlightedCounty } from "./activate-image-mapster.js"
import { testMapCarouselArrow } from "../modules/testMapCarouselArrow.js"
import { addThumbImages } from "../modules/addThumbImages.js"
import { changeActiveImg } from "../modules/changeActiveImg.js"
import { reset } from "../modules/reset.js"
import { scrollFunc } from "../modules/scroll-func.js"
import { genYearIndex } from "../modules/genYearIndex.js"


const yearInput = document.querySelector('#year-search')
const countySelect = document.querySelector('#county-select')

// data.county = counties[0].id

// change thumb map num on screen change
function changeImgNum() {
    $(window).width() > 1200
        ? data.imgNum = 5
        : data.imgNum = 4
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
    updateHighlightedCounty(data.county)
    reset()
    scrollFunc('#year-container', 700)
})

// image mapster 'html mapped' florida mpa - change county when clicked on the map itself
document.querySelectorAll('area').forEach(county => {
    county.addEventListener('click', () => {
        data.county = county.alt.replace('County', '').trim()
        $("#county-select").selectpicker('val', data.county)
        reset()
        scrollFunc('#year-container', 700)
    })
})

// image mapster 'html mapped' florida map - arrows event listener - change county to next/prev select item
document.querySelectorAll('.map-arrows').forEach(arrow => {
    arrow.addEventListener('click', () => {
        arrow.id === 'prev-map-arrow'
            ? countySelect.selectedIndex--
            : countySelect.selectedIndex++
        data.county = countySelect.value
        $('.selectpicker').selectpicker('refresh')
        updateHighlightedCounty(data.county)
        reset()
        scrollFunc('#year-container', 700)
    })
})

// narrow by year form input 
//multiple set timeouts to prevent premature form input
let timer;
yearInput.addEventListener('keyup', function (e) {
    e.preventDefault()
    let currYear = new Date().getFullYear();
    data.year = yearInput.value
    const parseYear = parseInt(yearInput.value)
    // test if year input is valid
    const formControl = document.getElementById('year-search')
    let isnum = /^\d+$/.test(data.year);
    if (parseYear > currYear || isnum === false && data.year.length > 0) {
        formControl.classList.remove('form-control-success')
        formControl.classList.add('form-control-warning')
    } else {
        formControl.classList.add('form-control-success')
        formControl.classList.remove('form-control-warning')
    }

    let timeOutNum = 0
    if (data.year.length >= 1 && data.year.length <= 3) timeOutNum = 2500
    else if (data.year.length === 4) timeOutNum = 1300
    else if (data.year.length === 0) timeOutNum = 700
    else return
    console.log(timeOutNum)


    setTimeout(() => {
        genYearIndex()
        addCountyPeriodItems()
    }, timeOutNum)
});



// reset button under narrow by year form - reset timeline and map to default
document.querySelector('#reset-results-btn').addEventListener('click', () => {
    reset()
})

// map carousel thumbnail arrows- add next/prev set of maps on next/prev arrow click
document.querySelectorAll('.thumb-arrows').forEach(arrow => {

    let clickDisabled = false;
    arrow.addEventListener('click', () => {
        // sets short delay on arrows to prevent excessive clicking thru
        if (clickDisabled)
            return;

        data.yearIndex = parseInt(document.querySelectorAll('.thumb-map-img')[0].id) - 1

        const thumbImages = document.querySelectorAll('.thumb-map-img')
        var container = document.getElementById("thumb-img-container");
        var numberOfChildren = container.children.length
        if (arrow.id === 'next-thumb-arrow' && thumbImages[thumbImages.length - 1].id !== '21') {
            let currImgNum = data.imgNum
            if (data.imgNum = numberOfChildren) {
                data.yearIndex += data.imgNum
            } else {
                data.yearIndex += (data.imgNum - numberOfChildren)
            }
            data.imgNum = currImgNum
        } if (arrow.id === 'prev-thumb-arrow' && thumbImages[0].id !== '1') {
            data.yearIndex -= data.imgNum
        }
        addThumbImages(data.yearIndex)
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
            scrollFunc('.county-title-container', 500)
        } if (arrow.id === 'nav-to-map') {
            scrollFunc('#county-timeline-header', 500)
        } if (arrow.id === 'nav-to-search') {
            
            scrollFunc('#year-container', 500)
        }
    })
})

setTimeout(() => {
    openSeaViewerFunc(data.yearIndex)
    addCountyPeriodItems()
    addThumbImages(data.yearIndex)
    changeActiveImg()
    testMapCarouselArrow()
}, 100);


