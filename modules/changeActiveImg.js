 import { openSeaViewerFunc } from "./openSeaMapViewer.js"
 
 // handler for images -- change active class and page select index to reflect change
export const changeActiveImg = () => {
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
        })
    })
    // document.querySelectorAll('.thumb-text').forEach(thumbText => {
    //     thumbText.innerText = `Pg ${pageSelect[thumbText.id].innerText}`
    // })
}