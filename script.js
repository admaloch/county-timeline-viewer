import { counties } from "./modules/counties.js"
import { data } from "./modules/data.js"
import { formatDate } from "./modules/formatDate.js"

const yearInput = document.querySelector('#year-search')
const countySelect = document.querySelector('#county-select')
const countyTimelineHeader = document.querySelector('#county-timeline-header')
const countyTimelineList = document.querySelector('#county-timeline-list')
const countyListItem = document.querySelectorAll('.county-list-item')
data.county = counties[0].id


// loop to create items in the volume select
for (let i = 0; i < counties.length; i++) {
    const countySelectOption = document.createElement('option')
    countySelectOption.innerText = counties[i].id
    countySelectOption.value = counties[i].id
    countySelect.append(countySelectOption)
}

// year input event listner
yearInput.addEventListener('keyup', () => {
    const currentYear = new Date().getFullYear()
    if (yearInput.value.length == 0) {
        data.year = yearInput.value;
    } else if (yearInput.value > 0 && yearInput.value <= currentYear) {
        data.year = parseInt(yearInput.value);
    } else {
        data.year = 'null'
    }
    addCountyPeriodItems()
})

// county select listener
countySelect.addEventListener('change', () => {
    data.county = countySelect.value 
    yearInput.value = ''
     data.year = yearInput.value
    addCountyPeriodItems()
})

// add items to ul timeline
const addCountyPeriodItems = () => {
    countyTimelineHeader.innerText = `${countySelect.value} timeline:`
    const currCounty = counties.filter(x => x.id === countySelect.value)[0]
    data.countyArr = currCounty.periods
    countyTimelineList.innerText = ''
    for (let i = 0; i < data.countyArr.length; i++) {
        let begDate = formatDate(data.countyArr[i][0])
        let endDate = formatDate(data.countyArr[i][1])
        let countyName = data.countyArr[i][2]
        const countyListItem = document.createElement('li')
        countyListItem.classList.add('county-list-item')
        countyListItem.innerText = `${begDate} - ${endDate} - ${countyName}`
        if (data.year !== 'null' && data.year == '' || begDate <= data.year && endDate >= data.year || begDate == 'Ancestral Period' && endDate >= data.year || begDate <= data.year && endDate == 'Today') {
            // console.log('successfule')
            countyTimelineList.append(countyListItem)
        } else {
            countyListItem.innerText = ''
        }
    }
}

addCountyPeriodItems()