const yearInput = document.querySelector('#year-search')
const countySelect = document.querySelector('#county-select')
const countyTimelineHeader = document.querySelector('#county-timeline-header')
const countyTimelineList = document.querySelector('#county-timeline-list')
const countyListItem = document.querySelectorAll('.county-list-item')

const formatDate = (date) => {
    let formattedDate = new Date(date).getFullYear();
    let results = ''
    if (formattedDate) {
        results = formattedDate
    } else {
        results = date[0].toUpperCase() + date.slice(1)
    }
    return results;
}

// loop to create items in the volume select
for (let i = 0; i < counties.length; i++) {
    const countySelectOption = document.createElement('option')
    countySelectOption.innerText = counties[i].id
    countySelectOption.value = counties[i].id
    countySelect.append(countySelectOption)
}

let updatedYear = ''
// grab value of year input and update ^
const yearValueCapture = (input) => {
    if (input.value.length == 0) {
        updatedYear = input.value;
    } else if (input.value > 0 && input.value < 2024) {
        updatedYear = parseInt(input.value);
    } else {
        updatedYear = 'null'
    }
    
    addCountyPeriodItems(updatedYear)
}
console.log( updatedYear)
// event listener for county select
countySelect.addEventListener('change', () => {

    addCountyPeriodItems(updatedYear)

})

// add items to ul timeline
const addCountyPeriodItems = (year) => {
    console.log(updatedYear, typeof updatedYear)
    countyTimelineHeader.innerText = `${countySelect.value} timeline:`
    const currCounty = counties.filter(x => x.id === countySelect.value)[0]
    const countyPeriods = currCounty.periods
    countyTimelineList.innerText = ''
    for (let i = 0; i < countyPeriods.length; i++) {
        let begDate = formatDate(countyPeriods[i][0])
        
        let endDate = formatDate(countyPeriods[i][1])
        let countyName = countyPeriods[i][2]
        const countyListItem = document.createElement('li')
        countyListItem.classList.add('county-list-item')
        countyListItem.innerText = `${begDate} - ${endDate} - ${countyName}`

        if (updatedYear !== 'null' && updatedYear == '' || begDate <= updatedYear && endDate >= updatedYear || begDate == 'Ancestral Period' && endDate >= updatedYear || begDate <= updatedYear && endDate == 'Today') {
            // console.log('successfule')
            countyTimelineList.append(countyListItem)
        } else {
            countyListItem.innerText = ''
            // console.log('else just ran')
        }
    }
}

document.querySelectorAll('.county-list-item').forEach(items => {
    console.log(items.innerText)
})


addCountyPeriodItems()










