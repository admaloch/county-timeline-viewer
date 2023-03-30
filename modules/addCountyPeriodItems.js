import { formatDate } from "./formatDate.js"
import { counties } from "./counties.js"
import { data } from "./data.js"
import { mapDatesArr } from "./mapData.js"

const countyTimeline = document.querySelector('.county-timeline')
const countyTimelineHeader = document.querySelector('#county-timeline-header')
const countyTimelineList = document.querySelector('#county-timeline-list')
const countySelect = document.querySelector('#county-select')
const yearInput = document.querySelector('#year-search')

// add items to ul timeline
export const addCountyPeriodItems = () => {
    countyTimeline.style.display = 'none'
    countyTimelineHeader.innerText = `${countySelect.value} timeline:`
    const currCounty = counties.filter(x => x.id === countySelect.value)[0]

    countyTimelineList.innerText = ''
    for (let i = 0; i < currCounty.periods.length; i++) {
        let begDate = formatDate(currCounty.periods[i][0])
        let endDate = formatDate(currCounty.periods[i][1])
        let countyName = currCounty.periods[i][2]
        const countyListItem = document.createElement('li')
        countyListItem.classList.add('county-list-item')
        countyListItem.innerText = `${begDate} - ${endDate} - ${countyName}`

        if (data.year !== 'null' && data.year == '' || begDate <= data.year && endDate >= data.year || begDate == 'Ancestral Period' && endDate >= data.year || begDate <= data.year && endDate == 'Today') {
            countyTimelineList.append(countyListItem)
        } else {
            countyListItem.innerText = ''
        }
    }
    $(".county-timeline").fadeIn(1000);
   

}

export const updateCountyTimeline = (id) =>{
    let currDate = parseInt(mapDatesArr[id].slice(0, 4))
    yearInput.value = currDate
    data.year = yearInput.value
    addCountyPeriodItems()
}