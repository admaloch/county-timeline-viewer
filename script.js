import { counties } from "./modules/counties.js"
import { data } from "./modules/data.js"
import { mapDatesArr } from "./modules/mapData.js"
import { addCountyPeriodItems, updateCountyTimeline } from "./modules/addCountyPeriodItems.js"
import { openSeaViewerFunc } from "./modules/openSeaMapViewer.js"
import { updateHighlightedCounty } from "./imageMapster.js"
import { testMapCarouselArrow } from "./modules/testMapCarouselArrow.js"
import { addThumbImages } from "./modules/addThumbImages.js"

let greeting = 'hello'
let name = 'Brock'
let lastName = 'Johnson'

let sentence = `${greeting} my name is ${name} ${lastName}!!`

console.log(sentence)

const yearInput = document.querySelector('#year-search')
const countySelect = document.querySelector('#county-select')
data.county = counties[0].id
let yearIndex = 0
let imgNum = 4;

// change thumb map num on screen change
function changeImgNum() {
    if ($(window).width() > 1200) {
        imgNum = 5
        console.log('it is 5')
    }
    else {
        imgNum = 4
        console.log('it is 4')
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
        addCountyPeriodItems()
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
        addCountyPeriodItems()
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
    clearTimeout(timer);
    timer = setTimeout(() => {
        const currentYear = new Date().getFullYear()
        if (yearInput.value.length == 0) {
            data.year = yearInput.value;
        } else if (yearInput.value > 0 && yearInput.value <= currentYear) {
            data.year = parseInt(yearInput.value);
            $('html, body').animate({ scrollTop: $("#county-timeline-header").offset().top }, 300);

        } else {
            data.year = 0
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
        
        openSeaViewerFunc(yearIndex)
        addThumbImages(yearIndex - 1, imgNum)
        if (yearInputNumber >= 1820 && yearInputNumber <= currentYear) {
            document.querySelectorAll('.thumb-map-img')[0].classList.add('active-img')
            document.querySelector('.active-img').nextElementSibling.classList.add('d-none')
        }
        testMapCarouselArrow()
        changeActiveImg()
        addCountyPeriodItems()
       
    }, 1000);
});

// reset button under narrow by year form - reset timeline and map to default
document.querySelector('#reset-results-btn').addEventListener('click', () => {
    yearInput.value = ''
    data.year = yearInput.value
    addCountyPeriodItems()
    openSeaViewerFunc(0)
    yearIndex = 0
    addThumbImages(yearIndex, imgNum)
    changeActiveImg()
})

// map carousel thumbnails - change active status on click for each
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

            openSeaViewerFunc(img.id)
            let currId = img.id
            updateCountyTimeline(currId)
        })
    })
}

// map carousel thumbnail arrows- add next/prev set of maps on next/prev arrow click
document.querySelectorAll('.thumb-arrows').forEach(arrow => {
    let clickDisabled = false;
    arrow.addEventListener('click', () => {
        if (clickDisabled)
            return;
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

addCountyPeriodItems()
// openSeaViewerFunc(yearIndex)
setTimeout(() => {
    openSeaViewerFunc(yearIndex)
    addThumbImages(yearIndex, imgNum)
    changeActiveImg()
}, 100);

testMapCarouselArrow()

