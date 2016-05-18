jQuery(document).ready(function($){
    
    var numberOfPages =  46; 
	// Adds the pages that the book will need
	function addPage(page, book) {
		// 	First check if the page is already in the book
		if (!book.turn('hasPage', page)) {
			// Create an element for this page
			var element = $('<div />', {'class': 'page '+((page%2===0) ? 'odd' : 'even'), 'id': 'page-'+page}).html('<i class="loader"></i>');
			// If not then add the page
			book.turn('addPage', element, page);
			// Let's assum that the data is comming from the server and the request takes 1s.
			setTimeout(function(){
					element.html('<div class="data"><img src="img/part-'+page+'.jpg"/></div>');
			}, 1000);
		}
	}
	$(window).ready(function(){
		$('#book').turn({
            acceleration: true,
            pages: numberOfPages,
            elevation: 100,
            gradients: !$.isTouch,
            autoCenter: true,
            turnCorners: 'tl,tr',
            when: {
                turning: function(e, page, view) {
                    // Gets the range of pages that the book needs right now
                    var range = $(this).turn('range', page);
                    // Check if each page is within the book
                    for (page = range[0]; page<=range[1]; page++) {
                        addPage(page, $(this));
                    }
                },
                turned: function(e, page) {
                    $('#page-number').val(page);
                }
            }
        });
		$('#number-pages').html(numberOfPages);
		$('#page-number').keydown(function(e){
			if (e.keyCode===13) {
				$('#book').turn('page', $('#page-number').val());
            }
		});
	});
	$(window).bind('keydown', function(e){
		if (e.target && e.target.tagName.toLowerCase()!=='input') {
			if (e.keyCode===37) {
				$('#book').turn('previous');
            }
			else if (e.keyCode===39) {
				$('#book').turn('next');
            }
        }
	});
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