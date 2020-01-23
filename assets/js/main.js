/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

		/*global TweenMax, TimelineMax, Power1, Power2*/

/*
author: Marco Barría
devDependencies:
  - GSAP TweenMax https://greensock.com/tweenmax (Necessary for animation.)
*/

// MOBILE DETECT, RANDOM FUNCTION
var Utils = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (Utils.Android() || Utils.BlackBerry() || Utils.iOS() || Utils.Opera() || Utils.Windows());
    },
    randomInRange: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

var $borders = [].slice.call(document.querySelectorAll('.border-inner'), 0),
    wrapperRombo = document.getElementById('wrapper'),
    control = document.getElementById('control'),
    colors = ['#df3891', '#fff78b', '#692286', '#c4a66b', '#ed95c0', '#6ac1b8'],
    nRombo = 46,
    timer = 0.8;

var setObj = function setObj() {

    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
    var heightIOs = window.innerHeight * zoomLevel;

    if (Utils.iOS()) {

        if (heightIOs > window.innerWidth) {
            document.querySelector('.Main').style.height = heightIOs + 'px';
            document.querySelector('.Main').style.minHeight = heightIOs + 'px';
        }

    }

    TweenMax.set(document.querySelectorAll('.border-inner')[0], {
        y: -32
    });
    TweenMax.set(document.querySelectorAll('.border-inner')[1], {
        y: 32
    });
    TweenMax.set(document.querySelectorAll('.border-inner')[2], {
        x: -32
    });
    TweenMax.set(document.querySelectorAll('.border-inner')[3], {
        x: 32
    });

};

var border = function border() {
    var tl = new TimelineMax();

    tl.to($borders, 1.8, {
        x: 0,
        y: 0,
        force3D: true,
        ease: Power1.easeOut,
        onComplete: function() {
            document.body.classList.remove('overflow');
        }
    });

    return tl;
};

var romboInit = function romboInit() {

    for (var i = 0; i < nRombo; i++) {

        var gridItem = document.createElement('div');
        var romboDiv = document.createElement('div');

        wrapperRombo.appendChild(gridItem);
        gridItem.className = "box";

        TweenMax.set(".box", {
            perspective: 600,
            transformOrigin: '50% 50%'
        });

        document.querySelectorAll('.box')[i].appendChild(romboDiv);
        romboDiv.className = "rombo";

        TweenMax.set(".rombo", {
            transformStyle: "preserve-3d"
        });

        if (Utils.any()) {

            TweenMax.set(document.querySelectorAll('.rombo')[i], {
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                top: Utils.randomInRange(-40, 40),
                left: Utils.randomInRange(-40, 40),
                y: 0,
                scale: 0,
                opacity: 0,
                transformOrigin: '50% 50%',
                rotationY: Utils.randomInRange(-720, 720),
                rotation: Utils.randomInRange(-320, 320)
            });

        } else {

            TweenMax.set(document.querySelectorAll('.rombo')[i], {
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                top: Utils.randomInRange(-180, 180),
                left: Utils.randomInRange(-180, 180),
                y: -100,
                scale: 0,
                opacity: 0,
                transformOrigin: '50% 50%',
                rotationY: Utils.randomInRange(-720, 720),
                rotation: Utils.randomInRange(-320, 320)
            });

        }

    }

};

var romboAnimation = function romboAnimation() {
    var romboTodo = [].slice.call(document.querySelectorAll('.rombo'), 0);
    var tl = new TimelineMax();

    tl.staggerTo(romboTodo, 1.2, {
        y: 0,
        scale: 1,
        opacity: 1,
        rotationY: 0,
        rotation: '+=240',
        force3D: true,
        ease: Power2.easeOut
    }, 0.08);

    return tl;
};

//header animation//

var init = function init() {

    setObj();
    romboInit();

    // MASTER SCENES

    var master = new TimelineMax({
        delay: 0.4
    });

    master.add(border(), "scene1")
        .add(romboAnimation(), "-=1.8", "scene2");
    master.timeScale(timer);

    function go(el) {
        master.play();
        master.timeScale(timer);
        el.textContent = "REVERSE";
    }

    function rewards(el) {
        master.reverse();
        master.timeScale(timer * 5);
        el.textContent = "PLAY";
    }

    control.onclick = function() {
        master.reversed() ? go(this) : rewards(this);
        return false;
    };

};

window.onload = init;








	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);