console.clear();
var $ = jQuery;

(function($){

function getVideo(query){
	return $.ajax({
		url: 'https://itunes.apple.com/search?term=' + (query.replace(/\s/g, '+') || 'beyonce') + '&entity=musicVideo&limit=10'
	})
}

function requestVideo(value){
	getVideo(value).done(function(request){

		var allVideo = JSON.parse(request);
		var $carousel = $('#myCarousel');
		var $indicators = $('.carousel-indicators');
		var $inner = $('.carousel-inner');
		$indicators.empty();
		$inner.empty();

		allVideo.results.forEach(function(item, i){
			var $li = $('<li>').attr('data-target', '#myCarousel').attr('data-slide-to', i),
			$video = $('<video>').attr({'src': item.previewUrl,'controls': '', 'width': '100%'}),
			$title = $('<h3>').text(item.artistName),
			$description = $('<p>').html(item.trackName + '<br> Date release: ' + item.releaseDate + '.'),
			$caption = $('<div>').addClass('carousel-caption').append($title).append($description),
			$item = $('<div>').addClass('item').append($video).append($caption);

			$indicators.append($li);
			$inner.append($item);
			
		});
			$indicators.find('li').filter('[data-slide-to="0"]').addClass('active');
			$inner.find('.item').eq(0).addClass('active');
	});
}

	$('body').on('submit', '#form-search', function(e){
		e.preventDefault();

		var query = $(this).find('[name=query]').val();
		// console.log(query);

		requestVideo(query);
	});
})(jQuery);