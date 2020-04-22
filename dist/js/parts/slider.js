function slider(){
    let slideIndex = 1,
        slides = document.querySelectorAll(`.slider-item`),
        prev = document.querySelector(`.prev`),
        next = document.querySelector('.next'),
        dotsWrapper = document.querySelector(`.slider-dots`),
        dots = document.querySelectorAll(`.dot`);

    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = `none`);
        dots.forEach((item) => item.classList.remove(`dot-active`));

        slides[slideIndex - 1].style.display = `block`;
        dots[slideIndex - 1].classList.add(`dot-active`);
    }

    prev.addEventListener(`click`, () => {
        showSlides(slideIndex -= 1);
    });

    next.addEventListener(`click`, () => {
        showSlides(slideIndex += 1);
    });

    dotsWrapper.addEventListener(`click`, function(event) {
        let target = event.target;
        for (let i = 0; i < dots.length + 1; i++) {
            if (target.classList.contains('dot') && target == dots[i-1]) {
                slideIndex=i;
                showSlides(i);
            }
        }
    });
}

module.exports = slider;