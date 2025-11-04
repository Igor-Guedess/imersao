(function ($) {
	"use strict";

	$(window).on('load', function () {
		preloader();
		wowAnimation();
		headTextAnimation();
	});

	/*------------------------------------------
	= preloader
	-------------------------------------------*/
	function preloader() {
		$('#preloader').fadeOut('slow',function(){
			$(this).remove();
		});
	}

	gsap.config({
		nullTargetWarn: false,
	});
	
	/*------------------------------------------
	= back to top
	-------------------------------------------*/
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('.xb-backtotop').addClass('active');
		} else {
			$('.xb-backtotop').removeClass('active');
		}
	});  
	$(function () {
		$(".scroll").on('click', function () {
			$("html,body").animate({ scrollTop: 0 }, "slow");
			return false
		});
	});
	/*------------------------------------------
	= sticky header
	-------------------------------------------*/
	function stickyHeader() {
		var scrollDirection = "";
		var lastScrollPosition = 0;

		// Clone and make header sticky if the element with class 'xb-header' exists
		if ($('.xb-header').length) {
			$('.xb-header').addClass('original').clone(true).insertAfter('.xb-header').addClass('xb-header-area-sticky xb-sticky-stt').removeClass('original');
		}

		// Handle scroll events
		$(window).on("scroll", function () {
			var currentScrollPosition = $(window).scrollTop();

			// Determine scroll direction
			scrollDirection = currentScrollPosition < lastScrollPosition ? "up" : "down";
			lastScrollPosition = currentScrollPosition;

			// Check if element with ID 'xb-header-area' has class 'is-sticky'
			if ($("#xb-header-area").hasClass("is-sticky")) {
				// Add or remove classes based on scroll position for sticky header and mobile header
				if (lastScrollPosition > 100) {
					$(".xb-header-area-sticky.xb-sticky-stb").addClass("xb-header-fixed");
				} else {
					$(".xb-header-area-sticky.xb-sticky-stb").removeClass("xb-header-fixed");
				}

				// Add or remove classes for sticky header based on scroll direction
				if (scrollDirection === "up" && lastScrollPosition > 100) {
					$(".xb-header-area-sticky.xb-sticky-stt").addClass("xb-header-fixed");
				} else {
					$(".xb-header-area-sticky.xb-sticky-stt").removeClass("xb-header-fixed");
				}
			}
		});
	}
	stickyHeader();


	/*------------------------------------------
	= header search
	-------------------------------------------*/
	$(".header-search-btn").on("click", function (e) {
		e.preventDefault();
		$(".header-search-form-wrapper").addClass("open");
		$('.header-search-form-wrapper input[type="search"]').focus();
		$('.body-overlay').addClass('active');
	});
	$(".xb-search-close").on("click", function (e) {
		e.preventDefault();
		$(".header-search-form-wrapper").removeClass("open");
		$("body").removeClass("active");
		$('.body-overlay').removeClass('active');
	});

	
	/*------------------------------------------
	= sidebar
	-------------------------------------------*/
	$('.sidebar-menu-close, .body-overlay').on('click', function () {
		$('.offcanvas-sidebar').removeClass('active');
		$('.body-overlay').removeClass('active');
	});

	$('.offcanvas-sidebar-btn').on('click', function () {
		$('.offcanvas-sidebar').addClass('active');
		$('.body-overlay').addClass('active');
	});
	$('.body-overlay').on('click', function () {
		$(this).removeClass('active');
		$(".header-search-form-wrapper").removeClass("open");
	});


	/*------------------------------------------
	= mobile menu
	-------------------------------------------*/
	$('.xb-nav-hidden li.menu-item-has-children > a').append('<span class="xb-menu-toggle"></span>');
	$('.xb-header-menu li.menu-item-has-children, .xb-menu-primary li.menu-item-has-children').append('<span class="xb-menu-toggle"></span>');
	$('.xb-menu-toggle').on('click', function () {
		if (!$(this).hasClass('active')) {
			$(this).closest('ul').find('.xb-menu-toggle.active').toggleClass('active');
			$(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
		}
		$(this).toggleClass('active');
		$(this).closest('.menu-item').find('> .sub-menu').toggleClass('active');
		$(this).closest('.menu-item').find('> .sub-menu').slideToggle();
	});

	$('.xb-nav-hidden li.menu-item-has-children > a').click(function (e) {
		var target = $(e.target);
		if ($(this).attr('href') === '#' && !(target.is('.xb-menu-toggle'))) {
			e.stopPropagation();
			if (!$(this).find('.xb-menu-toggle').hasClass('active')) {
				$(this).closest('ul').find('.xb-menu-toggle.active').toggleClass('active');
				$(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
			}
			$(this).find('.xb-menu-toggle').toggleClass('active');
			$(this).closest('.menu-item').find('> .sub-menu').toggleClass('active');
			$(this).closest('.menu-item').find('> .sub-menu').slideToggle();
		}
	});
	$(".xb-nav-mobile").on('click', function () {
		$(this).toggleClass('active');
		$('.xb-header-menu').toggleClass('active');
	});

	$(".xb-menu-close, .xb-header-menu-backdrop").on('click', function () {
		$(this).removeClass('active');
		$('.xb-header-menu').removeClass('active');
	});

	/*------------------------------------------
	= nice select
	-------------------------------------------*/
	$('select').niceSelect();

	/*------------------------------------------
	= data background and bg color
	-------------------------------------------*/
	$("[data-background]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-background") + ") ")
	})
	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));

	});


	/*------------------------------------------
	= aos animation
	-------------------------------------------*/
	function wowAnimation() {
		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: false,
			live: true
		});
		wow.init();
	}


	/*------------------------------------------
	= counter
	-------------------------------------------*/
	if ($(".xbo").length) {
		$('.xbo').appear();
		$(document.body).on('appear', '.xbo', function (e) {
			var odo = $(".xbo");
			odo.each(function () {
				var countNumber = $(this).attr("data-count");
				$(this).html(countNumber);
			});
			window.xboOptions = {
				format: 'd',
			};
		});
	}

	if ($(".xbo_trigger").length) {
        var odo = $(".xbo_trigger");
        odo.each(function () {
            var countNumber = $(this).attr("data-count");
            var odometerInstance = new Odometer({
                el: this,
                value: 0,
                format: 'd',
            });
            odometerInstance.render();
            odometerInstance.update(countNumber);
        });
        $('.xbo_trigger').appear();
        $(document.body).on('appear', '.xboh', function (e) {
            // This event handler can be empty or used for additional functionality if needed
        });
    }

	/*------------------------------------------
	= Background Parallax - Start
	-------------------------------------------*/
	$('.parallaxie').parallaxie({
		speed: 0.5,
		offset: 0,
	});

	/*------------------------------------------
	= project slide
	-------------------------------------------*/
	var slider = new Swiper(".project-slider", {
		loop: true,
		speed: 400,
		spaceBetween: 0,
		slidesPerView: 1,
		centeredSlides: false,
		effect: "fade", 
		autoplay: {
			enabled: true,
			delay: 6000
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			'1600': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	/*------------------------------------------
	= destination slide
	-------------------------------------------*/
	var slider = new Swiper(".destination-slider", {
		loop: true,
		speed: 400,
		spaceBetween: 50,
		slidesPerView: 5,
		centeredSlides: false,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			'1600': {
				slidesPerView: 5,
			},
			'992': {
				slidesPerView: 5,
			},
			'768': {
				slidesPerView: 4,
			},
			'576': {
				slidesPerView: 3,
			},
			'0': {
				slidesPerView: 2,
			},
		},
	});
	/*------------------------------------------
	= testimonial slide
	-------------------------------------------*/
	var slider = new Swiper(".xb-testimonial-slider", {
		loop: true,
		speed: 400,
		spaceBetween: 30,
		slidesPerView: 2,
		centeredSlides: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		pagination: {
			el: ".swiper-pagination",
		},
		breakpoints: {
			'1600': {
				slidesPerView: 2,
			},
			'1366': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	/*------------------------------------------
	= hero slide
	-------------------------------------------*/
	var swiper = new Swiper(".hero-slider-nav", {
	loop: false,
	spaceBetween: 20,
	slidesPerView: 3,
	freeMode: true,
	watchSlidesProgress: true,
	allowTouchMove: false,
	});
	var swiper2 = new Swiper(".hero-slider-item", {
	loop: true,
	speed: 500,
	spaceBetween: 0,
	slidesPerView: 1,
	autoplay: {
		delay: 11000,
		disableOnInteraction: false,
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	thumbs: {
		swiper: swiper,
	},
	});

	/*------------------------------------------
	= location slide
	-------------------------------------------*/
	var swiper = new Swiper(".xb-location-nav", {
	loop: true,
	spaceBetween: 20,
	slidesPerView: 2,
	freeMode: true,
	watchSlidesProgress: true,
	allowTouchMove: true,
	breakpoints: {
		'992': {
			slidesPerView: 2,
		},
		'768': {
			slidesPerView: 1,
		},
		'576': {
			slidesPerView: 2,
		},
		'0': {
			slidesPerView: 1,
			spaceBetween: 0,
		},
	},
	});

	var swiper2 = new Swiper(".xb-location-item", {
	loop: true,
	effect: "fade", 
	spaceBetween: 0,
	slidesPerView: 1,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	autoplay: {
		enabled: true,
		delay: 6000
	},
	thumbs: {
		swiper: swiper,
	},
	});

	/*------------------------------------------
	= team slide
	-------------------------------------------*/
	var slider = new Swiper(".xb-team-slider", {
		loop: true,
		speed: 400,
		spaceBetween: 30,
		slidesPerView: 4,
		centeredSlides: false,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		breakpoints: {
			'1600': {
				slidesPerView: 4,
			},
			'1024': {
				slidesPerView: 4,
			},
			'768': {
				slidesPerView: 3,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});
	
	/*------------------------------------------
	= yr-testimonial slide
	-------------------------------------------*/
	var slider = new Swiper(".yr-testimonial-slider", {
		loop: true,
		speed: 400,
		effect: "fade", 
		spaceBetween: 0,
		slidesPerView: 1,
		centeredSlides: false,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			'1600': {
				slidesPerView: 1,
			},
			'1024': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});
	

	/*------------------------------------------
	= inhover active
	-------------------------------------------*/
	$(".xb-mouseenter").on('mouseenter', function () {
		$(".xb-mouseenter").removeClass("active");
		$(this).addClass("active");
	});
	$(".xb-mouseenter2").on('mouseenter', function () {
		$(".xb-mouseenter2").removeClass("active");
		$(this).addClass("active");
	});

	/*------------------------------------------
	= click button active
	-------------------------------------------*/
	$(function () {
		$('.category li').on('click', function () {
			var active = $('.category li.active');
			active.removeClass('active');
			$(this).addClass('active');
		});
	});

	/*------------------------------------------
	= magnificPopup
	-------------------------------------------*/
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});
	$('.popup-video').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-zoom-in',
	});

	/*------------------------------------------
	= marquee
	-------------------------------------------*/
	$('.marquee-left').marquee({
		speed: 30,
		gap: 0,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: false,
		startVisible: true,
	});	

	/*----------------------------
	= countdown with date & time
    ------------------------------ */
	$('[data-countdown]').each(function () {
		var $this = $(this),
			finalDate = $(this).data('countdown');
		if (!$this.hasClass('countdown-full-format')) {
			$this.countdown(finalDate, function (event) {
				$this.html(event.strftime('<div class="single"><h1>%D :</h1><p>Days</p></div><div class="single"><h1>%H :</h1><p>Hours</p></div><div class="single"><h1>%M :</h1><p>Mins</p></div><div class="single"><h1>%S :</h1><p>Secs</p></div>'));
			});
		} else {
			$this.countdown(finalDate, function (event) {
				$this.html(event.strftime('<div class="single"><h1>%Y</h1><p>Years</p></div><div class="single"><h1>%m</h1><p>Months</p></div><div class="single"><h1>%W</h1><p>Weeks</p></div><div class="single"><h1>%d :</h1><p>Days</p></div><div class="single"><h1>%H :</h1><p>Hours</p></div><div class="single"><h1>%M :</h1><p>Mins</p></div><div class="single"><h1>%S :</h1><p>Secs</p></div>'));
			});
		}
	});

	/*------------------------------------------
	= item hover image active
	-------------------------------------------*/
	function service_animation() {
		var active_bg = $(".xb-service-inner .active-bg");
		var element = $(".xb-service-inner .current");
	
		function activeServiceList(active_bg, e) {
			if (!e.length) {
				active_bg.css({ height: "100%" });
				return false;
			}
			var topOff = e.offset().top;
			var height = e.outerHeight();
			var menuTop = $(".xb-service-inner").offset().top;
	
			active_bg.css({ top: topOff - menuTop + "px", height: height + "px" });
			e.closest(".xb-ser-item").removeClass("mleave").addClass("current");
			e.closest(".xb-ser-item").siblings().removeClass("current").addClass("mleave");
		}
	
		$(".xb-service-inner .xb-ser-item").on("mouseenter", function () {
			var e = $(this);
			var index = e.index();
	
			activeServiceList(active_bg, e);
			$(".xb-service-imges .img-item").removeClass("active").eq(index).addClass("active");
		});
	
		$(".xb-service-inner").on("mouseleave", function () {
			element = $(".xb-service-inner .current");
			var index = element.index();
	
			activeServiceList(active_bg, element);
	
			$(".xb-service-imges .img-item").removeClass("active").eq(index).addClass("active");
	
			element.closest(".xb-ser-item").siblings().removeClass("mleave");
		});
	
		$(".xb-service-inner .xb-ser-item").on("click", function () {
			$(".xb-service-inner .xb-ser-item").removeClass("current");
			$(this).addClass("current");
	
			var index = $(this).index();
			$(".xb-service-imges .img-item").removeClass("active").eq(index).addClass("active");
		});
		activeServiceList(active_bg, element);
	}
	
	service_animation();

	/*------------------------------------------
	= element parallax (button)
	-------------------------------------------*/
	$('.xb-element-parallax').each(function () {
        var $this = $(this);
        var dampingFactor = 0.5;

        function handleMouseMove(e) {
            var offset = $this.offset();
            var mouseX = e.pageX - offset.left;
            var mouseY = e.pageY - offset.top;
            var translateX = (mouseX - $this.width() / 2) * dampingFactor;
            var translateY = (mouseY - $this.height() / 2) * dampingFactor;

            var translateTransform = 'translate(' + translateX + 'px, ' + translateY + 'px)';
            $this.css({
                'transform': translateTransform,
                'transition': 'transform 0.1s ease-out' 
            });
        }

        function resetTransform() {
            $this.css({
                'transform': 'none',
                'transition': 'transform 0.3s ease-out' 
            });
        }

        if ($this.closest('.xb-parent-element-parallax').length) {
            var pare2 = $this.closest('.xb-parent-element-parallax');
            pare2.mousemove(function (e) {
                handleMouseMove(e);
            });
            pare2.mouseleave(resetTransform);
        } else {
            $this.mousemove(handleMouseMove);
            $this.mouseleave(resetTransform);
        }
    });

	// datepicker
	$(".datepicker").datepicker();

	// Text horizontal reveal on scroll
	// =================================
	$(".xb-text-reveal").each(function() {
		$(this).wrapInner("<span/>");
	});

	// Convert the elements into an array for GSAP
	let ttTextRevealElements = gsap.utils.toArray(".xb-text-reveal");

	// Apply GSAP animations
	ttTextRevealElements.forEach(function(ttTextReveal) {
		let ttTextRevealSpans = ttTextReveal.querySelectorAll("span");

		let tl_ttTextRevealAnim = gsap.timeline({
			scrollTrigger: {
				trigger: ttTextReveal,
				start: "top 80%",
				end: () => `+=${ttTextReveal.offsetHeight * 2}`,
				scrub: 1,
				markers: false,
			},
		});
		tl_ttTextRevealAnim.to(ttTextRevealSpans, { 
			duration: 1,
			backgroundSize: "200% 100%",
			stagger: 0.8,
			ease: "none" 
		});
	})

	// gsap animation 
	gsap.from(".yr-feature-img", {
		duration: 1,
		delay: .6,
		x: 200,
		opacity: 0,
		scrollTrigger: {
			trigger: ".yr-feature-img",
			scroller: "body",
			start: "top 100%", 
		}
	})
	gsap.from(".xbfadeleft", {
		duration: .5,
		left: -300,
		opacity: 0,
		scrollTrigger: {
			trigger: ".xbfadeleft",
			scroller: "body",
			start: "top 80%", 
		}
	})
	// hero-three title animation gsap
	function headTextAnimation() {
	var heading = document.querySelector(".title.split");
	if (!heading) return; 

	var headText = heading.textContent;
	var splittedText = headText.split(" ");
	var clutter = "";

	splittedText.forEach(function(elem) {
		clutter += `<span>${elem}</span> `;
	});

	heading.innerHTML = clutter.trim();
	

	gsap.from(".split span", {
		y: 200,
		opacity: 0,
		duration: 0.6,
		stagger: 0.2
	});
	}

	headTextAnimation();

	/*------------------------------------------
	= INÍCIO DA FUNÇÃO SCROLL ZOOM (COM CROSSFADE)
	-------------------------------------------*/

	// Espera a PÁGINA INTEIRA (incluindo imagens) carregar
	$(window).on('load', function () {

		const $section = $('.scroll-zoom-section');
		
		// Só executa se a seção existir na página
		if ($section.length) {
			
			// --- 1. Seleção e Configuração das Imagens ---
			const $imageA = $('#scroll-zoom-image-A');
			const $imageB = $('#scroll-zoom-image-B');
			const $triggers = $('.scroll-step');

			// Define qual imagem está "ativa" (na frente)
			let $activeImage = $imageA;
			let $inactiveImage = $imageB;

			// --- 2. Pré-carregamento de Imagens ---
			const imagesToPreload = [];
			const originalImgSrc = $imageA.data('original-img');
			if (originalImgSrc) {
				imagesToPreload.push(originalImgSrc);
			}
			
			$triggers.each(function() {
				const img = $(this).data('img');
				if (img) {
					imagesToPreload.push(img);
				}
			});

			imagesToPreload.forEach(function(src) {
				const img = new Image();
				img.src = src;
			});
			// --- Fim do Pré-carregamento ---

			
			// --- 3. Cálculos de Posição ---
			const sectionOffsetTop = $section.offset().top;
			const scrollableHeight = $section.height() - $(window).height();
			let lastKnownImg = originalImgSrc;

			// --- 4. Função Principal do Scroll ---
			function handleScrollAnimation() {
				let scrollTop = $(window).scrollTop();
				let scrollProgress = (scrollTop - sectionOffsetTop) / scrollableHeight;
				let progress = Math.min(1, Math.max(0, scrollProgress));

				// --- Lógica do Zoom (Aplica em AMBAS as imagens) ---
				if (scrollProgress < 0) {
					// ESTADO INICIAL: Antes da seção
					$('.scroll-zoom-img').css({
						'width': '50%',
						'height': '50%',
						'border-radius': '12px'
					});

				} else if (scrollProgress >= 0 && scrollProgress <= 1) {
					// ESTADO ATIVO: Durante a animação
					let newWidth = 50 + (progress * 50); // 50% -> 100%
					let newHeight = 50 + (progress * 50); // 50% -> 100%
					let newRadius = 12 - (progress * 12); // 12px -> 0px

					$('.scroll-zoom-img').css({
						'width': `${newWidth}%`,
						'height': `${newHeight}%`,
						'border-radius': `${newRadius}px`
					});

				} else {
					// ESTADO FINAL: Depois da seção (scrollProgress > 1)
					// Isso força a imagem a ficar em 100% se o scroll for muito rápido
					$('.scroll-zoom-img').css({
						'width': '100%',
						'height': '100%',
						'border-radius': '0px'
					});
				}

				// --- Lógica da Troca de Imagem (Crossfade) ---
				let currentImg = originalImgSrc;
				$triggers.each(function() {
					if ($(this).offset().top < (scrollTop + $(window).height() / 2)) {
						currentImg = $(this).data('img');
					}
				});

				if (currentImg !== lastKnownImg) {
					lastKnownImg = currentImg;
					
					// 1. Coloca a nova imagem na imagem inativa (que está atrás)
					$inactiveImage.attr('src', currentImg);
					
					// 2. Faz o fade-in da imagem inativa
					$inactiveImage.css('opacity', 1);
					
					// 3. Faz o fade-out da imagem ativa
					$activeImage.css('opacity', 0);
					
					// 4. Inverte os papéis para a próxima troca
					let $temp = $activeImage;
					$activeImage = $inactiveImage;
					$inactiveImage = $temp;
				}
			}

			// "Gruda" a nossa função no evento de scroll do navegador
			$(window).on('scroll', handleScrollAnimation);
		}
	});

})(jQuery);


