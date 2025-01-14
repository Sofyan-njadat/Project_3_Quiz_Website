(function ($) {

	"use strict";

	$(window).stellar({
		responsive: true,
		parallaxBackgrounds: true,
		parallaxElements: true,
		horizontalScrolling: false,
		hideDistantElements: false,
		scrollProperty: 'scroll'
	});


	var fullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function () {
		setTimeout(function () {
			if ($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
	$.Scrollax();

	var carousel = function () {
		$('.carousel-testimony').owlCarousel({
			center: false,
			loop: true,
			items: 1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 4
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function () {
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function () {
		var $this = $(this);
		// timer;
		// timer = setTimeout(function(){
		$this.removeClass('show');
		$this.find('> a').attr('aria-expanded', false);
		// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
		console.log('show');
	});

	// scroll
	var scrollWindow = function () {
		$(window).scroll(function () {
			var $w = $(this),
				st = $w.scrollTop(),
				navbar = $('.ftco_navbar'),
				sd = $('.js-scroll-wrap');

			if (st > 150) {
				if (!navbar.hasClass('scrolled')) {
					navbar.addClass('scrolled');
				}
			}
			if (st < 150) {
				if (navbar.hasClass('scrolled')) {
					navbar.removeClass('scrolled sleep');
				}
			}
			if (st > 350) {
				if (!navbar.hasClass('awake')) {
					navbar.addClass('awake');
				}

				if (sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if (st < 350) {
				if (navbar.hasClass('awake')) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if (sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var counter = function () {

		$('#section-counter, .hero-wrap, .ftco-counter').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function () {
					var $this = $(this),
						num = $this.data('number');
					console.log(num);
					$this.animateNumber(
						{
							number: num,
							numberStep: comma_separator_number_step
						}, 7000
					);
				});

			}

		}, { offset: '95%' });

	}
	counter();


	var contentWayPoint = function () {
		var i = 0;
		$('.ftco-animate').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .ftco-animate.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						}, k * 50, 'easeInOutExpo');
					});

				}, 100);

			}

		}, { offset: '95%' });
	};
	contentWayPoint();


	// magnific popup
	$('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});

	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});


	$('.checkin_date, .checkout_date').datepicker({
		'format': 'm/d/yyyy',
		'autoclose': true
	});




})(jQuery);


document.addEventListener('DOMContentLoaded', function () {
	// الكود هنا بعد تحميل الـ DOM
	const readMoreButtons = document.querySelectorAll('.read-more-btn');
	const popup = document.getElementById('quiz-popup');
	const popupTitle = document.getElementById('popup-title');
	const popupText = document.getElementById('popup-text');
	const closeBtn = document.querySelector('.close-btn');
	const startQuizBtn = document.getElementById('start-quiz-btn');
	const confirmCheckbox = document.getElementById('confirm-instructions');
	let selectedTest = "";

	// إضافة الأحداث إلى الأزرار "Read more"
	readMoreButtons.forEach(button => {
		button.addEventListener('click', () => {
			const title = button.getAttribute('data-title');
			let content = button.getAttribute('data-content');

			// استبدال \n بـ <br> لإنشاء فواصل الأسطر في النص
			content = content.replace(/\n/g, '<br>');

			popupTitle.textContent = title;
			popupText.innerHTML = content; // استخدام innerHTML للسماح بعرض الـ <br>
			popup.style.display = 'flex';



			// تخزين نوع الامتحان في متغير global
			if (title === 'English Quiz') {
				selectedTest=localStorage.setItem('selectedTest', 'English');
			} else if (title === 'IQ Quiz') {
				selectedTest=localStorage.setItem('selectedTest', 'IQ');
			} else if (title === 'Technical Quiz') {
				selectedTest=localStorage.setItem('selectedTest', 'Technical');
			}

			confirmCheckbox.checked = false; // إعادة ضبط خانة الاختيار
			startQuizBtn.disabled = true; // تعطيل الزر عند فتح النافذة
		});
	});

	// Enable or disable the start button based on checkbox state
	confirmCheckbox.addEventListener('change', () => {
		startQuizBtn.disabled = !confirmCheckbox.checked;
	});


	// إغلاق الـ Popup
	closeBtn.addEventListener('click', () => {
		popup.style.display = 'none';
	});

	// إغلاق النافذة عند الضغط خارجها
	window.addEventListener('click', (e) => {
		if (e.target === popup) {
			popup.style.display = 'none';
		}
	});

	// حدث عند الضغط على زر "ابدأ الامتحان"
	startQuizBtn.addEventListener('click', () => {
		const quizType = popupTitle.textContent; // الحصول على عنوان الامتحان من popupTitle

		// عرض رسالة تنبيه حسب نوع الامتحان
		if (quizType === 'English Quiz') {
			window.location.href = "test.html"; // استبدل بالصفحة المناسبة للامتحان الإنجليزي
		} else if (quizType === 'IQ Quiz') {
			window.location.href = 'test.html'; // استبدل بالصفحة المناسبة للامتحان IQ
		} else if (quizType === 'Technical Quiz') {
			window.location.href = 'test.html'; // استبدل بالصفحة المناسبة للامتحان التقني
		}
	});
});

function iq() {
	const testButton = document.getElementById('iq-btn');
	const check1 = localStorage.getItem('selectedTest');
	if (check1 === "IQ") {
		window.alert('This Quiz Already Taken')
		location.href= 'apply_test.html';

	} else {
		alert("IQ exam will start now!");
		window.location.href = "test.html";
	}
  }
function english() {
	const testButton = document.getElementById('english-btn');
	const check1 = localStorage.getItem('selectedTest');
	if (check1 === "English") {
		window.alert('This Quiz Already Taken')
		location.href= 'apply_test.html';

	} else {
		alert("English exam will start now!");
		window.location.href = "test.html";
	}
  }
function tech() {
	const testButton = document.getElementById('tech-btn');
	const check1 = localStorage.getItem('selectedTest');
	if (check1 === "Techical") {
		window.alert('This Quiz Already Taken')
		location.href= 'apply_test.html';

	} else {
		alert("Technical exam will start now!");
		window.location.href = "test.html";
	}
  }
