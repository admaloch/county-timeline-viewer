export const changeMapImage = (img) => {
    const mainImg = document.querySelector('#new-img-src')
    let newClass = `map-${img.id}`
    mainImg.alt = img.alt
    if (img.id === '0') {
        mainImg.src = 'https://www.floridamemory.com/FMP/maps/large/fmc0001.jpg'
        mainImg.classList = (`d-block img-fluid`)
    } else {
        mainImg.src = ''
        mainImg.classList = (`d-block img-fluid cropped-img ${newClass}`)
    }
}