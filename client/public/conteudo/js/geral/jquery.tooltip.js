/*
 * Plug-in jQuery para Tooltips
 *
 * Criado através da modificação/customização do seguinte plug-in:
 *
 * 		jQuery Tooltip plugin 1.3
 *
 * 		http://bassistance.de/jquery-plugins/jquery-plugin-tooltip/
 * 		http://docs.jquery.com/Plugins/Tooltip
 *
 * 		Copyright (c) 2006 - 2008 Jörn Zaefferer
 *
 * 		$Id: jquery.tooltip.js 5741 2008-06-21 15:22:16Z joern.zaefferer $
 * 
 * 		Dual licensed under the MIT and GPL licenses:
 * 		  http://www.opensource.org/licenses/mit-license.php
 * 		  http://www.gnu.org/licenses/gpl.html
 */

;(function($) {
	
		// the tooltip element
	var helper = {},
		// the current tooltipped element
		current,
		// the title of the current element, used for restoring
		title,
		// IE 5.5 or 6
		IE = $.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent)
	
	$.tooltip = {
		defaults: {
			extraClass: "",
			id: "tooltip",
			left: 0,
			top: 0
		}
	};
	
	$.fn.extend({
		tooltip: function(settings) {
			settings = $.extend({}, $.tooltip.defaults, settings);
			createHelper(settings);
			return this.each(function() {
					$.data(this, "tooltip", settings);
					this.tOpacity = helper.parent.css("opacity");
					// copy tooltip into its own expando and remove the title
					this.tooltipText = this.title;
					$(this).removeAttr("title");
					// also remove alt attribute to prevent default tooltip in IE
					this.alt = "";
				})
				.mouseover(save)
				.mouseout(hide)
				.click(hide);
		},
		fixPNG: IE ? function() {
			return this.each(function () {
				var image = $(this).css('backgroundImage');
				if (image.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
					image = RegExp.$1;
					$(this).css({
						'backgroundImage': 'none',
						'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"
					}).each(function () {
						var position = $(this).css('position');
						if (position != 'absolute' && position != 'relative')
							$(this).css('position', 'relative');
					});
				}
			});
		} : function() { return this; },
		unfixPNG: IE ? function() {
			return this.each(function () {
				$(this).css({'filter': '', backgroundImage: ''});
			});
		} : function() { return this; },
		hideWhenEmpty: function() {
			return this.each(function() {
				$(this)[ $(this).html() ? "show" : "hide" ]();
			});
		}
	});
	
	function createHelper(settings) {
		// there can be only one tooltip helper
		if (helper.parent)
			return;
			
	    var aux;
		if (window.top != window) {
		    aux = window.top.document;
		}
		else {
		    aux = document;
		}

		var $helper = $("#" + settings.id, aux);
		if ($helper.length > 0) {
			helper.parent = $helper.hide();
		}
		else {
			// create the helper, h3 for title, div for url
			helper.parent = $('<div style="word-wrap:break-word;" id="' + settings.id + '"><h3></h3><div class="tooltip_seta"><!-- --></div></div>', aux)
	    		// add to document
	    		.appendTo(aux.body)
				// hide it at first
				.hide();

			// apply bgiframe if available
			if ( $.fn.bgiframe )
				helper.parent.bgiframe();
		}
		
		// save references to title and url elements
		helper.title = $('h3', helper.parent);
		helper.seta = $('div.tooltip_seta', helper.parent);
	}
	
	function settings(element) {
		return $.data(element, "tooltip");
	}
	
	function render(event) {

		var right = "auto";
		var left = 0;
		var top = 0;
		var offsetFrame;
		var width;
		var offsetIE8 = 0;

		if ($.browser.msie && /MSIE\s(8\.)/.test(navigator.userAgent)) {
			if ($(this).is("sup"))
				offsetIE8 = -10;
		}

		helper.seta.css({left: 20});
		
		width = helper.parent[0].offsetWidth;
		offsetFrame = getFrameOffset(window);

		// Calcula o posicionamento do tooltip
		left = event.pageX
			 - helper.seta.position().left
			 - helper.seta.width()
			 + settings(current).left 
			 + offsetFrame.left;
		
		top = $(this).offset().top 
			- helper.parent[0].offsetHeight 
			- helper.seta.height() 
			+ settings(current).top 
			+ offsetFrame.top 
			+ offsetIE8;
		
		helper.parent.css({
			left: left,
			right: right,
			top: top
		});

		// Verifica se "achatou" porque estava muito próximo da borda do browser
		if (helper.parent[0].offsetWidth < width) {
			var dif = width - helper.parent[0].offsetWidth;
			helper.seta.css({left: helper.seta.position().left + dif});
			left = left - dif;
			helper.parent.css({
				left: left,
				right: right,
				top: top
			});
		}

		// Calcula o top de novo, caso tenha sido redimensionado automaticamente por estar no limite da janela
		var newtop = $(this).offset().top
				   - helper.parent[0].offsetHeight
				   - helper.seta.height()
				   + settings(current).top
				   + offsetFrame.top
				   + offsetIE8;
		if (newtop != top) {
			helper.parent.css({
				left: left,
				right: right,
				top: newtop
			});
		}

	}
	
	// save elements title before the tooltip is displayed
	function save() {
		if (!this.tooltipText)
			return;

		// save current
		current = this;
		title = this.tooltipText;
		
		helper.title.html(title).show();
		
		// add an optional class for this tip
		helper.parent.addClass(settings(this).extraClass);

		// fix PNG background for IE
		if (settings(this).fixPNG )
			helper.parent.fixPNG();
			
		helper.parent.show();

		// Força uma renderização, pois senão o offsetHeight e offsetWidth podem vir com valor inválido
		helper.parent.css({
			left: 0,
			right: "auto",
			top: 0
		});
		render.apply(this, arguments);

		$(this).bind("mousemove", update);
		
	}
	
	function update() {
		// if no current element is available, remove this listener
		if(current == null) {
			$(this).unbind("mousemove", update);
			return;	
		}
		render.apply(this, arguments);
	}
	
	// hide helper and restore added classes and the title
	function hide(event) {
		// no more current element
		current = null;
		
		var tsettings = settings(this);
		function complete() {
			helper.parent.removeClass( tsettings.extraClass ).hide().css("opacity", "");
		}
		complete();
		
		if( settings(this).fixPNG )
			helper.parent.unfixPNG();
	}

	function getFrameOffset(janela) {
		var left, top;

		try {
			if (janela.parent != janela) {
				var $iframe = $("[name='" + janela.name + "']", janela.parent.document);
				var frameOffset = getTotalOffset($iframe.get(0));
			    var parentOffset = getFrameOffset(janela.parent);

			    left = frameOffset.left + parentOffset.left;
			    top = frameOffset.top + parentOffset.top;
			}
			else {
				left = 0;
				top = 0;
			}
		}
		catch (err) {
			left = 0;
			top = 0;
		}

		return {left: left, top: top};
	}

	// Função para obter o offset total de um elemento. Utilizada em vez da função offset() do jQuery
	// pois para o modal estava retornando valores errados.
	function getTotalOffset(el) {
		var left = el.offsetLeft;
		var top = el.offsetTop;
		if (el.offsetParent != null) {
			var parentOffset = getTotalOffset(el.offsetParent);
			left = left + parentOffset.left;
			top = top + parentOffset.top;
		}
		return {left: left, top: top}
	}

	function getWindowScroll(janela) {
		var x = 0, y = 0;
		if (typeof(janela.pageYOffset) == 'number') {
			//Netscape compliant
	    	x = janela.pageXOffset;
	    	y = janela.pageYOffset;
		}
		else if (janela.document.body && (janela.document.body.scrollLeft || janela.document.body.scrollTop)) {
			//DOM compliant
			x = janela.document.body.scrollLeft;
			y = janela.document.body.scrollTop;
		}
		else if (janela.document.documentElement && (janela.document.documentElement.scrollLeft || janela.document.documentElement.scrollTop)) {
	    	//IE6 standards compliant mode
			x = janela.document.documentElement.scrollLeft;
			y = janela.document.documentElement.scrollTop;
		}
		return {left: x, top: y};
	}

})(jQuery);
