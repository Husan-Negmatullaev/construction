	sectors($(this).scrollTop());
$(window).scroll(function(event) {
		var scr=$(this).scrollTop();
	sectors(scr);

	if($('.__fix-block').length>0){
		fix_block(scr);
	}
});
function sectors(scr){
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var headerheight=80;
	if(w<768){headerheight=50;}
	if(scr>0){
		$('header').addClass('scroll');
	}else{
		$('header').removeClass('scroll');
	}
	if(scr>h){
		$('#up').fadeIn(300);
	}else{
		$('#up').fadeOut(300);
	}
	$.each($('.sector'), function(index, val) {
			var th=$(this).outerHeight();
			var tot=$(this).offset().top;
		if(scr>=tot && scr<=tot+th-h){
			$('.sector.scroll').removeClass('scroll');
			$(this).addClass('scroll');
		}
		if($(this).hasClass('scroll')){
			if(scr>=tot && scr<=tot+th-h){
				if($(this).hasClass('normalscroll')){
					$('body').addClass('scroll');
				}else{
					$('body').removeClass('scroll');
				}
			}else{
				if($(this).hasClass('normalscroll')){
					$('body').removeClass('scroll');
				}
			}
		}
		if(scr>tot-h/1.5 && scr<tot+th){
			if($('.dotts').length>0){
				dotts(index,0);
			}
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}
		if(scr>tot-h && scr<tot+th){
			$(this).addClass('view');
			if($(this).hasClass('padding')){
					var ps=100-(tot-scr)/h*100;
					var p=headerheight/100*ps;
				if(p>=headerheight){p=headerheight;}
				$(this).css({paddingTop:p});
			}
		}else{
			$(this).removeClass('view');
		}
	});
	/*
	$.each($('.lz').not('.load'), function(index, val) {
			var th=$(this).outerHeight();
			var tot=$(this).offset().top;
			var img=$(this).data('image');
			var video=$(this).data('video');
			if(navigator.appVersion.indexOf("Mac")!=-1){
				var video=$(this).data('videomov');
			}
		if(scr>tot-h && scr<tot+th){
			if(img!='' && img!=null){
				$(this).html('<img src="'+img+'" alt="" />');
			}
			if(video!='' && video!=null){
				$(this).html('<video loop autoplay playsinline muted src="'+video+'"></video>');
			}
			$(this).addClass('load');
			$(this).parents('.slick-slider').slick('setPosition');
		}
	});
	ibg();
	*/
}

function fix_block(ind,init){
		let w=$(window).outerWidth();
		let h=$(window).outerHeight();
		let h_head=$('header').outerHeight();
	$.each($('.__fix-block'), function(index, val) {
			let block=$(this);
			let item=block.find('.__fix-item');
		if(item.outerHeight()<h-(h_head+30)){
			if(scr>block.offset().top-(h_head+15)){
				item.css({
					position: 'fixed',
					bottom:'auto',
					top:15+h_head,
					width:block.outerWidth(),
					left:block.offset().left
				});
			}else{
				gotoRelative(item);
			}
			if(scr>(block.outerHeight()+block.offset().top)-(item.outerHeight()+(h_head+15))){
				block.css({position: 'relative'});
				item.css({
					position: 'absolute',
					top:'auto',
					bottom:0,
					left:0
				});
			}
		}else{
			gotoRelative(item);
		}
	});
	function gotoRelative(item){
		item.css({
			position: 'relative',
			top:0,
			bottom:'auto',
			left:0
		});
	}
}
function dotts(ind,init){
	if(init==true){
		$.each($('.sector'), function(index, val) {
			$('.dotts-list').append('<li></li>');
		});
	}
	$('.dotts-list li').removeClass('active').eq(ind).addClass('active');
}
$('body').on('click', '.dotts-list li', function(event) {
		var n=$(this).index()+1;
		var offset=0;
	$('body,html').animate({scrollTop: $('.sector-'+n).offset().top+offset},800, function() {});
});