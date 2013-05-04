$(function () {
    var gallery = $('#images');

    for (var i = 1; i <= 23; i++) {
        var fileName = (100 + i).toString();
        gallery.append('<li><a href="gallery/' + fileName + '.jpg"><img src="gallery/' + fileName + '.jpg" title=""/></a></li>')
    }

    gallery.exposure({controlsTarget: '#controls',
        controls: { prevNext: true, pageNumbers: true, firstLast: false },
        visiblePages: 3,
        slideshowControlsTarget: '#slideshow',
        onThumb: function (thumb) {
            var li = thumb.parents('li');
            var fadeTo = li.hasClass($.exposure.activeThumbClass) ? 1 : 0.3;

            thumb.css({display: 'none', opacity: fadeTo}).stop().fadeIn(200);

            thumb.hover(function () {
                thumb.fadeTo('fast', 1);
            }, function () {
                li.not('.' + $.exposure.activeThumbClass).children('img').fadeTo('fast', 0.3);
            });
        },
        onImage: function (image, imageData, thumb) {
            // Fade out the previous image.
            image.siblings('.' + $.exposure.lastImageClass).stop().fadeOut(500, function () {
                $(this).remove();
            });

            // Fade in the current image.
            image.hide().stop().fadeIn(1000);

            // Fade in selected thumbnail (and fade out others).
            if (gallery.showThumbs && thumb && thumb.length) {
                thumb.parents('li').siblings().children('img.' + $.exposure.selectedImageClass).stop().fadeTo(200, 0.3, function () {
                    $(this).removeClass($.exposure.selectedImageClass);
                });
                thumb.fadeTo('fast', 1).addClass($.exposure.selectedImageClass);
            }
        },
        onPageChanged: function () {
            // Fade in thumbnails on current page.
            gallery.find('li.' + $.exposure.currentThumbClass).hide().stop().fadeIn('fast');
        }
    });
})

$(function () {
    var servicesOffered = $("#services-offered");

    $(".titles li", servicesOffered).each(function (i, element) {
        $("a", element).click(function () {
            var targetClass = $(element).attr('class');

            if (targetClass.indexOf("active") == -1) {
                $(".descriptions .active", servicesOffered).removeClass("active");
                $(".descriptions ." + targetClass, servicesOffered).addClass("active");

                $(".titles .active", servicesOffered).removeClass("active");
                $(".titles ." + targetClass, servicesOffered).addClass("active");
            }

            return false;
        });
    });
});


$(function () {
    var $root = $('html, body');
    $('#menu a').click(function () {
        var href = $.attr(this, 'href');
        $root.animate({
            scrollTop: $(href).offset().top
        }, 500, function () {
            window.location.hash = href;
        });
        return false;
    });
});


