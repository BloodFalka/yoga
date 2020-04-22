function postModal () {
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
}

module.exports = postModal;