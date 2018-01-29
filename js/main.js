'use strict';


var WebSiteModule = (function(){

    var 
    $body,
    $menuButton,
    $closeIcon,
    $contentIcon,
    $menuOptionsContainer,
    $nav,

    $experienceSection,
    $aboutSection,
    $educationSection,
    $skillsSection,
    $contactSection;


    var init = function (oProperties){
        $body =  oProperties.body;
        $menuButton =  oProperties.menu;
        $contentIcon = oProperties.contentIcon;
        $closeIcon =  oProperties.closeIcon
        $menuOptionsContainer =  oProperties.menu_options_container;
        $nav = oProperties.nav;

        $experienceSection = oProperties.experienceSection;
        $aboutSection  = oProperties.aboutSection;
        $educationSection  = oProperties.educationSection;
        $skillsSection  = oProperties.skillsSection;
        $contactSection  = oProperties.contactSection;

        initHandlers();
    }
    var onGoToSectionClick = function($event){
        console.log($event);
    }
    var showMenu = function (){
        $contentIcon.css({
            display:'none'
        })
        $closeIcon.css({
            display:'inline-block'
        })
        $menuOptionsContainer.css({
            display:'block',
        });
        $body.css({"overflow":"hidden",'position':'fixed'});

    } 
    var hideMenu = function (){
        $contentIcon.css({
            display:'inline-block'
        })
        $closeIcon.css({
            display:'none'
        })
      
   
         $menuOptionsContainer.css({
            display:'none',
        });
        $body.css({"overflow":"auto",'position':''});
      
    }


    /*private methods*/

    var initHandlers = function(){
        /* handlers */
         $menuButton.bind('click',{},showMenuHandler);
         $nav.children().bind('click',{},goToSecion);
        $(".nav-item").bind('click',goToSecion);
         /* clicks */
        //  $('html, body').animate({
        //     scrollTop: $(".middle").offset().top
        //  }, 2000);
    }

    var showMenuHandler = function(){
        $contentIcon.is(":visible") ? showMenu() : hideMenu();
    }
    var goToSecion = function (e){
        hideMenu();
        var $section = $("#" + e.target.attributes['data-section'].nodeValue);
          $('html, body').animate({
            scrollTop: parseInt($section.offset().top)
         }, 500);

       
    }

    var publicAPI = {}
    return publicAPI = {
        init:init,
        onGoToSectionClick:onGoToSectionClick
    }
})();

WebSiteModule.init({
    body:$("body"),
    menu:$("#menu_button"),
    menu_options_container:$("#menu_options_container"),
    contentIcon:$("#menu_button").find(".content-icon"),
    closeIcon:$("#menu_button").find(".close-icon"),
    nav:$("#nav"),
    experienceSection:$("#ws-experience-section"),
    aboutSection:$("de-about-section"),
    educationSection:$("ws-education-section"),
    skillsSection:$("ws-skills-section"),
    contactSection:$("ws-contact-section"),
})

$(function() {
    // Handler for .ready() called.
    if (screen.width < 1024) {
        // alert('Less than 1024');
        $('#mobile-view').css('display','block');
        $('#Desktop-view').css('display','none');
 
 
     }
     else {
        // alert('More than 1025');
        $('#Desktop-view').css('display','block');
        $('#mobile-view').css('display','none');
 
     }
  });
$(window).resize(function(){
    if (screen.width < 1024) {
       // alert('Less than 1024');
       $('#mobile-view').css('display','block');
       $('#Desktop-view').css('display','none');


    }
    else {
       // alert('More than 1025');
       $('#Desktop-view').css('display','block');
       $('#mobile-view').css('display','none');

    }
});


// Wait for the DOM to be ready
$(function() {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[name='registration']").validate({
      // Specify validation rules
      rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
        fo_firstname: "required",
        fo_subject:"required",
        fo_message:"required",
        fo_email: {
          required: true,
          // Specify that email should be validated
          // by the built-in "email" rule
          email: true
        }
        
      },
      // Specify validation error messages
      messages: {
        fo_firstname: "Please enter your firstname",
        fo_subject: "Please enter your subject",
        fo_message:"Please enter your message",
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long"
        },
        fo_email: "Please enter a valid email address"
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
          var data = {};
         data['subject'] = fo_subject.value;
         data['text'] =  fo_firstname.value + '\r\n' +  fo_message.value + '\r\n' + fo_email.value;
        data["access_token"] = "pzd1ish7x4my98x4ro4ulwum";

        $.post('https://postmail.invotes.com/send',
            data,
            onSuccess
        ).fail();
        return false;

         //form.submit();

         function onSuccess(){
        //     $.each($('."inner-left-wrapper').find('input'), function (index, input) {
        //         $(input).val('');
        //     })
        //    $(".fo-message").val('');;

        fo_subject.value = '';
        fo_firstname.value = '';
        fo_message = '';
        fo_email.value = '';
         }
      }
    });
  });