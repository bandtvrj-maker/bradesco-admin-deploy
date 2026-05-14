		var carousel = {
			'jcarouselIndex': undefined,
			'jcarouselMaxIndex': undefined,
			'prev': function() {
				if(this.jcarouselIndex > 1) {
					this.jcarouselIndex--;
					this.showCurrent();
				}
			},
			'next': function() {
				if(this.jcarouselIndex < this.jcarouselMaxIndex) {
					this.jcarouselIndex++;
					this.showCurrent();
				}
			},
			'showCurrent': function() {
				jQuery('.jcarousel-item').fadeOut(200);
				jQuery('.jcarousel-item-' + this.jcarouselIndex).fadeIn(200);
				jQuery('.jcarousel-control').removeClass('jcarousel-control-inactive');
				if(this.jcarouselIndex == 1) {
					jQuery('.jcarousel-control-prev').addClass('jcarousel-control-inactive');
				} else if(this.jcarouselIndex == this.jcarouselMaxIndex) {
					jQuery('.jcarousel-control-next').addClass('jcarousel-control-inactive');
				}
			},
			'init': function(callback) {
				jQuery('.jcarousel').jcarousel();
				
				jQuery('.jcarousel-control-prev').click(function () {
					carousel.prev();
				});
				
				jQuery('.jcarousel-control-next').click(function () {
					carousel.next();
				});
				
				this.jcarouselIndex = 1;
				this.jcarouselMaxIndex = jQuery('.jcarousel-item').size();
				
				jQuery('.jcarousel-control-prev').addClass('jcarousel-control-inactive');
				
				if(typeof callback !== 'undefined'){
				     callback();
				};
			}
		}

