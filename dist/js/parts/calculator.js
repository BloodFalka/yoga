function calculator(){
    let persons = document.querySelectorAll(`.counter-block-input`)[0],
        days = document.querySelectorAll(`.counter-block-input`)[1],
        location = document.querySelector(`#select`),
        totalSum = document.querySelector(`#total`),

        personsValue = 0,
        daysValue = 0,
        locationRate = 0,
        totalValue = 0;

    totalSum.textContent = "0";

    persons.addEventListener('input', function(){
        personsValue = +this.value;
        totalValue = personsValue*daysValue*2000*location.options[location.selectedIndex].value;
   
        if(days.value == '' || location.options[location.selectedIndex].value == ''){
            totalSum.textContent = "0"
        } else {
            totalSum.textContent = totalValue
        }
    });
    
    days.addEventListener('input', function(){
        daysValue = +this.value;
        totalValue = personsValue*daysValue*2000*location.options[location.selectedIndex].value;

        if(location.options[location.selectedIndex].value == '' || persons.value == ''){
            totalSum.textContent = "0"
        } else {
            totalSum.textContent = totalValue
        }
    });

    location.addEventListener('input', function(){
        totalValue = personsValue*daysValue*2000*location.options[location.selectedIndex].value;

        if(days.value == '' || persons.value == ''){
            totalSum.textContent = "0"
        } else {
            totalSum.textContent = totalValue
        }
    });
}

module.exports = calculator;