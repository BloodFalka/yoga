window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let tab = document.querySelectorAll(`.info-header-tab`),
        info = document.querySelector(`.info-header`),
        tabContent = document.querySelectorAll(`.info-tabcontent`);

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove(`show`);
            tabContent[i].classList.add(`hide`);
        }
    }

    hideTabContent(1);

    function showTabContent(a) {
        if (tabContent[a].classList.contains(`hide`)) {
            tabContent[a].classList.remove(`hide`);
            tabContent[a].classList.add(`show`);
        }
    }

    info.addEventListener(`click`, function(event) {
        let target = event.target;

        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer
    let deadline = `2020-04-16`;

    function getTimeRemaining(endtime) {
        let timeDiff = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((timeDiff / 1000) % 60),
            minutes = Math.floor((timeDiff / 1000 / 60) % 60),
            hours = Math.floor(timeDiff / (1000 * 60 * 60));

        return {
            'total': timeDiff,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let timeDiff = getTimeRemaining(endTime);

            if (timeDiff.hours < 10) {
                hours.textContent = `0${timeDiff.hours}`;
            } else {
                hours.textContent = timeDiff.hours;
            }

            if (timeDiff.minutes < 10) {
                minutes.textContent = `0${timeDiff.minutes}`;
            } else {
                minutes.textContent = timeDiff.minutes;
            }

            if (timeDiff.seconds < 10) {
                seconds.textContent = `0${timeDiff.seconds}`;
            } else {
                seconds.textContent = timeDiff.seconds;
            }

            if (timeDiff.total < 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);

    //Modal post
    let more = document.querySelector(`.more`),
        infoBlock = document.querySelector(`.info`),
        infoMore = document.querySelectorAll(`.description-btn`),
        overlay = document.querySelector(`.overlay`),
        close = document.querySelector(`.popup-close`);

    more.addEventListener(`click`, function() {
        overlay.style.display = `block`;
        this.classList.add(`more-splash`);
        document.body.style.overflow = `hidden`;
    });

    infoBlock.addEventListener(`click`, function(event) {
        let target = event.target;
        if (target && target.classList.contains(`description-btn`)) {
            overlay.style.display = `block`;
            target.classList.add(`more-splash`);
            document.body.style.overflow = `hidden`;
        }
    });

    close.addEventListener(`click`, function() {
        overlay.style.display = `none`;
        more.classList.remove(`more-splash`);
        document.body.style.overflow = `visible`;
        for (let i = 0; i < infoMore.length; i++) {
            if (infoMore[i].classList.contains(`more-splash`)) {
                infoMore[i].classList.remove(`more-splash`);
                break;
            }
        }
    });

    //            FORMS POST
    let message = {
        loading: `Загрузка...`,
        success: `Спасибо, скоро свяжемся с вами`,
        failure: `Что-то пошло не так`,
    };

    //Form POST
    function postForm(formQuerySelector) {
        let form = document.querySelector(formQuerySelector),
            input = form.querySelectorAll(`input`),
            statusMessage = document.createElement(`div`);

        statusMessage.classList.add(`status`);

        form.addEventListener(`submit`, function(event) {
            event.preventDefault();
            form.appendChild(statusMessage);

            let formData = new FormData(form);

            let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);

            function sendData(data) {
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();

                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                    request.addEventListener(`readystatechange`, function() {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                    request.send(data);
                });
            }

            function deleteInputs() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = ``;
                }
            }
            sendData(json)
                .then(() => statusMessage.textContent = message.loading)
                .then(() => statusMessage.textContent = message.success)
                .catch(() => statusMessage.textContent = message.failure)
                .then(() => deleteInputs());
        });
    }

    postForm(`.main-form`);

    postForm(`#form`);

    //Slider

    let slideIndex = 1,
        slides = document.querySelectorAll(`.slider-item`),
        prev = document.querySelector(`.prev`),
        next = document.querySelector('.next'),
        dotsWrapper = document.querySelector(`.slider-dots`),
        dots = document.querySelectorAll(`.dot`);

    showSlides(slideIndex);
    switchPrevSlide();
    switchNextSlide();

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

    function switchPrevSlide() {
        prev.addEventListener(`click`, () => {
            showSlides(slideIndex -= 1);
        });
    }

    function switchNextSlide() {
        next.addEventListener(`click`, () => {
            showSlides(slideIndex += 1);
        });
    }
});