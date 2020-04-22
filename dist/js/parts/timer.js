function timer() {
    let deadline = `2020-04-23`;

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
}

module.exports = timer;