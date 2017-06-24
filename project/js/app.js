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
    /*var formData = JSON.stringify($("#newEntry").serializeArray());
    console.log(formData);*/
    var formData = JSON.stringify($("#newEntry").serializeArray());
    /*form.submit(function (e) {
     e.preventDefault();
     console.log(formData);

     });*/


    form.on('submit', function () {
        alert(localStorage.getItem('token'));
        console.log(formData);
        $.ajax({
            type: "POST", //GET, POST, PUT
            url: 'http://103.198.135.55:8000/api/human/new' , //the url to call
            data: formData,     //Data sent to server
            contentType: 'application/json',
            beforeSend: function (xhr) {   //Include the bearer token in header
                xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.getItem('token'));
            }
        }).done(function (response) {
            alert(response)
        }).fail(function (err)  {
            alert(err)
        });
    })


});

