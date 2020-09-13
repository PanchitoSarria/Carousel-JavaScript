const carousel = document.querySelector('.carousel')
const nav = document.querySelector('.nav')

const slides = [...carousel.children]
const dots = [...nav.children]

function positionSlides(slides, slideWidth){
    for(let i = 0; i < slides.length; i++){
        let slideWidth = slides[i].getBoundingClientRect().width
        slides[i].style.left = `${i * slideWidth}px`
    }
}
positionSlides(slides)

const nextButton = document.querySelector('.right-btn')
const previousButton = document.querySelector('.left-btn')


nextButton.addEventListener('click', () => {
    const currentSlide = carousel.querySelector('.active')
    const nextSlide = currentSlide.nextElementSibling

    moveToSlide(nextSlide, currentSlide)
    hideButton(nextSlide, slides)

    moveToDots(nextSlide)
})

previousButton.addEventListener('click', () => {
    const currentSlide = carousel.querySelector('.active')
    const previousSlide = currentSlide.previousElementSibling

    moveToSlide(previousSlide, currentSlide)
    hideButton(previousSlide, slides)

    moveToDots(previousSlide)
})

nav.addEventListener('click', (e) => {
    const targetDot = e.target
    if(targetDot === nav) return
    const currentSlide = carousel.querySelector('.active')
    const currentDot = nav.querySelector('.active')
    let targetDotIndex = findIndex(targetDot, dots)
    toggleActive(targetDot, currentDot)
    const targetSlide = slides[targetDotIndex]
    moveToSlide(targetSlide, currentSlide)
    hideButton(targetSlide, slides)
})


function moveToSlide(targetSlide, currentSlide){
    const position = targetSlide.style.left
    carousel.style.transform = `translateX(-${position})`
    toggleActive(targetSlide, currentSlide)
}

function toggleActive(targetSlide, currentSlide){
    currentSlide.classList.remove('active')
    targetSlide.classList.add('active')
}

function hideButton(targetSlide, slides){
    if(targetSlide === slides[0]){
        previousButton.classList.add('hide')
        nextButton.classList.remove('hide')
    } else if(targetSlide === slides[slides.length - 1]){
        previousButton.classList.remove('hide')
        nextButton.classList.add('hide')
    } else {
        previousButton.classList.remove('hide')
        nextButton.classList.remove('hide')
    }
}

function findIndex(item, items){
    for(let i = 0; i < items.length; i++){
        if(item === items[i]){
            return i
        }
    }
}

function moveToDots(targetSlide){
    let slideIndex = findIndex(targetSlide, slides)
    const currentDot = nav.querySelector('.active')
    const targetDot = dots[slideIndex]
    toggleActive(targetDot, currentDot)
}