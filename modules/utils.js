(function() {

	/*
	Hide bootstrap navbar on scroll
	 */
	window.onscroll = function() {
		if (window.pageYOffset < 60) {
			$('.navbar').fadeIn();
		} else {
			$('.navbar').fadeOut();
		}
	};


})();