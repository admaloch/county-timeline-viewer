import { openSeaViewerFunc } from "./openSeaMapViewer.js";
import { addThumbImages } from "./addThumbImages.js";
import { testMapCarouselArrow } from "./testMapCarouselArrow.js";
import { data } from "./data.js";
import { mapDatesArr } from "./mapData.js";
export const genYearIndex = (yearInput, yearIndex, imgNum) => {
    const currentYear = new Date().getFullYear()
    if (yearInput.length == 0) {
        data.year = yearInput;
    } else if (yearInput > 0 && yearInput <= currentYear) {
        data.year = parseInt(yearInput);
        $('html, body').animate({ scrollTop: $("#county-timeline-header").offset().top }, 300);
    } else {
        data.year = 0
    }
    let yearInputNumber = parseInt(yearInput)
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
        
}