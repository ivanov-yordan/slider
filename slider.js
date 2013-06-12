;(function ($, window, document, undefined) {
	var pluginName = 'slider';
	var defaults = {
		activeClass: '',
		linksHolderClass: 'links',
		changeDelay: '10000',
		changeSpeed: '200'
	};

	function Plugin(element, options) {
		this.element = element;
		this.$element = $(element);
		this.options = $.extend({}, defaults, options);

		this.activeSlide = 1;
		this.slideTimeout = null;

		this.init();
	}

	Plugin.prototype.init = function() {
		this.$element.css('list-style-type', 'none');
		this.$element.find('li').hide();

		var linksHolder = $('<ul>');
		linksHolder.addClass(this.options.linksHolderClass);

		var that = this;
		this.$element.find('li').each(function(index, item) {
			var link = $('<a>').attr({
				href: 'javascript:void(0);',
				'data-slide': index + 1
			}).text(index + 1);

			link.on('click', function() {
				that.slide(index + 1);
			});

			var li = $('<li>').append(link).appendTo(linksHolder);
			li.css('display', 'inline-block');
		});

		linksHolder.css('list-style-type', 'none');

		this.$element.wrap('<div>');
		this.$element.parent().append(linksHolder);

		this.slide(1);
	};


	Plugin.prototype.slide = function(slide) {
		var that = this;
		if(this.slideTimeout) {
			clearTimeout(this.slideTimeout);
		}

		this.$element.find('li:nth-child(' + this.activeSlide + ')').fadeOut(this.changeSpeed, function() {
			that.$element.find('li:nth-child(' + slide + ')').fadeIn(that.changeSpeed);
		});

		this.$element.parent().find('a.' + this.options.activeClass).removeClass(this.options.activeClass);
		this.$element.parent().find('a[data-slide=' + slide + ']').addClass(this.options.activeClass);

		this.activeSlide = slide;
		this.slideTimeout = setTimeout(function() {
			if(that.activeSlide === that.$element.find('li').length) {
				slide = 0;
			}

			that.slide(slide + 1);
		}, this.options.changeDelay);
	};


	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if(!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	};
})(jQuery, window, document);