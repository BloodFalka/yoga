window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    let calculator = require('js/parts/calculator.js'),
        postModal = require('js/parts/postModal.js'),
        slider = require('js/parts/tabs'),
        tabs = require('js/parts/tabs.js'),
        timer = require('js/parts/timer.js');

    calculator();
    postModal();
    slider();
    tabs();
    timer();

});