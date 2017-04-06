jQuery(document).ready(function ($) {

	//images padding
	$('.typography img').each(function () {
		if ($(this).css('float') == 'left') {
			$(this).css({
				marginRight: '1em'
			})
		} else if ($(this).css('float') == 'right') {
			$(this).css({
				marginLeft: '1em'
			})
		}
	});

	//remove empty <p> tags
	$('.typography p').filter(function () {
		return $.trim($(this).text()) === '' && $(this).children().length == 0
	}).remove();

	//srcollable tables
	function srcollableTables() {
		$('.typography table').each(function () {
			if ($(this).width() >= ($(window).width() - $('.js-sticky-sidebar').width())) {
				$(this).css({
					display: 'block'
				})
			} else {
				$(this).css({
					display: 'table'
				})
			}
		});
	}
	srcollableTables();
	$(window).resize(function () {
		srcollableTables();
	});

});