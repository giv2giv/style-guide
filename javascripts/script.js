var animationSpeed = 400;

$(function() {

    // Only enable hover functions, equal height sections and parallax on non iOs
    if( !iosAgent() ) {
        stellarInit();
        hoverInit();
        equalizeHeight()
    }

    // Hide address bar on iOS
    if ( iosAgent() ) {
        iosHideBar();
    }

	smoothScroll();
    carouselInit();
    tooltipInit();
    lightboxInit();
    setupSignupForm();

});

// Function to hide the bar on IOS
function iosHideBar() {
    window.addEventListener("load",function() {
      // Set a timeout...
      setTimeout(function(){
        // Hide the address bar!
        window.scrollTo(0, 1);
      }, 0);
    });
}


// Function for checking iOS agent
function iosAgent() {
    var deviceAgent = navigator.userAgent.toLowerCase();
    var newClass = '';
    var isIOS = false;
    if( deviceAgent.match(/iphone/i) ) {
        newClass = 'agent-iphone';
        isIOS = true;
    }
    else if( deviceAgent.match(/ipod/i) ) {
        newClass = 'agent-ipod';
        isIOS = true;
    }
    else if( deviceAgent.match(/ipad/i) ) {
        newClass = 'agent-ipad';
        isIOS = true;
    }

    $('body').addClass( newClass );

    return isIOS;
}



// Function for carousel init
function carouselInit() {
    $('#intro').carousel({
        interval: 5000
    });

    if( !$('body').hasClass( 'agent-iphone' ) ) {
        $('#thumbs').carousel({
            interval: 5000
        });
    } else {
        $('#thumbs').removeClass('carousel slide');
    }
}

// Function for smooth scrolling between the sections
function smoothScroll() {
	$('.navbar').on('click','a', function(e) {
        e.preventDefault();
        target = this.hash;
        $.scrollTo( target, 3 * animationSpeed, {
            axis: 'y'
        } );
   });
}

// Make the sections have the height of the window
function equalizeHeight() {
    var section = $('html').not('.ie8').find('.section'); // getting the sections in all but ie8
	section.css({'min-height': (($(window).height()))+'px'});
    $(window).resize(function(){
        section.css({'min-height': (($(window).height()))+'px'});
    });
}

// initialize stellar
function stellarInit() {
    $(window).stellar({
        horizontalScrolling: false
    });
}

// initialize tooltips
function tooltipInit() {
    $('.well-author a, #style-switcher a').tooltip();
}

function setupSignupForm() {
    $('#submitEmail').click( function() {
        var email = $('#email').val();
        // validate email here
        if( validateEmail( email ) ) {
            // if valid , send request
            var request = $.ajax({
                url: "sign_me_up.php",
                context: this,
                type: "POST",
                dataType: "JSON",
                data: { "email": email }
                });
            request.done(function( data ) {
                if( data.error === undefined ) {
                    message( "<strong>Thanks for your interest!</strong> we will be in touch soon....", "success", 5000 );
                }
                else {
                    message( "<strong>Failed to Register</strong> please try again later", "error", 5000 );
                }
            });
        }
        else {
            message( "<strong>Invalid Email</strong> please type in a correct email address", "error", 5000 );
        }
    });

    $('#email').keypress( function() {
        if( validateEmail( $(this).val() ) ) {
            $(this).removeClass( 'invalid-email' );
        }
        else {
            $(this).addClass( 'invalid-email' );
        }
    });
}


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function message( content, type, duration ) {
    var messageHTML = '<div class="alert alert-' + type + '">'
                    + content
                    + '</div>';

    var message = $(messageHTML).hide();

    $('#messages').append(message);

    message.fadeIn();

    // Increase compatibility with unnamed functions
    setTimeout(function() {
        message.fadeOut();
    }, duration);  // will work with every browser
}

function hoverInit() {
    $('[data-image]').on('mouseenter', function(){
        $(this).find('i').animate({
            top: '50%'
            }, 300
        );
    });
    $('[data-image]').on('mouseleave', function(){
        $(this).find('i').animate({
            top: '120%'
            }, 300, function() {
                $(this).css('top', '-100px');
            }
        );
    });
}

function lightboxInit() {
    $('[data-image]').on('click', function() {
        var src = $(this).data('image');
        $('#lightbox').find('img').attr('src', src);
    });
}
;
