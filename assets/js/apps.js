/* Validation form */
validateForm('validation-newsletter');
validateForm('validation-cart');
validateForm('validation-user');
validateForm('validation-contact');

/* Lazys */
NN_FRAMEWORK.Lazys = function () {
	if (isExist($('.lazy'))) {
		var lazyLoadInstance = new LazyLoad({
			elements_selector: '.lazy'
		});
	}
};

/* Load name input file */
NN_FRAMEWORK.loadNameInputFile = function () {
	if (isExist($('.custom-file input[type=file]'))) {
		$('body').on('change', '.custom-file input[type=file]', function () {
			var fileName = $(this).val();
			fileName = fileName.substr(fileName.lastIndexOf('\\') + 1, fileName.length);
			$(this).siblings('label').html(fileName);
		});
	}
};

/* Back to top */
NN_FRAMEWORK.GoTop = function () {
	$(document).ready(function() {
		"use strict";
		var progressPath = document.querySelector('.scrollToTop path');
		var pathLength = progressPath.getTotalLength();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
		var updateProgress = function() {
			var scroll = $(window).scrollTop();
			var height = $(document).height() - $(window).height();
			var progress = pathLength - (scroll * pathLength / height);
			progressPath.style.strokeDashoffset = progress;
		};
		updateProgress();
		$(window).scroll(updateProgress);
		var offset = 150;
		var duration = 550;
		$(window).on('scroll', function() {
			if ($(this).scrollTop() > offset) {
				$('.scrollToTop').addClass('active-progress');
			} else {
				$('.scrollToTop').removeClass('active-progress');
			}
		});
		$('.scrollToTop').on('click', function(event) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: 0
			}, duration);
			return false;
		});
	});
};

/* Alt images */
NN_FRAMEWORK.AltImg = function () {
	$('img').each(function (index, element) {
		if (!$(this).attr('alt') || $(this).attr('alt') == '') {
			$(this).attr('alt', WEBSITE_NAME);
		}
	});
};

/* Menu */
NN_FRAMEWORK.Menu = function () {
	/* Menu remove empty ul */
	if (isExist($('.menu'))) {
		$('.menu ul li a').each(function () {
			$this = $(this);

			if (!isExist($this.next('ul').find('li'))) {
				$this.next('ul').remove();
				$this.removeClass('has-child');
			}
		});
	}

	/* Menu fixed */
    if(isExist($(".header")))
    {
        $(window).scroll(function(){
            var height_scrol_fix = $(".header").outerHeight();
            if($(window).scrollTop() >= height_scrol_fix){$(".menu-res").addClass('fixed-res')}
            else { $(".menu-res").removeClass('fixed-res')}
    
            if($(window).scrollTop() >= height_scrol_fix){ $(".menu").addClass('fixed'); $(".menu").removeClass('no-fixed');}
            else { $(".menu").removeClass('fixed'); $(".menu").addClass('no-fixed'); }
        });
    }

};

/* Tools */
NN_FRAMEWORK.Tools = function () {
	if (isExist($('.toolbar'))) {
		$('.footer').css({ marginBottom: $('.toolbar').innerHeight() });
	}
	$('body').on('click', '.scrollToTop, .scrollToTopMobile', function () {
		$('html, body').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	$(".toolbar .phone").click(function (e) {
		e.stopPropagation();
		$(".toolbar").toggleClass('is-active');
	});
	$(document).click(function () {
		$(".toolbar").removeClass('is-active');
	});
	$(window).scroll(function () {
		var ex6Exists = $('.ex6').length > 0;
		if ($(this).scrollTop() > 100) {
			if (!ex6Exists) {
				$('.toolbar .scrollToTopMobile').addClass('ex6');
			}
		} else {
			$('.toolbar .scrollToTopMobile').removeClass('ex6');
		}
	});
};

/* Popup */
NN_FRAMEWORK.Popup = function () {
	if (isExist($('#popup'))) {
		$('#popup').modal('show');
	}
};

/* Wow */
NN_FRAMEWORK.Wows = function () {
	new WOW().init();
};

/* Pagings */
NN_FRAMEWORK.Pagings = function () {
	/* Products */
	if (isExist($('.paging-product'))) {
		loadPaging('api/product.php?perpage=8', '.paging-product');
	}

	/* Categories */
	if (isExist($('.paging-product-category'))) {
		$('.paging-product-category').each(function () {
			var list = $(this).data('list');
			loadPaging('api/product.php?perpage=8&idList=' + list, '.paging-product-category-' + list);
		});
	}

	/* Categories list*/
	if(isExist($(".title-product-list a")))
    {
        $(".title-product-list a").click(function(){
        $(this).parents(".title-product-list").find("a.active").removeClass("active");
        $(this).addClass("active");
        //
        var list = $(this).data("list");
        	loadPaging("api/product.php?perpage=8&idList="+list,'.paging-product-category');
        });

        $(".title-product-list").each(function(){
            var list = $(this).find("a.active").data("list");
            loadPaging("api/product.php?perpage=8&idList="+list,'.paging-product-category');
        });
    }

	/* Categories list cat*/
	if(isExist($(".title-product-cat a")))
    {
        $(".title-product-cat a").click(function(){
        $(this).parents(".title-product-cat").find("a.active").removeClass("active");
        $(this).addClass("active");
        //
        var list = $(this).data("list");
        var cat = $(this).data("cat");
        	loadPaging("api/product.php?perpage=8&idList="+list+"&idCat="+cat,'.paging-product-category-'+list);
        });

        $(".title-product-cat").each(function(){
            var list = $(this).find("a.active").data("list");
            var cat = $(this).find("a.active").data("cat");
            
            loadPaging("api/product.php?perpage=8&idList="+list+"&idCat="+cat,'.paging-product-category-'+list);
        });
    }
};

/* Ticker scroll */
NN_FRAMEWORK.TickerScroll = function () {
	if (isExist($('.news-scroll'))) {
		$('.news-scroll')
			.easyTicker({
				direction: 'up',
				easing: 'swing',
				speed: 'slow',
				interval: 3500,
				height: '440',
				visible: 3,
				mousePause: true,
				controls: {
					up: '.news-control#up',
					down: '.news-control#down'
					// toggle: '.toggle',
					// stopText: 'Stop'
				},
				callbacks: {
					before: function (ul, li) {
						// $(li).css('color', 'red');
					},
					after: function (ul, li) {}
				}
			})
			.data('easyTicker');
	}
};

/* Photobox */
NN_FRAMEWORK.Photobox = function () {
	if (isExist($('.album-gallery'))) {
		$('.album-gallery').photobox('a', { thumbs: true, loop: false });
	}
};

/* Comment */
NN_FRAMEWORK.Comment = function () {
	if (isExist($('.comment-page'))) {
		$('.comment-page').comments({
			url: 'api/comment.php'
		});
	}
};

/* DatePicker */
NN_FRAMEWORK.DatePicker = function () {
	if (isExist($('#birthday'))) {
		$('#birthday').datetimepicker({
			timepicker: false,
			format: 'd/m/Y',
			formatDate: 'd/m/Y',
			minDate: '01/01/1950',
			maxDate: TIMENOW
		});
	}
};

/* Search */
NN_FRAMEWORK.Search = function () {
	if (isExist($('.icon-search'))) {
		$('.icon-search').click(function () {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$('.search-grid').stop(true, true).animate({ opacity: '0', width: '0px' }, 200);
			} else {
				$(this).addClass('active');
				$('.search-grid').stop(true, true).animate({ opacity: '1', width: '230px' }, 200);
			}
			document.getElementById($(this).next().find('input').attr('id')).focus();
			$('.icon-search i').toggleClass('fa fa-search fa fa-times');
		});
	}
};

/* Videos */
NN_FRAMEWORK.Videos = function () {
	if (isExist($('[data-fancybox="video"]'))) {
		$('[data-fancybox="video"]').fancybox({
			transitionEffect: 'fade',
			transitionDuration: 800,
			animationEffect: 'fade',
			animationDuration: 800,
			arrows: true,
			infobar: false,
			toolbar: true,
			hash: false
		});
	}
};

/* Owl Data */
NN_FRAMEWORK.OwlData = function (obj) {
	if (!isExist(obj)) return false;
	var items = obj.attr('data-items');
	var rewind = Number(obj.attr('data-rewind')) ? true : false;
	var autoplay = Number(obj.attr('data-autoplay')) ? true : false;
	var loop = Number(obj.attr('data-loop')) ? true : false;
	var lazyLoad = Number(obj.attr('data-lazyload')) ? true : false;
	var mouseDrag = Number(obj.attr('data-mousedrag')) ? true : false;
	var touchDrag = Number(obj.attr('data-touchdrag')) ? true : false;
	var animations = obj.attr('data-animations') || false;
	var smartSpeed = Number(obj.attr('data-smartspeed')) || 800;
	var autoplaySpeed = Number(obj.attr('data-autoplayspeed')) || 800;
	var autoplayTimeout = Number(obj.attr('data-autoplaytimeout')) || 5000;
	var dots = Number(obj.attr('data-dots')) ? true : false;
	var responsive = {};
	var responsiveClass = true;
	var responsiveRefreshRate = 200;
	var nav = Number(obj.attr('data-nav')) ? true : false;
	var navContainer = obj.attr('data-navcontainer') || false;
	var navTextTemp =
		"<svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-arrow-narrow-left' width='50' height='37' viewBox='0 0 24 24' stroke-width='1' stroke='#ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><line x1='5' y1='12' x2='19' y2='12' /><line x1='5' y1='12' x2='9' y2='16' /><line x1='5' y1='12' x2='9' y2='8' /></svg>|<svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-arrow-narrow-right' width='50' height='37' viewBox='0 0 24 24' stroke-width='1' stroke='#ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><line x1='5' y1='12' x2='19' y2='12' /><line x1='15' y1='16' x2='19' y2='12' /><line x1='15' y1='8' x2='19' y2='12' /></svg>";
	var navText = obj.attr('data-navtext');
	navText =
		nav &&
		navContainer &&
		(((navText === undefined || Number(navText)) && navTextTemp) ||
			(isNaN(Number(navText)) && navText) ||
			(Number(navText) === 0 && false));

	if (items) {
		items = items.split(',');

		if (items.length) {
			var itemsCount = items.length;

			for (var i = 0; i < itemsCount; i++) {
				var options = items[i].split('|'),
					optionsCount = options.length,
					responsiveKey;

				for (var j = 0; j < optionsCount; j++) {
					const attr = options[j].indexOf(':') ? options[j].split(':') : options[j];

					if (attr[0] === 'screen') {
						responsiveKey = Number(attr[1]);
					} else if (Number(responsiveKey) >= 0) {
						responsive[responsiveKey] = {
							...responsive[responsiveKey],
							[attr[0]]: (isNumeric(attr[1]) && Number(attr[1])) ?? attr[1]
						};
					}
				}
			}
		}
	}

	if (nav && navText) {
		navText = navText.indexOf('|') > 0 ? navText.split('|') : navText.split(':');
		navText = [navText[0], navText[1]];
	}

	obj.owlCarousel({
		rewind,
		autoplay,
		loop,
		lazyLoad,
		mouseDrag,
		touchDrag,
		smartSpeed,
		autoplaySpeed,
		autoplayTimeout,
		dots,
		nav,
		navText,
		navContainer: nav && navText && navContainer,
		responsiveClass,
		responsiveRefreshRate,
		responsive
	});

	if (autoplay) {
		obj.on('translate.owl.carousel', function (event) {
			obj.trigger('stop.owl.autoplay');
		});

		obj.on('translated.owl.carousel', function (event) {
			obj.trigger('play.owl.autoplay', [autoplayTimeout]);
		});
	}

	if (animations && isExist(obj.find('[owl-item-animation]'))) {
		var animation_now = '';
		var animation_count = 0;
		var animations_excuted = [];
		var animations_list = animations.indexOf(',') ? animations.split(',') : animations;

		obj.on('changed.owl.carousel', function (event) {
			$(this).find('.owl-item.active').find('[owl-item-animation]').removeClass(animation_now);
		});

		obj.on('translate.owl.carousel', function (event) {
			var item = event.item.index;

			if (Array.isArray(animations_list)) {
				var animation_trim = animations_list[animation_count].trim();

				if (!animations_excuted.includes(animation_trim)) {
					animation_now = 'animate__animated ' + animation_trim;
					animations_excuted.push(animation_trim);
					animation_count++;
				}

				if (animations_excuted.length == animations_list.length) {
					animation_count = 0;
					animations_excuted = [];
				}
			} else {
				animation_now = 'animate__animated ' + animations_list.trim();
			}
			$(this).find('.owl-item').eq(item).find('[owl-item-animation]').addClass(animation_now);
		});
	}
};

/* Owl Page */
NN_FRAMEWORK.OwlPage = function () {
	if (isExist($('.owl-page'))) {
		$('.owl-page').each(function () {
			NN_FRAMEWORK.OwlData($(this));
		});
	}
};

/* Dom Change */
NN_FRAMEWORK.DomChange = function () {
	/* Video Fotorama */
	$('#video-fotorama').one('DOMSubtreeModified', function () {
		$('#fotorama-videos').fotorama();
	});

	/* Video Select */
	$('#video-select').one('DOMSubtreeModified', function () {
		$('.listvideos').change(function () {
			var id = $(this).val();
			$.ajax({
				url: 'api/video.php',
				type: 'POST',
				dataType: 'html',
				data: {
					id: id
				},
				beforeSend: function () {
					holdonOpen();
				},
				success: function (result) {
					$('.video-main').html(result);
					holdonClose();
				}
			});
		});
	});

	/* Chat Facebook */
	$('#messages-facebook').one('DOMSubtreeModified', function () {
		$('.js-facebook-messenger-box').on('click', function () {
			$('.js-facebook-messenger-box, .js-facebook-messenger-container').toggleClass('open'),
				$('.js-facebook-messenger-tooltip').length && $('.js-facebook-messenger-tooltip').toggle();
		}),
			$('.js-facebook-messenger-box').hasClass('cfm') &&
				setTimeout(function () {
					$('.js-facebook-messenger-box').addClass('rubberBand animated');
				}, 3500),
			$('.js-facebook-messenger-tooltip').length &&
				($('.js-facebook-messenger-tooltip').hasClass('fixed')
					? $('.js-facebook-messenger-tooltip').show()
					: $('.js-facebook-messenger-box').on('hover', function () {
							$('.js-facebook-messenger-tooltip').show();
					  }),
				$('.js-facebook-messenger-close-tooltip').on('click', function () {
					$('.js-facebook-messenger-tooltip').addClass('closed');
				}));
		$('.search_open').click(function () {
			$('.search_box_hide').toggleClass('opening');
		});
	});
};

/* Cart */
NN_FRAMEWORK.Cart = function () {
	/* Add */
	$('body').on('click', '.addcart', function () {
		$this = $(this);
		$parents = $this.parents('.right-pro-detail');
		var id = $this.data('id');
		var action = $this.data('action');
		var quantity = $parents.find('.quantity-pro-detail').find('.qty-pro').val();
		quantity = quantity ? quantity : 1;

		var color = ($this.data('color')) ? $this.data('color') : $parents.find('.color-block-pro-detail').find('.color-pro-detail input:checked').val();
		color = color ? color : 0;
		var size = ($this.data('size')) ? $this.data('size') : $parents.find('.size-block-pro-detail').find('.size-pro-detail input:checked').val();
		size = size ? size : 0;

		if (id) {
			$.ajax({
				url: 'api/cart.php',
				type: 'POST',
				dataType: 'json',
				async: false,
				data: {
					cmd: 'add-cart',
					id: id,
					color: color,
					size: size,
					quantity: quantity
				},
				beforeSend: function () {
					holdonOpen();
				},
				success: function (result) {
					if (action == 'addnow') {
						$('.count-cart').html(result.max);
						$.ajax({
							url: 'api/cart.php',
							type: 'POST',
							dataType: 'html',
							async: false,
							data: {
								cmd: 'popup-cart'
							},
							success: function (result) {
								$('#popup-cart .modal-body').html(result);
								$('#popup-cart').modal('show');
								NN_FRAMEWORK.Lazys();
								holdonClose();
							}
						});
					} else if (action == 'buynow') {
						window.location = CONFIG_BASE + 'gio-hang';
					}
				}
			});
		}
	});

	/* Delete */
	$('body').on('click', '.del-procart', function () {
		confirmDialog('delete-procart', LANG['delete_product_from_cart'], $(this));
	});

	/* Counter */
	$('body').on('click', '.counter-procart', function () {
		var $button = $(this);
		var quantity = 1;
		var input = $button.parent().find('input');
		var id = input.data('pid');

		var color = input.data('color');
		var size = input.data('size');

		var code = input.data('code');
		var oldValue = $button.parent().find('input').val();
		if ($button.text() == '+') quantity = parseFloat(oldValue) + 1;
		else if (oldValue > 1) quantity = parseFloat(oldValue) - 1;
		$button.parent().find('input').val(quantity);
		updateCart(id, code, quantity, color, size);
	});

	/* Quantity */
	$('body').on('change', 'input.quantity-procart', function () {
		var quantity = $(this).val() < 1 ? 1 : $(this).val();
		$(this).val(quantity);
		var id = $(this).data('pid');
		var color = $(this).data('color');
		var size = $(this).data('size');
		var code = $(this).data('code');
		updateCart(id, code, quantity, color, size);
	});

	/* City */
	if (isExist($('.select-city-cart'))) {
		$('.select-city-cart').change(function () {
			var id = $(this).val();
			loadDistrict(id);
			loadShip();
		});
	}

	/* District */
	if (isExist($('.select-district-cart'))) {
		$('.select-district-cart').change(function () {
			var id = $(this).val();
			loadWard(id);
			loadShip();
		});
	}

	/* Ward */
	if (isExist($('.select-ward-cart'))) {
		$('.select-ward-cart').change(function () {
			var id = $(this).val();
			loadShip(id);
		});
	}

	/* Payments */
	if (isExist($('.payments-label'))) {
		$('.payments-label').click(function () {
			var payments = $(this).data('payments');
			$('.payments-cart .payments-label, .payments-info').removeClass('active');
			$(this).addClass('active');
			$('.payments-info-' + payments).addClass('active');
		});
	}

	/* Colors */
	if (isExist($('.color-pro-detail'))) {
		$('.color-pro-detail input').click(function () {
			$this = $(this).parents('label.color-pro-detail');
			$parents = $this.parents('.attr-pro-detail');
			$parents_detail = $this.parents('.grid-pro-detail');
			$parents.find('.color-block-pro-detail').find('.color-pro-detail').removeClass('active');
			$parents.find('.color-block-pro-detail').find('.color-pro-detail input').prop('checked', false);
			$this.addClass('active');
			$this.find('input').prop('checked', true);
			var id_color = $parents.find('.color-block-pro-detail').find('.color-pro-detail input:checked').val();
			var id_pro = $this.data('idproduct');
			var type = $this.data('type');


			$.ajax({
				url: 'api/color.php',
				type: 'POST',
				dataType: 'html',
				data: {
					id_color: id_color,
					id_pro: id_pro,
					type: type,
				},
				beforeSend: function () {
					holdonOpen();
				},
				success: function (result) {
					if (result) {
						$parents_detail.find('.left-pro-detail').html(result);
						MagicZoom.refresh('Zoom-1');
						NN_FRAMEWORK.OwlData($('.owl-pro-detail'));
						NN_FRAMEWORK.Lazys();
					}
					holdonClose();
				}
			});
		});
	}

	// Lấy giá theo màu, size
	if(CART_ADVANCED){
		function updatePrice(o) {
			var $this = o; 
			var $parents = $this.parents('.right-pro-detail');
			var id_color = $parents.find('.color-block-pro-detail').find('.color-pro-detail input:checked').val();
			var id_size = $parents.find('.size-block-pro-detail').find('.size-pro-detail input:checked').val();
			var id_pro = $this.data('idproduct');
			var type = $this.data('type');

			if (id_color > 0 || id_size > 0) {
				$.ajax({
					url: 'api/load_price.php',
					type: 'POST',
					dataType: 'html',
					data: {
						id_color: id_color,
						id_size: id_size,
						id_pro: id_pro,
						type: type
					},
					beforeSend: function () {
						holdonOpen();
					},
					success: function (result) {
						if (result) {
							$parents.find('.price_box').html(result); 
						}
						holdonClose();
					}
				});
			}
		}
		
		$('body').on('change', '.load_price', function () {
			updatePrice($(this));
		});
		
		$('.load_price').each(function () {
			updatePrice($(this));
		});
	}

	/* Sizes */
	if (isExist($('.size-pro-detail'))) {
		$('.size-pro-detail input').click(function () {
			$this = $(this).parents('label.size-pro-detail');
			$parents = $this.parents('.attr-pro-detail');
			$parents.find('.size-block-pro-detail').find('.size-pro-detail').removeClass('active');
			$parents.find('.size-block-pro-detail').find('.size-pro-detail input').prop('checked', false);
			$this.addClass('active');
			$this.find('input').prop('checked', true);
		});
	}

	/* Quantity detail page */
	if (isExist($('.quantity-pro-detail span'))) {
		$('.quantity-pro-detail span').click(function () {
			var $button = $(this);
			var oldValue = $button.parent().find('input').val();
			if ($button.text() == '+') {
				var newVal = parseFloat(oldValue) + 1;
			} else {
				if (oldValue > 1) var newVal = parseFloat(oldValue) - 1;
				else var newVal = 1;
			}
			$button.parent().find('input').val(newVal);
		});
	}
};

/* Toc */
NN_FRAMEWORK.Toc = function () {
    if(isExist($('.toc-list')))
    {
        $(".toc-list").toc({
            content: "div#toc-content",
            headings: "h2,h3,h4"
        });

        if(!$(".toc-list li").length) $(".meta-toc").hide();

        $('.toc-list').find('a').click(function(){
            var x = $(this).attr('data-rel');
            goToByScroll(x);
        });
    }
};

/**/
function f_height_fslider ()
{
    var height_fslider = $(".slideshow").outerHeight();
    $(".hdanhmucdrops .content").css("height", height_fslider);
    $(".hdanhmucdropsjs .content").css("height", height_fslider);

}

NN_FRAMEWORK.danhMucDrops = function(){
    if(isExist($(".hdanhmucdrops")))
    {
        $(".hdanhmucdrops .content > li").hover(function(){
                var vitri = $(this).position().top;
                $(this).children("ul").eq(0).css({'top':vitri+'px'});
            }, function(){});
            if(!isExist($(".hdanhmucdrops"))) {
                f_height_fslider ();
                $(window).resize(function(){
                f_height_fslider ();
            });
        }
        if(SOURCEWEB){
            $(".hdanhmucdrops").hover(function(){
                $(".hdanhmucdrops > .nicescl").stop(true,true).slideDown();
            }, function(){
                $(".hdanhmucdrops > .nicescl").hide();
            });
        }
    }

    if(isExist($(".hdanhmucdropsjs")))
    {
       
        $(".hdanhmucdropsjs .content > li").hover(function(){
            var vitri = $(this).position().top;
            $(this).children("ul").eq(0).css({'top':vitri+'px'});
        }, function(){});
        if(!isExist($(".hdanhmucdropsjs"))) {
            f_height_fslider ();
            $(window).resize(function(){
            f_height_fslider ();
        });
        }
        
    }
};

NN_FRAMEWORK.GoogleMap = function(){
	if(isExist($(".footer_map_tab .map_items")))
    {
        $(".footer_map_tab .map_items").click(function(){
        $(this).parents(".footer_map_tab").find(".map_items.active").removeClass("active");
        $(this).addClass("active");
       	 	let idMap = $(this).attr("data-map"); 
        	loadPaging("api/maps.php?idMap="+idMap,'.map_frame');
        });

        $(".footer_map_tab").each(function(){
            let idMap = $(this).find(".map_items.active").attr("data-map"); 
            loadPaging("api/maps.php?idMap="+idMap,'.map_frame');
        });
    }
};


NN_FRAMEWORK.Slick = function(){
	//Slide nav for
    /*$('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
      });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        autoplay:true,
        centerMode: true,
        centerPadding: '20px',
        focusOnSelect: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '0px',
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '0px',
              slidesToShow: 1
            }
          }
        ]
	});*/
};

/* Logo mã màu đặc biệt: monoHL, oceanHL, fireHL */
NN_FRAMEWORK.shinerLogo = function(){
    $(window).bind("load", function(){
        var api = $(".peShiner").peShiner({ api: true, paused: true, reverse: true, repeat: 1, color: 'oceanHL'});
        api.resume();
    });
};

/* Loading */
NN_FRAMEWORK.Loading = function(){
    setTimeout(function(){
        $('.mask').addClass('hideg');
        $('#loading').fadeOut();
    },0);
};


/* ShowContent */
NN_FRAMEWORK.ShowContent = function(){
	var height_ctent = $(".content_product").outerHeight();
    if(height_ctent < 450){
        $(".w-pro-detail").each(function(){
            $(this).find(".add-none").addClass("d-none");
        });
    }

	$(".w-pro-detail .btn-click").click(function(){
		$('.content_product').toggleClass("h-full");
		
		var btn_read = $('.btn_read').find("span");
		if (btn_read.html() === 'Ẩn bớt <i class="fa-regular fa-circle-chevron-up"></i>') {
			btn_read.html('Xem thêm <i class="fa-regular fa-circle-chevron-down"></i>');
		} else {
			btn_read.html('Ẩn bớt <i class="fa-regular fa-circle-chevron-up"></i>');
		}
	});
	
};



NN_FRAMEWORK.Marquees = function() {
	// data-speed="-1" scrollamount="10"
    const marquees = document.querySelectorAll("div.marquee");

    marquees.forEach(function(element) {
        let tick = 1;
        let value = element.dataset.speed;
        element.innerHTML += element.innerHTML;
        element.innerHTML += element.innerHTML;

        const innerTags = element.querySelectorAll("div.inner");
        innerTags.forEach((inner, index) => {
            inner.style.left = inner.offsetWidth * index + "px";
        });

        const ticker = function() {
            tick += parseInt(value);
            innerTags.forEach((inner, index) => {
                let width = inner.offsetWidth;
                let normalizedMarqueeX = ((tick % width) + width) % width;
                let pos = width * (index - 1) + normalizedMarqueeX;

                inner.style.left = pos + "px";
            });
            requestAnimationFrame(ticker);
        };
        ticker();
    });
};

NN_FRAMEWORK.initAll = function(){
	
	$(".box_category_list span.toggle").click(function(){
        $(this).parent().find("ul").first().slideToggle();
        // $(this).find(".fa-solid").classToggle("fa-plus");

		var i = $(this).find("span");
		if (i.html() === '<i class="fa-solid fa-minus"></i>') {
			i.html('<i class="fa-solid fa-plus"></i>');
		} else {
			i.html('<i class="fa-solid fa-minus"></i>');
		}	
    });
	
};


NN_FRAMEWORK.tabsDemo = function() {
	$(".post-tabs-demo").on("click", ".nav-demo-list-item", function(e) {
		e.preventDefault();
		$('.post-tabs-demo .nav-demo-list-item').removeClass("active");
		$(this).addClass('active');
		var i = $(this).data('id');
		$('.post-tab-content').removeClass('post-tab-show');
		$('[data-id="' + i + '"]').addClass('post-tab-show');
	});
};
NN_FRAMEWORK.btnLoading = function() {
	$('.btn-loading').on('click', function() {
		var o = $(this);
		var d = {
			id: parseInt(o.attr('data-id')),
			// rand: o.attr('data-rand'),
			show: parseInt(o.attr('data-show')),
			page: parseInt(o.attr('data-page'))
		};
		$.ajax({
			url: 'api/load_more_tabs.php',
			type: 'POST',
			dataType: 'json',
			data: d,
			beforeSend: function() {
				o.css('display', 'none');
				o.next('.lds-spinner').css('display', 'inline-block');
			},
			success: function(data) {
				setTimeout(function() {
					o.css('display', 'inline-block');
					o.next('.lds-spinner').css('display', 'none');
				}, 500);
				setTimeout(function() {
					if (data.check != 'null') {
						if (data.count < 4) {
							o.css('display', 'none');
							o.next('.lds-spinner').css('display', 'none');
						}
						var p = parseInt(o.attr('data-page'));
						o.attr('data-page', p + 1);
						// o.attr('data-rand', data.rand);
						o.parents('.post-tab-content').find('.post-portfolio').append(data.items);
						NN_FRAMEWORK.Lazys();
					} else {
						o.css('display', 'none');
						o.next('.lds-spinner').css('display', 'none');
					}
				}, 500);
			}
		});
	});
};

NN_FRAMEWORK.menuMobile = function() {
    $('body').on('click', 'span.btn-dropdown-menu', function() {
        var o = $(this);
        if (!o.hasClass('active')) {
            o.addClass('active');
            o.next('ul').stop().slideDown(300);
        } else {
            o.removeClass('active');
            o.next('ul').stop().slideUp(300);
        }
    });
    $('.mmenu-menu-mobile').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.mmenu-fixwidth').toggleClass('open-sidebar-menu');
        $('.opacity-menu').toggleClass('open-opacity');
        $('.menu-bar-res').toggleClass('mm-opening');
    });
    $('.opacity-menu').click(function(e) {
        $('.open-menu-header').removeClass('open-button');
        $('.mmenu-fixwidth').removeClass('open-sidebar-menu');
        $('.opacity-menu').removeClass('open-opacity');
		$('.menu-bar-res').removeClass('mm-opening');
    });
};

NN_FRAMEWORK.filterPro = function(obj) {
	$("body").on("change", ".form-filter input[type='checkbox']", function() {
		holdonOpen();
			var formData = $(".form-filter input[type='checkbox']:checked").map(function() {
				return $(this).attr('name') + "=" + $(this).val();
			}).get();
			FilterProduct(formData);
		holdonClose();
	});

	$(document).ready(function() {
		activateCheckboxesFromURL();
		//Đoạn này không có cũng không sao chỉ dùng để reset checkbox
		document.querySelectorAll('.filter-only input[type="checkbox"]').forEach(function(checkbox) {
			checkbox.addEventListener('change', function() {
				document.querySelectorAll('.filter-only input[type="checkbox"]').forEach(function(otherCheckbox) {
					if (otherCheckbox !== checkbox) {
						otherCheckbox.checked = false;
					}
				});
			});
		});
		
	});

	/* Menu fixed */
	if(isExist($(".header")))
	{
		/* Menu click */
		$(".menu_box").on("click", ".i-menu", function() {
			var menuUl = $(this).closest('.menu_box').find('.menu_box_ul');
			menuUl.slideToggle();
		});
	}
};

/* CartQView */
NN_FRAMEWORK.CartQView = function () {
	/* Colors */
	if (isExist($('.color-pro-detail'))) {
		$('.color-pro-detail input').click(function () {
			$this = $(this).parents('label.color-pro-detail');
			$parents = $this.parents('.attr-pro-detail');
			$parents_detail = $this.parents('.grid-pro-detail');
			$parents.find('.color-block-pro-detail').find('.color-pro-detail').removeClass('active');
			$parents.find('.color-block-pro-detail').find('.color-pro-detail input').prop('checked', false);
			$this.addClass('active');
			$this.find('input').prop('checked', true);
			var id_color = $parents.find('.color-block-pro-detail').find('.color-pro-detail input:checked').val();
			var id_pro = $this.data('idproduct');

			$.ajax({
				url: 'api/color.php',
				type: 'POST',
				dataType: 'html',
				data: {
					id_color: id_color,
					id_pro: id_pro
				},
				beforeSend: function () {
					holdonOpen();
				},
				success: function (result) {
					if (result) {
						$parents_detail.find('.left-pro-detail').html(result);
						MagicZoom.refresh('Zoom-1');
						NN_FRAMEWORK.OwlData($('.owl-pro-detail'));
						NN_FRAMEWORK.Lazys();
					}
					holdonClose();
				}
			});
		});
	}

	/* Sizes */
	if (isExist($('.size-pro-detail'))) {
		$('.size-pro-detail input').click(function () {
			$this = $(this).parents('label.size-pro-detail');
			$parents = $this.parents('.attr-pro-detail');
			$parents.find('.size-block-pro-detail').find('.size-pro-detail').removeClass('active');
			$parents.find('.size-block-pro-detail').find('.size-pro-detail input').prop('checked', false);
			$this.addClass('active');
			$this.find('input').prop('checked', true);
		});
	}

	/* Quantity detail page */
	if (isExist($('.quantity-pro-detail span'))) {
		$('.quantity-pro-detail span').click(function () {
			var $button = $(this);
			var oldValue = $button.parent().find('input').val();
			if ($button.text() == '+') {
				var newVal = parseFloat(oldValue) + 1;
			} else {
				if (oldValue > 1) var newVal = parseFloat(oldValue) - 1;
				else var newVal = 1;
			}
			$button.parent().find('input').val(newVal);
		});
	}
};

/* Quick View */
NN_FRAMEWORK.QuickView = function(obj) {
    $("body").on("click", ".product-quick-view", function() {
        var slug = $(this).attr("data-slug");

        if (slug) {
            $.ajax({
                type: "POST",
                url: slug + "?quickview=1",
                dataType: "html",
                beforeSend: function() {
                    holdonOpen();
                },
                success: function(result) {
					
                   if(result){
					$("#popup-quickview").find(".modal-body").html(result);
                    $("#popup-quickview").modal("show");
					MagicZoom.refresh('Zoom-1');
					NN_FRAMEWORK.OwlData($('.owl-pro-detail'));
					NN_FRAMEWORK.Lazys();
					if(CART){NN_FRAMEWORK.CartQView();}
					holdonClose();
				   }
                },
            });
        }
    });
};


/* Grab Container */
NN_FRAMEWORK.GrabContainer = function() {
    if (isExist($('.grab-container'))) {
        const sliders = document.querySelectorAll('.grab-container');
        sliders.forEach((slider) => {
            let mouseDown = false;
            let startX, scrollLeft;

            let startDragging = function(e) {
                mouseDown = true;
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            };
            let stopDragging = function(event) {
                mouseDown = false;
            };

            slider.addEventListener('mousemove', (e) => {
                e.preventDefault();
                if (!mouseDown) {
                    return;
                }
                const x = e.pageX - slider.offsetLeft;
                const scroll = x - startX;
                slider.scrollLeft = scrollLeft - scroll;
            });

            // Add the event listeners
            slider.addEventListener('mousedown', startDragging, false);
            slider.addEventListener('mouseup', stopDragging, false);
            slider.addEventListener('mouseleave', stopDragging, false);
        });
    }
};

/* Filter Multiple */
NN_FRAMEWORK.FilterMultiple = function() {
    if (isExist($('.filter'))) {
        let url = '',
            selectedToArray = [],
            selectedToString = [];

        // generate target `url` with `data` converted to string
        function mapSelectedToUrl(data = [], url = 'filter?') {
            if (data !== undefined) {
                let flag = 0;
                for (const i in data) {
                    if (flag != 0) url += '&';
                    url += data[i];
                    flag++;
                }
            }
            return url;
        }

        // count total
        function countTotal(data = []) {
            $.ajax({
                url: 'api/filter.php' + mapSelectedToUrl(data, '?'),
                type: 'GET',
                dataType: 'json',
                success: function(result) {
                    $('.filter__result-count').text(result.total).removeAttr('hidden');
                },
            });
        }

        // map 'id' with 'type'
        function mapSelectedID(element, type, id) {
            if (element.hasClass('active')) {
                // push 'id' to each 'type' or set first value of each 'type'
                if (selectedToArray[type] !== undefined) {
                    selectedToArray[type].push(id);
                    selectedToArray[type] = [...new Set(selectedToArray[type])]; // remove duplicate
                } else {
                    selectedToArray[type] = [id];
                }
            } else {
                // remove 'id' from each type match with reclick 'id', delete the key if the `key-type` is empty
                selectedToArray[type].splice(selectedToArray[type].indexOf(id), 1);
                if (selectedToArray[type].length === 0) delete selectedToArray[type];
            }

            // convert `Array.id` of each 'type' to `string` with unique value then join ','
            if (selectedToArray[type] !== undefined) {
                selectedToString[type] = type + '=' + selectedToArray[type].join(',');
            } else {
                delete selectedToString[type];
            }

            countSelected();
            url = mapSelectedToUrl(selectedToString);
        }

        // get item
        function getFilterItem(element, event) {
            const id = element.data('id'),
                type = element.parents('[data-type]').data('type');

            if (event.type === 'click') {
                // prettier-ignore
                $('.filter').find('[data-type="' + type + '"]').find('[data-id="' + id + '"]').toggleClass('active');
            }

            mapSelectedID(element, type, id);
            countTotal(selectedToString);
            // console.log('after-' + (event.type ? event.type : event) + ': ' + url);
            return url;
        }

        // get item selected from `url` after load
        function getFilterItemFromUrl() {
            $('.filter__select-item.active').each(function() {
                getFilterItem($(this), 'load');
            });
        }
        getFilterItemFromUrl();

        // count total selected
        function countSelected() {
            let totalChildCount = 0;
            for (const key in selectedToArray) {
                if (Array.isArray(selectedToArray[key])) {
                    totalChildCount += selectedToArray[key].length;
                }
            }

            if (totalChildCount) {
                $('.filter-selected__total').text(totalChildCount);
                $('.filter-selected__total').removeAttr('hidden');
            } else {
                $('.filter-selected__total').attr('hidden', true);
            }
        }

        // clone selected item
        function cloneSelectedItem(id, type, name) {
            let element = document.createElement('div');
            element.classList.add('filter-selected__item');
            element.setAttribute('data-id', id);
            element.setAttribute('data-type', type);
            element.textContent = name;

            return element;
        }

        // load clone
        function loadCloneSelectedItem() {
            let removeAll = document.createElement('a');
            removeAll.classList.add('filter-selected__remove-all');
            removeAll.setAttribute('href', 'san-pham');
            removeAll.textContent = 'Xóa tất cả';

            for (const item in selectedToArray) {
                if (Object.hasOwnProperty.call(selectedToArray, item)) {
                    const element = selectedToArray[item];

                    for (let i = 0; i < element.length; i++) {
                        // prettier-ignore
                        const id = element[i],
                            type = item,
                            name = $('.filter__item-all').find('[data-type="' + type + '"]').find('[data-id="' + id + '"]').text();

                        $('#filter-selected').append(cloneSelectedItem(id, type, name));
                    }
                }
            }
            if ($('#filter-selected').children('[data-id]').length) {
                $('#filter-selected').removeAttr('hidden');
                $('#filter-selected').append(removeAll);
            }
        }
        loadCloneSelectedItem();

        // remove clone
        $('.filter-selected__item').on('click', function(event) {
            const element = $(this),
                id = $(this).data('id'),
                type = $(this).data('type');

            mapSelectedID(element, type, id);
            $(this).remove();
            window.location.href = url;
        });

        // detect click outside element
        $(document).click(function(event) {
            const $target = $(event.target);
            if (!$target.closest('.filter__item').length && $('.filter__item').hasClass('active')) {
                $('.filter__item').removeClass('active');
            }
        });

        // open filter item
        $('.filter__btn-open').on('click', function() {
            if ($(this).parent().hasClass('active')) {
                $(this).parent().removeClass('active');
            } else {
                $(this).parents('.filter__list').find('.filter__item.active').removeClass('active');
                $(this).parent().addClass('active');
            }
        });

        // get filter item on `click`
        $('.filter__select-item').on('click', function(event) {
            getFilterItem($(this), event);
        });

        // execute filter
        $('.filter__btn-execute').on('click', function() {
            url = url ? url : 'filter?';
            // console.log('execute: ' + url);
            window.location.href = url;
        });

        // clear filter item on each 'type'
        $('.filter__btn-clear').on('click', function() {
            let type = [];
            const button = $(this);

            if (!button.hasClass('filter__btn-clear-all')) {
                // prettier-ignore
                button.parents('[data-type]').each(function() {
                    type = [$(this).data('type')];
                });
            } else {
                // prettier-ignore
                button.parents('.filter').find('[data-type]').each(function() {
                    type[type.length] = $(this).data('type');
                });
            }

            // console.log('before-delete-' + type + ': ' + url);
            if (type) {
                type = [...new Set(type)];
                for (const item in type) {
                    // prettier-ignore
                    button.parents('.filter').find('[data-type="' + type[item] + '"]').find('.active').removeClass('active');
                    delete selectedToArray[type[item]];
                    delete selectedToString[type[item]];
                }
            }

            countSelected();
            url = mapSelectedToUrl(selectedToString);
            countTotal(selectedToString);
            // console.log('after-delete-' + type + ': ' + url);
        });

        // add scroll x
        $(window).on('load resize', function() {
            if ($(window).width() < 1024) {
                $('.filter__list').addClass('grab-container');
                NN_FRAMEWORK.GrabContainer();
            } else {
                $('.filter__list').removeClass('grab-container');
            }
        });
    }
};

/* AOS */
NN_FRAMEWORK.AOS = function () {
	AOS.init({
	  duration: 1000,
	});
	onElementHeightChange(document.body, function () {
	  AOS.refresh();
	});
	function onElementHeightChange(elm, callback) {
	  var lastHeight = elm.clientHeight;
	  var newHeight;
  
	  (function run() {
		newHeight = elm.clientHeight;
		if (lastHeight !== newHeight) callback();
		lastHeight = newHeight;
  
		if (elm.onElementHeightChangeTimer) {
		  clearTimeout(elm.onElementHeightChangeTimer);
		}
  
		elm.onElementHeightChangeTimer = setTimeout(run, 200);
	  })();
	}
  };


/* Ready */
$(document).ready(function () {
	NN_FRAMEWORK.GrabContainer();
	NN_FRAMEWORK.FilterMultiple();
	NN_FRAMEWORK.Lazys();
	NN_FRAMEWORK.filterPro();
	NN_FRAMEWORK.Tools();
	NN_FRAMEWORK.AOS();

	NN_FRAMEWORK.Wows();
	NN_FRAMEWORK.AltImg();
	NN_FRAMEWORK.GoTop();
	NN_FRAMEWORK.Menu();
	NN_FRAMEWORK.OwlPage();
	NN_FRAMEWORK.Pagings();
	if(QUICKVIEW){NN_FRAMEWORK.QuickView();}
	if(CART){NN_FRAMEWORK.Cart();}
	NN_FRAMEWORK.Videos();
	NN_FRAMEWORK.Photobox();
	NN_FRAMEWORK.Comment();
	NN_FRAMEWORK.Search();
	NN_FRAMEWORK.DomChange();
	NN_FRAMEWORK.TickerScroll();
	NN_FRAMEWORK.DatePicker();
	NN_FRAMEWORK.loadNameInputFile();
	NN_FRAMEWORK.initAll();
	NN_FRAMEWORK.GoogleMap();
	NN_FRAMEWORK.tabsDemo();
	NN_FRAMEWORK.btnLoading();
	NN_FRAMEWORK.menuMobile();
	/*
	NN_FRAMEWORK.Popup();
	NN_FRAMEWORK.Loading();
	NN_FRAMEWORK.Slick();
	NN_FRAMEWORK.Marquees();
    NN_FRAMEWORK.danhMucDrops();
    f_height_fslider();*/
	if (CONFIG_TOC) {NN_FRAMEWORK.Toc();}
	if (CONFIG_SHOWCONTENT) {NN_FRAMEWORK.ShowContent();}
	if (CONFIG_SHINER) {NN_FRAMEWORK.shinerLogo();}
	
});
