import { mapDatesArr, imgAltArr } from "./modules/mapArray.js"
import { changeMapImage } from "./modules/changeMapImage.js"

let imgIndex = 0
let numThumbImages = 5

// add thumb images to page with generated array
export function addThumbImages(index) {
    const thumbContainer = document.querySelector('.thumb-img-container')
    thumbContainer.innerHTML = ''
    const thumbArr = genThumbArray(index)

    for (let i = 0; i < thumbArr.length; i++) {
        let newImgSrc = 'https://www.floridamemory.com/FMP/maps/large/fmc0001.jpg'

        const imgContainer = document.createElement('div')
        let altImg = imgAltArr[i]
        imgContainer.innerHTML = `
            <img  src="${newImgSrc}" alt="${altImg}" class="img-fluid slider-img img-thumbnail map-box map-${thumbArr[i]}" id="${thumbArr[i]}" >
            <div id="${thumbArr[i]}" class="thumb-text "></div>
        `
        thumbContainer.append(imgContainer)
    }


    document.querySelectorAll('.slider-img')[0].classList.add('active-img')
}

// create array of inputted index + next 4
const genThumbArray = (index) => {
    let thumbArr = []
    for (let i = 0; i < numThumbImages; i++) {
        thumbArr.push(index)
        index++
    }
    const lastimgIndex = 21;
    thumbArr = thumbArr.filter(arr => arr <= lastimgIndex)
    thumbArr = thumbArr.filter(arr => arr >= 0)

    return thumbArr
}


// handler for images -- change active class and page select index to reflect change
function imgSliderHandler() {
    const sliderImages = document.querySelectorAll('.slider-img')
    sliderImages.forEach(img => {
        img.addEventListener('click', () => {

            document.querySelector('.active-img').nextElementSibling.classList.remove('d-none')
            sliderImages.forEach(images => {
                images.classList.remove('active-img')
            })

            img.classList.add('active-img')
            document.querySelector('.active-img').nextElementSibling.classList.add('d-none')
            imgIndex = parseInt(img.id)

            changeMapImage(img)

        })
    })
    document.querySelectorAll('.thumb-text').forEach(thumbText => {
        thumbText.innerText = `Map of ${mapDatesArr[thumbText.id]}`
    })
}



//remove prev arrow if there are no prev results and same for next etc..
const testArrows = () => {
    const prevArrow = document.querySelector('.prev-thumb-icon');
    const nextArrow = document.querySelector('.next-thumb-icon');
    const lastimgIndex = 21;
    const thumbArr = genThumbArray(imgIndex)

    if (thumbArr[thumbArr.length - 1] === lastimgIndex) {
        nextArrow.classList.add('d-none')
        prevArrow.classList.remove('d-none')
    } else if (thumbArr[0] === 0) {
        prevArrow.classList.add('d-none')
        nextArrow.classList.remove('d-none')
    } else {
        nextArrow.classList.remove('d-none')
        prevArrow.classList.remove('d-none')
    }
}





