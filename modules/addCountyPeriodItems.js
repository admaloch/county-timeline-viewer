import { formatDate } from "./formatDate.js"
import { counties } from "./counties.js"
import { data } from "./data.js"
import { mapDatesArr } from "./mapData.js"
import { openSeaViewerFunc } from "./openSeaMapViewer.js"
import { changeActiveImg } from "./changeActiveImg.js"
import { addThumbImages } from "./addThumbImages.js"
import { testMapCarouselArrow } from "./testMapCarouselArrow.js"

const countyTimeline = document.querySelector('.county-timeline')
const countyTimelineHeader = document.querySelector('#county-timeline-header')
const countyTimelineList = document.querySelector('#county-timeline-list')
const countySelect = document.querySelector('#county-select')
const yearInput = document.querySelector('#year-search')

// add items to ul timeline
export const addCountyPeriodItems = () => {
    countyTimeline.style.display = 'none'
    countyTimelineHeader.innerText = `${countySelect.value} county timeline:`
    const currCounty = counties.filter(x => x.id === countySelect.value)[0]

    countyTimelineList.innerText = ''
    for (let i = 0; i < currCounty.periods.length; i++) {
        let begDate = formatDate(currCounty.periods[i][0])
        let endDate = formatDate(currCounty.periods[i][1])
        let countyName = currCounty.periods[i][2]
        const countyListItem = document.createElement('li')
        countyListItem.classList.add('county-list-item')
        countyListItem.id = endDate
        countyListItem.innerText = `${begDate} - ${endDate} - ${countyName}`

        // bootstrap function for popover
        $(function () {
            $('[data-toggle="popover"]').popover()
        })
        if (data.year !== 'null' && data.year == '' || begDate <= data.year && endDate >= data.year || begDate == 'Ancestral Period' && endDate >= data.year || begDate <= data.year && endDate == 'Today') {
            if (currCounty.periods[i][3]) {
                let citation = currCounty.periods[i][3]

                const citationContainer = document.createElement('div')
                citationContainer.innerHTML = `
                    <i id="citation-popup" class="info-popup fa fa-info-circle"
                    data-container="body" data-delay='{"show":"200"}' data-toggle="popover" data-html="true" data-placement="right"
                    data-content="${citation}">
                    </i>
                    `
                const itemContainer = document.createElement('div')
                itemContainer.classList.add('d-flex', 'justify-content-center')
                itemContainer.append(countyListItem)
                itemContainer.append(citationContainer)

                countyTimelineList.append(itemContainer)
            } else {
                countyTimelineList.append(countyListItem)
            }
        } else {
            countyListItem.innerText = ''
        }
    }
    listItemClickHandler()
    $(".county-timeline").fadeIn(1000);
}

export const updateCountyTimeline = (id) => {
    let currDate = parseInt(mapDatesArr[id].slice(0, 4))
    yearInput.value = currDate
    data.year = yearInput.value
    addCountyPeriodItems()
}

const listItemClickHandler = () => {
    const listItems = document.querySelectorAll('.county-list-item')
    const timelineInfoPopup = document.getElementById('timeline-popup')
    timelineInfoPopup.classList.remove('d-none')
    if (listItems.length > 1) {
        listItems.forEach(listItem => {
            if (parseInt(listItem.id) >= 1820 || listItem.id.toLowerCase() === 'today') {
                listItem.classList.add('make-clickable')
                listItem.addEventListener('click', () => {
                    let newYearStr = listItem.innerText.slice(0, 4)
                    let newYear = parseInt(newYearStr)
                    data.yearIndex = 0
                    for (let i = 0; i < mapDatesArr.length; i++) {
                        if (newYear === parseInt(mapDatesArr[i].slice(0, 4))) {
                            data.yearIndex = i;
                        } else if (newYear > parseInt(mapDatesArr[i].slice(0, 4))) {
                            data.yearIndex = i + 1;
                        }
                    }
                    if (data.yearIndex === 0) data.yearIndex = 1
                    openSeaViewerFunc(data.yearIndex)
                    addThumbImages(data.yearIndex)
                    document.querySelectorAll('.thumb-map-img')[0].classList.add('active-img')
                    document.querySelector('.active-img').nextElementSibling.classList.add('d-none')
                    changeActiveImg()
                    testMapCarouselArrow()
                    $('html, body').animate({ scrollTop: $("#openseadragon1").offset().top }, 300);
                })
            }
        })
    } else {
        timelineInfoPopup.classList.add('d-none')
    }
} 