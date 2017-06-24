/**
 * Created by samia on 6/24/2017.
 */

/*show and hide and or dob*/

var ageHolder = $('.age');
var dobHolder = $ ('.dob');
var selector = $('input[name="dobFlag"]');

selector.on('click', function () {
    if($(this).val() == '0'){
        $('.findAge').fadeOut(400, function () {
            dobHolder.fadeIn(400);
        })
    } else if ($(this).val() == '1'){
        $('.findAge').fadeOut(400, function () {
            ageHolder.fadeIn(400);
        })
    }
});
$(document).ready(function () {
    var stepWizard = $('.steps a');
    var wells = $('.step');
    var nextBtn = $ ('.nextBtn');
    var prevBtn = $ ('.prevBtn');

    wells.hide();

    stepWizard.click(function (e) {
        e.preventDefault();


        var $target = $($(this).attr('href')),
            $item = $(this);
        if (!$item.hasClass('disabled')) {
            stepWizard.removeClass('active').addClass('now');
            $item.addClass('test');
            wells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });
    nextBtn.click(function(){
        var curStep = $(this).closest(".step"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.steps a[href="#' + curStepBtn + '"]').next(),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    prevBtn.click(function(){
        var curStep = $(this).closest(".step"),
            curStepBtn = curStep.attr("id"),
            prevStepWizard = $('div.steps a[href="#' + curStepBtn + '"]').prev();

        prevStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.step div a.btn-primary').trigger('click');


    /*submit form*/

    var sendButton = $('#entry');
    var form = $('newEntry');


    sendButton.click(function(e) {
        var name = $('#fullname').val();
        var sex = $('input[name="sex"]:checked').val();
        var dobFlag = $('input[name="dobFlag"]:checked').val();
        var age = $('#Age').val();
        var formData = JSON.stringify({fullname :name,dobFlag: dobFlag, sex: sex, age:age});
        e.preventDefault();
        //alert(Cookies.get('token'));

        var url = "http://localhost:8000/api/human/new"
        var xhr = new XMLHttpRequest();
        var tokenElement = localStorage.getItem('token');

        xhr.open('POST', url, true);
        xhr.setRequestHeader("Authorization", "Bearer "+ Cookies.get('token'));

        xhr.send(formData);
    })
});



