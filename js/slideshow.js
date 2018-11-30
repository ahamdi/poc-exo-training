
var slide = 'slide';
var slides = $(slide);
var currentSlideNumber = 0;
var totalSlides = slides.length;
var animations = [];
var nextStepEvent = new Event('nextStep'),
    nextSlideEvent = new Event('nextSlide');


function paginarSlide(index, slide) {
    $(slide).append('<div class="pagination"><span class="pagenumber">' + (index + 1) +
                   '</span> / <span class="totalpages">' + totalSlides+ '</span></div>');
    $(".pagination_container select")
    $("<option />", {
        "value"   : index,
        "text"    : (index + 1) + '. ' + slide.id
    }).appendTo(".pagination_container select");
}

function getAnimation(slide) {
    var animation = null;
    if ('animation' in slide.dataset) {
        let func = window[slide.dataset.animation];
        if (func) {
            animation = func(slide);  // TimelineMax expected
        }
    }
    return animation;
}

function goToPrev() {
    goToSlide(currentSlideNumber - 1);
}

function goToNext() {
    window.dispatchEvent(nextSlideEvent);
    goToSlide(currentSlideNumber + 1);
}

function goToSlide(number) {
    if (0 <= number && number < totalSlides) {
        var duration = 0.5;
        var width = $(window).width();
        var outgoing_x = -width;
        var incoming_x = width;
        var tl = new TimelineMax();
        if (currentSlideNumber > number) {
            outgoing_x = width;
            incoming_x = -width;
        }
        var curAnimation = animations[currentSlideNumber],
            nextAnimation = animations[number];

        // para a animação atual
        if (curAnimation) {
            curAnimation.pause();
        }

        // reinicia a próxima animação
        if (nextAnimation) {
            if (nextAnimation.rewind) {
                nextAnimation.rewind();
            } else {
                nextAnimation.progress(0);
            }
        }
        tl.add('transition')
          .to(slides[currentSlideNumber], duration, {x: outgoing_x})
          .fromTo(slides[number], duration, {x: incoming_x}, {x: 0}, 'transition');
        currentSlideNumber = number;
        $('.pagination_container select').val(number);
    }
}

function nextStep() {
    window.dispatchEvent(nextStepEvent);
    var curAnimation = animations[currentSlideNumber];
    if (!curAnimation || curAnimation.progress() == 1) {
        goToNext();
    } else {
        curAnimation.play();
    }
}

function prevStep() {
    var curAnimation = animations[currentSlideNumber];
    if (!curAnimation || curAnimation.progress() == 0) {
        goToPrev();
    } else {
        curAnimation.reverse();
    }
}


(function($) {
    $('<div class="pagination_container">\n\
<div class="container">\n\
    <span id="previous_slide">&lt;</span>\n\
    <select></select>\n\
    <span id="next_slide">&gt;</span>\n\
</div>\n\
</div>').prependTo('body');
    $('#previous_slide').on('click', prevStep);
    $('#next_slide').on('click', nextStep);
    $('.pagination_container select').on('change', function() {
        goToSlide(parseInt(this.value));
    });
    $('body').on('keydown', function(event) {
        var code = event.keyCode;

        switch(code) {
            case 37:  // left
                prevStep();
                break

            case 39:  // right
                nextStep();
                break;

            case 33:
            case 38:
                goToPrev();
                break;

            case 34:
            case 40:
                goToNext();
                break;

            case 36:  // home
                goToSlide(0);
                break;

            case 35:  // end
                goToSlide(totalSlides - 1);
                break;
        }

        if (33 <= code && code <= 40) {
            event.preventDefault();
        }

    });
    $('body').on('wheel', function(e){
        if (e.originalEvent.deltaY < 0) {
            prevStep();
        } else {
            nextStep();
        }
    });
    slides.each(function(index, slide){
        paginarSlide(index, slide);
        animations.push(getAnimation(slide));
    });
    goToSlide(0);


    // ref: http://tjvantoll.com/2012/06/15/detecting-print-requests-with-javascript/

    var beforePrint = function() {
        // clean up inline styles
        $('html').removeAttr('style');
        $('body').removeAttr('style');
        $(deck).removeAttr('style');
        $(slide).removeAttr('style');
        var slides = $(deck + ' > div').html();
        $(deck + ' > div').remove()
        $(deck).append(slides);
    };

    var afterPrint = function() {
    // firing just after beforePrint!
    // It's not sure if this can be changed at all:
    // http://stackoverflow.com/questions/9920397/window-onbeforeprint-and-window-onafterprint-get-fired-at-the-same-time/9920784#9920784
    //    jmpress_init();
    };

    // if (window.matchMedia) {
    //     var mediaQueryList = window.matchMedia('print');
    //     mediaQueryList.addListener(function(mql) {
    //         if (mql.matches) {
    //             beforePrint();
    //         } else {
    //             afterPrint();
    //         }
    //     });
    // }

    if ('matchMedia' in window) {
        window.matchMedia('print').addListener(function (media) {
            beforePrint();
        });
    }

    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;

})(jQuery);
