(function($) 
{
  "use strict";

  var nav = $('nav');
  var navHeight = nav.outerHeight();

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  /* ******* Navigation Scroll ******* */
  var mainNav_height = $('#mainNav').outerHeight() - 22;
  $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        var scrollto = target.offset().top - mainNav_height;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });
  
  /* ******* FadeIn Navigation bar on Scroll  ******* */
  $(window).trigger('scroll');
  $(window).on('scroll', function() {
    var pixels = 50;
    var top = 1200;
    if ($(window).scrollTop() > pixels) {
      $('.navbar-expand-md').addClass('navbar-reduce');
      $('.navbar-expand-md').removeClass('navbar-trans');
    } else {
      if (!$('#navbarDefault').hasClass('show')) {
        $('.navbar-expand-md').removeClass('navbar-reduce');
      }
      $('.navbar-expand-md').addClass('navbar-trans');
    }
    if ($(window).scrollTop() > top) {
      $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
    } else {
      $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
    }
  });
  
  // Activate scroll to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: navHeight
  });

  //Testimonials auto scroll
  $('#testimonial-mf').owlCarousel({
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      }
    }
  });

  // Filter by Category of Projects
  $(window).on('load', function(){
    preloader()

    if($('.gallery-items').length > 0){
      $('.gallery-items').filterizr();
    }

    $('#filter-list li').on('click', function(){
      $('#filter-list li').removeClass('active');
      $(this).addClass('active');
    });
  });

  function preloader(){
    $(".preloaderimg").fadeOut();
    $(".preloader").delay(200)
    .fadeOut("slow").delay(200, function(){
      $(this).remove();
    });
  }


  //Web PAGE ANIMATION EFFECT ON SCROLL
  $('.js--wp-intro').waypoint(function (direction) {
    $('.js--wp-intro').addClass('animated bounceInDown');
  }, {
    offset: '55%'
  });

  $('.js--wp-abt1').waypoint(function (direction) {
    $('.js--wp-abt1').addClass('animated fadeInLeft');
  }, {
    offset: '30%'
  });
  $('.js--wp-abt2').waypoint(function (direction) {
    $('.js--wp-abt2').addClass('animated fadeInRight');
  }, {
    offset: '35%'
  });

  $('.js--wp-skills').waypoint(function (direction) {
    $('.js--wp-skills').addClass('animated pulse');
  }, {
    offset: '10%'
  });

  $('.js--wp-pjt').waypoint(function (direction) {
    $('.js--wp-pjt').addClass('animated zoomIn');
  }, {
    offset: '30%'
  });

  $('.js--wp-talk').waypoint(function (direction) {
    $('.js--wp-talk').addClass('animated heartBeat');
  }, {
    offset: '13%'
  });

  $('.js--wp-code-c').waypoint(function (direction) {
    $('.js--wp-code-c').addClass('animated zoomIn');
  }, {
    offset: '15%'
  });

  $('.js--wp-contact').waypoint(function (direction) {
    $('.js--wp-contact').addClass('animated pulse');
  }, {
    offset: '18%'
  });

})(jQuery);

// FORM VALIDATION (User names and E-mail)
//1.  Bringing in the DOM
const form = document.getElementById('form');
const userName = document.getElementById('username');
const email = document.getElementById('email');

//3.  Show input error message & border outline
function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group error';
  const small = formGroup.querySelector('small');
  small.innerText = message;
}

//4.  Show Success Border Outline & message
function showSuccess(input){
  const formGroup = input.parentElement;
  formGroup.className = 'form-group success';
}

//5.  Check Email validity
function checkEmail(input) { 
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

//2a. Check required field
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//2b. Get Field Name
function getFieldName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//2c. Check Username input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } 
}

//2.  Event Listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([userName, email]);

  //Check length of Username
  checkLength(userName, 3, 25, );
  checkEmail(email);
});
