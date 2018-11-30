function liAnim(slide) {
    var lis = $(slide).find('li');
    var tl = new TimelineMax({paused: true});
    tl.staggerFrom(lis, 0.5, {opacity: 0, x: 1000, scale: 2}, 0.5);
    return tl;
}

function liStepAnim(slide) {
    var lis = $(slide).find('li');
    var tl = new TimelineMax({paused: true});
    var i = 0;
    tl.set($(slide).find('.animation'), {opacity: 1});
    for (i = 0; i < lis.length; ++i) {
        var label = 'step-' + (i + 1);
        tl.add(label)
          .addPause(label)
          .from(lis[i], 0.5, {opacity: 0, x: 1000, scale: 2});
    }
    tl.play();
    return tl;
}


function divStepAnim(slide) {
    slide = $(slide);
    var div = slide.find('div:not(.pagination)'),
        tl = new TimelineMax({paused: true});

    tl.set(slide.find('.animation'), {opacity: 1});
    for (var i = 0; i < div.length; ++i) {
        var label = 'step-' + (i + 1);
        tl.add(label)
          .addPause(label)
          .from(div[i], 0.5, {opacity: 0, x: '-=200'});
    }
    tl.play();
    return tl;
}


function randomNumber() {
    return Math.floor(Math.random() * Math.pow(10, 7));
}


function anim(slide) {
    var cj = $(slide).find('li, aside, div:not(.pagination), tr');
    var tl = new TimelineMax({paused: true});
    tl.staggerFrom(cj, 0.5, {opacity: 0, x: '+=1000', scale: 2}, 0.5);
    return tl;
}


function stepAnim(slide) {
    var tl = new TimelineMax(),
        conjunto = $(slide).find('p, li, aside, div:not(.pagination), tr, blockquote, pre'),
        varsFrom = {opacity: 0, x: '+=1000', scale: 2};

    return _stepAnim(tl, conjunto, varsFrom);
}


function _stepAnim(timeline, conjunto, vars = {opacity: 0}, delay = 0.5) {
    if (conjunto.length == 0) {
        return null;
    }
    for (var i = 0; i < conjunto.length; ++i) {
        var label = 'step-' + randomNumber();
        timeline.add(label)
                .addPause(label)
                .from(conjunto[i], delay, vars);
    }
    return timeline;
}


function videoAnim(slide) {
    slide = $(slide);
    var video = slide.find('video')[0],
        label = 'video-' + randomNumber(),
        func = function() {
            console.log('Play video ' + label);
            video.play();
        },
        tl = new TimelineMax();

    tl.add(label)
      .addPause(label)
      .from(video, 0.5, {opacity: 0})
      .call(func);

    return tl;
}


function rowStepAnim(slide) {
    slide = $(slide);
    var conjunto = slide.find('tr'),
        vars = {opacity: 0, x: '+=300'},
        tl = new TimelineMax();

    _stepAnim(tl, conjunto, vars);
    return tl;
}
