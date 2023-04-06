import { mapDatesArr, imgAltArr } from "./mapData.js"

// create map thumbnail image
export const addThumbImages = (yearIndex, imgNum) => {
    const thumbMapContainer = document.querySelector('.thumb-img-container')
    // console.log('this is the yearIndex ', yearIndex)
    thumbMapContainer.style.display = 'none'

    const thumbArr = genThumbArray(yearIndex, imgNum)

    thumbMapContainer.innerHTML = ''
    for (let i = 0; i < thumbArr.length; i++) {
        const thumbContain = document.createElement('div')
        thumbContain.classList.add('d-flex', 'flex-column')
        thumbContain.innerHTML = `
        <div class="thumb-map-img map-${thumbArr[i] + 1}"
            id = "${thumbArr[i] + 1}"
            title="${imgAltArr[thumbArr[i] + 1]}">
        </div>
        <div class="thumb-text">${mapDatesArr[thumbArr[i] + 1]}</div>
        `
        thumbMapContainer.append(thumbContain)
    }

    $(".thumb-img-container").fadeIn(1000);
}


// create array of inputted index + next 4
const genThumbArray = (yearIndex, imgNum) => {
    let thumbArr = []
    for (let i = 0; i < imgNum; i++) {
        thumbArr.push(yearIndex)
        yearIndex++
    }
    const lastYearIndex = 20
    thumbArr = thumbArr.filter(arr => arr <= lastYearIndex)
    thumbArr = thumbArr.filter(arr => arr >= 0)
    return thumbArr
}


