(function ($) { "use strict";
$(document).ready(function () {
    
var templateSettings = {

	initialized: false,

	init: function() {
		
		var $tis = this;

		if ($tis.initialized){ 
			return;
		}
		
		$tis.initialized = true;

		/**
		 * Append minicolors CSS
		 */
		$('head').append('<link href="js/settings/settings.css" rel="stylesheet" type="text/css" />');
		$('head').append('<link href="js/settings/jquery.minicolors.min.css" rel="stylesheet" type="text/css" />');
        
        var panel_html = '<div id="template-settings">' +
                '<i class="fa fa-cog"></i>' +
                '<h4>Color: *</h4>' +
                '<input class="minicolors" type="text" name="color-picker" value="02baa6" />' +
                '<h4>PATTERN:</h4>' +
                '<div class="settings-pattern">' +
                '    <span class="pattern2_icon selected" id="pattern2"></span>' +
                '    <span class="pattern1_icon" id="pattern1"></span>	' +	
                '    <span class="pattern3_icon" id="pattern3"></span>' +
                '    <span class="pattern4_icon" id="pattern4"></span>' +
                '    <span class="pattern5_icon" id="pattern5"></span>' +
                '    <span class="pattern6_icon" id="pattern6"></span>' +
                '    <span class="pattern7_icon" id="pattern7"></span>' +
                '    <span class="pattern8_icon" id="pattern8"></span>' +
                '    <span class="pattern9_icon" id="pattern9"></span>' +
                '    <span class="pattern10_icon" id="pattern10"></span>' +
                '</div>' +
                '<div>* May not be fully accurate!</div>' +
            '</div>';
        
		/**
		 * Get minicolors Script
		 */
		$.getScript("js/settings/jquery.minicolors.js", function() {
            $("#wrapper").after(panel_html);
			$tis.construct();
			$tis.events();
		}).fail(function() {
			alert( "Failed to load Template Settings Panel!" );
		});
	},

	construct: function() {
		
		var $tis = this;
		
		$('.minicolors').minicolors({
			theme: 'bootstrap',
			change: function(hex){ 
						$tis.configColor(hex); 
					}
		});
	},

	events: function() {
		
		var $tis = this;
		
		/**
		 * Template Settings Panel Open/Close
		 */
		var opened = false;
		$("#template-settings>i").click(function(){
			if (opened){
				$('#template-settings').animate({left: '-188px'}, 400, 'easeInExpo');
				opened = false;
			}else{
				$('#template-settings').animate({left: '0px'}, 400, 'easeOutExpo');
				opened = true;
			}
		});
		
		/**
		 * Patterns
		 */
		$(".settings-pattern span").click(function(){
			$tis.setPattern($(this), $(this).attr("id"));
		});
	},

	configColor: function(clr) {
        var $tis = this;
        
		$tis.convertHex(clr, 90);
		
        $('#custom_color').remove();
		$('head').append('<style type="text/css" id="custom_color" />');

		$('#custom_color').html(
			'h1,h2,h3,h4,h5,h6,.color,a,a:focus,a:hover,.btn-default,.btn-default:focus,.btn-color.active,.btn-color:active,.btn-color:hover,.open .dropdown-toggle.btn-color,.btn-light.active,.btn-light:active,.btn-light:hover,.open .dropdown-toggle.btn-light,.owl-carousel>.owl-nav .owl-next,.owl-carousel>.owl-nav .owl-prev,.grid-style .item .image>a i:hover,.list-style .item .image>a i:hover,.grid-style .item .image .gallery-info a:hover,.list-style .item .image .gallery-info a:hover,.grid-style .item>.info-blog h3 a:hover,.list-style .item>.info-blog h3 a:hover,.grid-style .item .top-info li a:hover,.list-style .item .top-info li a:hover,#top-bar a:focus,#top-bar a:hover,.search-wrap .btn-search:hover,.sb-icon-search:hover,.nav .open>a,.nav .open>a:focus,.nav .open>a:hover,.nav>li>a:focus,.nav>li>a:hover,.navbar-nav>li>a.active,.navbar-nav .dropdown-menu>li>a.active,.navbar-nav .dropdown-menu>li>a:focus,.navbar-nav .dropdown-menu>li>a:hover,.nav-mobile a:hover,.icon-button:hover,.services .item i,.services .item:hover h3,.services-2 .item i,.carousel-style-1 .item i:hover,.carousel-style-2 .item:hover i,.app-features .item-left i:hover,.app-features .item-left:hover i,.app-features .item-right i:hover,.app-features .item-right:hover i,.instagram>.btn,.marker:hover,.testimonials-2 .item .author>div .rating,.panel-group .panel .panel-heading .panel-title>a,.panel-group .panel .panel-heading .panel-title>a::after,.panel-group .panel .panel-heading .panel-title>a:hover,.panel-group .panel .panel-heading .panel-title>a:hover:after,.gray .sidebar .panel-group .panel .panel-heading .panel-title>a,.sidebar.gray .panel-group .panel .panel-heading .panel-title>a,.team-grid .item .image .social-networks li a:hover,.team-grid>li .image .social-networks li a:hover,.meta-attributes li .attr-detail a:hover,#gallery-grid-header a.active,#gallery-grid-header a:hover,.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:focus,.nav-tabs.nav-justified>.active>a:hover,.nav-tabs>li.active>a,.nav-tabs>li.active>a:focus,.nav-tabs>li.active>a:hover,.pricing-2 li,.pricing-2 li i,.pricing-2 li h4,.e404>div,.e404 i,.blog-metas li a:hover,.widget.widget_categories ul li a:hover,.widget.widget_categories ul li a:hover span,.widget.widget_categories ul li:hover:before,.widget.widget_archives .panel-group .panel .panel-body ul li a:hover,.widget.widget_archives .panel-group .panel .panel-body ul li:hover:before,.widget.widget_recent_entries>ul>li h3 a:hover,.widget.widget_tags ul li a:hover,.pagination ul li.active a,.pagination ul li:hover a,.pagination #next a:hover,.pagination #previous a:hover,#footer-top a:hover,.footer-links li a:hover,.social-networks.color li a,.panel-group .panel .panel-heading .panel-title > a:hover::after {color:' + clr + ';}'+
			'.owl-carousel .owl-dots .owl-dot.active span,.owl-carousel .owl-dots .owl-dot:hover span,.bizzie.tparrows:hover,.services .item i::after,.btn-color,.btn-color:focus,.btn-default.active,.btn-default:active,.btn-default:hover,.open .dropdown-toggle.btn-default,.section-title:before,.text-highlight,.owl-carousel>.owl-nav .owl-next:hover,.owl-carousel>.owl-nav .owl-prev:hover,#nav-mobile-btn,#home-agency-hero .slider-title::after,.action-box,.pattern-bg.colored-bg:before,.pattern-bg.gradient-bg:before,.action-box:before,.colored-bg:before,.content.colored::before,.content.gray::before,.carousel-style-2 .item:hover,.gallery-wrapper .gallery-left,.gallery-wrapper .gallery-right,.gallery-scroller li::after,.gallery-scroller li>span .fa:hover,.gallery-scroller li>span i:hover,.marker,#newsletter .input-group-btn .btn-light,.sidebar.colored,.offices-grid .item .tag,.offices-grid>li .tag,.team-grid .item .tag,.team-grid>li .tag,#gallery-detail-large .item .price,#gallery-detail-thumbs .item:after,.pricing .item .btn:hover,.pricing .item.featured .btn,.pricing .item.featured header,.pricing .item:hover header,.pricing-2 li:hover::before,#footer .to-top:hover,.social-networks.color li a:hover,a.pp_next,a.pp_previous,div.bizzie .pp_details {background-color:' + clr + ';}'+
			'.btn-default,.btn-default:focus,.btn-color,.btn-color:focus,.btn-default.active,.btn-default:active,.btn-default:hover,.open .dropdown-toggle.btn-default,.btn-color.active,.btn-color:active,.btn-color:hover,.open .dropdown-toggle.btn-color,.icon-button:hover,.panel-group .panel .panel-heading .panel-title>a:hover:after,.pricing .item .btn:hover,.pricing .item.featured .btn,.pricing .item.featured header,.pricing .item:hover header,.pricing .item.featured>ul,.pricing .item:hover>ul,.pricing .item.featured>ul,.widget.widget_tags ul li a:hover,.pagination #next a:hover,.pagination #previous a:hover,.social-networks.color li a,#footer .to-top,.services .item i,.owl-carousel > .owl-nav .owl-prev, .owl-carousel > .owl-nav .owl-next,.owl-carousel .owl-dots .owl-dot span,.marker,.panel-group .panel .panel-heading .panel-title > a:hover::after {border-color:' + clr + ';}'+
            '.navbar-nav .dropdown-menu > li > a:hover, .navbar-nav .dropdown-menu > li > a:focus, .navbar-nav .dropdown-menu > li > a.active, .navbar-nav .dropdown-submenu:hover > a:after {border-left-color:' + clr + ';}'+
            '.pricing .item.featured .btn,.pricing .item:hover .btn {border-right-color:' + clr + ';}'+
            '.navbar-nav .dropdown-submenu:hover>a:after,.pricing .item.featured .btn,.pricing .item:hover .btn {border-left-color:' + clr + ';}'+
            '.pricing .item.featured .btn,.pricing .item:hover .btn {border-bottom-color:' + clr + ';}'+
            '.carousel-style-2 .item {background-color:' + $tis.convertHex(clr, 65) + ';}'+
            '.grid-style .item .image > a, .list-style .item .image > a,.grid-style .item .image .gallery-info, .list-style .item .image .gallery-info {background-color:' + $tis.convertHex(clr, 85) + ';}'+
            '.team-grid > li .image::before, .team-grid .item .image::before,.carousel-style-1 .item::before {background-color:' + $tis.convertHex(clr, 80) + ';}'
		);
	},

	setPattern: function(obj, pattern) {
		"use strict";
		
		$(".settings-pattern span").removeClass("selected");
		$(obj).addClass("selected");
		$(".pattern-bg").css('background-image', 'url(images/patterns/' + pattern + '.jpg)');
	},
    
    convertHex: function(hex,opacity){
        hex = hex.replace('#','');
        
        var r = parseInt(hex.substring(0,2), 16),
            g = parseInt(hex.substring(2,4), 16),
            b = parseInt(hex.substring(4,6), 16),
            result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
            
        return result;
    }
};

templateSettings.init();
})})(jQuery);