	scrollpause=500;
if(navigator.appVersion.indexOf("Mac")!=-1){
	scrollpause=1000;
};
if(!isMobile.any()){
	$(document).bind('DOMMouseScroll wheel MozMousePixelScroll onmousewheel touchmove mousewheel keyup', function(event){
			var w=$(window).outerWidth();
			var h=$(window).outerHeight();
		if(h>700 && w>992){
			if(!$('.popup').hasClass('active') && !$('body').hasClass('scrollblock') && !$('body').hasClass('scroll')){
					var scl=$(window).scrollTop();
					var active=$('.sector.scroll');
					var nextslide=active.next('.sector').index()+1;
					var prevslide=active.prev('.sector').index()+1;
					var offset=0;
				if(event.keyCode==40 || event.keyCode==34 || event.deltaX>0 || event.deltaY<0){
					if(nextslide>0){
						$('body').addClass('scrollblock').removeClass('scroll');
						gotoslide(nextslide,offset);
					}
					if($('.sector.normalscroll').hasClass('scroll')){
							var nslide=$('.sector.normalscroll.active').index()+1;
						$('body').addClass('scrollblock').removeClass('scroll');
						gotoslide(nslide,offset);
					}
				}else if(event.keyCode==38 || event.keyCode==33 || event.deltaX<0 || event.deltaY>0){
					if(prevslide>0){
						$('body').addClass('scrollblock').removeClass('scroll');
						if($('.sector').eq(prevslide-1).hasClass('normalscroll')){
							offset=$('.sector').eq(prevslide-1).outerHeight()-h;
						}
						gotoslide(prevslide,offset);
					}
					if($('.sector.normalscroll').hasClass('scroll')){
							var pslide=$('.sector.active').not('.normalscroll').index()+1;
						$('body').addClass('scrollblock').removeClass('scroll');
						gotoslide(prevslide,offset);
					}
				}
			}
			if(!$('body').hasClass('scroll')){
				//window.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
				return false;
			}else if($('body').hasClass('scrollblock')){
				//window.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
				return false;
			}
		}
	});
}
function gotoslide(n,offset) {
	if($('.sector-'+n).length>0){
			$('body').addClass('scrollblock');
		$('body,html').animate({scrollTop: $('.sector-'+n).offset().top+offset},800, function() {
			setTimeout(function() {
				$('body').removeClass('scrollblock');
			},scrollpause);
		});
	}
}
$('.mainblock-scroll').click(function(event) {
		$('body').addClass('scrollblock');
	$('body,html').animate({scrollTop:$('.maincontent').offset().top},800, function() {
		setTimeout(function() {
			$('body').removeClass('scrollblock');
		},scrollpause);
	});
});