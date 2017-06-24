/**
 * Created by samia on 6/24/2017.
 */

/*show and hide and or dob*/

var ageHolder = $('.age');
var dobHolder = $ ('.dob');
var selector = $('input[name="ageKnown"]');

selector.on('click', function () {
    if($(this).val() == 'yes'){
        console.log('yep');
        $('.findAge').fadeOut(400, function () {
            dobHolder.fadeIn(400);
        })
    } else if ($(this).val() == 'no'){
        console.log('dunno');
        $('.findAge').fadeOut(400, function () {
            ageHolder.fadeIn(400);
        })
    }
});
