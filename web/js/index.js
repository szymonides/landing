function nextH1()
{
    var count = $('#options span').length;
    var current = $('#options span:visible').index();
    if (current + 1 >= count) {
        showH1(0);
    } else {
        showH1(current + 1);
    }

    $('#right-arrow').addClass('active');
    setTimeout(function(){
        $('#right-arrow').removeClass('active');
    }, 200);

}

function prevH1()
{
    var count = $('#options span').length;
    var current = $('#options span:visible').index();
    if (current == 0) {
        showH1(count - 1);
    } else {
        showH1(current - 1);
    }

    $('#left-arrow').addClass('active');
    setTimeout(function(){
        $('#left-arrow').removeClass('active');
    }, 200);

}

function showH1(id)
{
    $('#options span').hide();
    $('#options span').eq(id).show();
}

function goTo(id, activeIndex)
{

    if (id === 0) {
        $('body').scrollTo(0);
        return;
    } else {
        var top = $(id).position().top - 70;
        $('body').scrollTo(top);
    }

    detect();
}


function detect()
{
    var tab = [];
    $('.section').each(function() {
        tab.push({
            'id': $(this).attr('id'),
            'top': $(this).position().top
        })
    });

    var current = parseInt($(window).scrollTop());
    var id = null;
    for (var i = 0; i < tab.length; i++) {
        if (tab[i].top - 100 >= current) {
            break;
        }
        id = tab[i].id;
    }

    $('#links li.active').removeClass('active');
    if (id === null) {
        $('#home-link').addClass('active');
    } else {
        $('#' + id + '-link').addClass('active');
    }
}

$(document).ready(function()
{
    var interval;
    runInterval();
    $('#left-arrow').bind('click', prevH1);
    $('#right-arrow').bind('click', nextH1);
    $('#left-arrow').bind('mouseover', function () {
        clearInterval(interval);
    }).bind('mouseout', function(){
        runInterval();
    });
    $('#right-arrow').bind('mouseover', function () {
        clearInterval(interval);
    }).bind('mouseout', function(){
        runInterval();
    });

    function runInterval()
    {
        interval = setInterval(function(){
            nextH1();
        }, 1500)
    }

    var placeholderText;
    $('input, textarea').bind('focusin', function(){
        placeholderText = $(this).attr('placeholder');
        $(this).attr('placeholder', '')
    });
    $('input, textarea').bind('focusout', function(){
        $(this).attr('placeholder', placeholderText);
    });

    $(window).scroll(function(){
        detect();
    });
});















$.fn.scrollTo = function( target, options, callback ){
    if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
    var settings = $.extend({
        scrollTarget  : target,
        offsetTop     : 50,
        duration      : 500,
        easing        : 'swing'
    }, options);
    return this.each(function(){
        var scrollPane = $(this);
        var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
        var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
        scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
            if (typeof callback == 'function') { callback.call(this); }
        });
    });
}