// import { Component } from '../core/component'
// import select2 from 'select2';
//import cssVendor from 'css-vendor';
//import material_design_iconic_font from 'material-design-iconic-font';
import $ from 'jquery'

$(document).ready(function() {

    try {
        var selectSimple = $('.js-select-simple');


        selectSimple.each(function() {
            var that = $(this);
            var selectBox = that.find('select');

            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });
    } catch (err) {
        console.log(err);
    }
});