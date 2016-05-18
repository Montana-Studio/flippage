$(document).ready(function(){            
    function disableControls(page) {
        if (page===1){
            $('.previous-button').hide();
        }else{
            $('.previous-button').show();
        }
        if (page===$('#flipbook').turn('pages')){
            $('.next-button').hide();
        }else{
            $('.next-button').show();
        }
    }
    var numberOfPages = 46;
    $('#flipbook').turn({
        width: 800,
        height: 566,
        autoCenter: true,
        pages:numberOfPages,
        elevation:50,
        acceleration:true,
        gradients:true,
        when: {
            turning: function(event, page, view) {
                var book = $(this),
                currentPage = book.turn('page'),
                pages = book.turn('pages');
                Hash.go('page/' + page).update();
                disableControls(page);
                $('.thumbnails .page-'+currentPage).parent().removeClass('current');
                $('.thumbnails .page-'+page).parent().addClass('current');
            },
            turned: function(e, page) {
                $('#page-number').val(page);
            }
        }
    });
    $('#number-pages').html(numberOfPages);
    $('#page-number').keydown(function(e){
        if (e.keyCode===13) {
            $('#flipbook').turn('page', $('#page-number').val());
        }
    });
    
    $(document).keydown(function(e){
        var previous = 37, next = 39;
        switch (e.keyCode) {
            case previous:
                $('#flipbook').turn('previous');
                e.preventDefault();
            break;
            case next:
                $('#flipbook').turn('next');
                e.preventDefault();
            break;
        }
    });

    $('.next-button').bind($.mouseEvents.over, function() {
        $(this).addClass('next-button-hover');
    }).bind($.mouseEvents.out, function() {
        $(this).removeClass('next-button-hover');
    }).bind($.mouseEvents.down, function() {
        $(this).addClass('next-button-down');
    }).bind($.mouseEvents.up, function() {	
        $(this).removeClass('next-button-down');
    }).click(function() {	
        $('#flipbook').turn('next');
    });

    $('.previous-button').bind($.mouseEvents.over, function() {
        $(this).addClass('previous-button-hover');
    }).bind($.mouseEvents.out, function() {
        $(this).removeClass('previous-button-hover');
    }).bind($.mouseEvents.down, function() {
        $(this).addClass('previous-button-down');
    }).bind($.mouseEvents.up, function() {
        $(this).removeClass('previous-button-down');
    }).click(function() {
        $('#flipbook').turn('previous');
    });

    $('.thumbnails').click(function(event) {
        var page;
        if (event.target && (page=/page-([0-9]+)/.exec($(event.target).attr('class'))) ) {
            $('#flipbook').turn('page', page[1]);
        }
    });

    $('.thumbnails li').bind($.mouseEvents.over, function() {
            $(this).addClass('thumb-hover');
        }).bind($.mouseEvents.out, function() {
            $(this).removeClass('thumb-hover');
        });

    if ($.isTouch) {
        $('.thumbnails').addClass('thumbanils-touch').bind($.mouseEvents.move, function(event) {
            event.preventDefault();
        });
    } else {

        $('.thumbnails ul').mouseover(function() {
            $('.thumbnails').addClass('thumbnails-hover');
        }).mousedown(function() {
            return false;
        }).mouseout(function() {
            $('.thumbnails').removeClass('thumbnails-hover');
        });
    }
});
function fbShare(url, title, descr, image, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}
function twShare(url, title, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('http://twitter.com/share?url=' + url + '&text=' + title, '', 'left=0,top=0,width=' + winWidth + ',height=' + winHeight + ',personalbar=0,toolbar=0,scrollbars=0,resizable=0');
}
function piShare(url, title, image, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('https://pinterest.com/pin/create/button/?url=' + url + '&media=' + image + '&description=' + title +'');
}