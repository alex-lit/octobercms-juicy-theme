/* ************************************************************
* JQuery.pixLayout by Anton Karabut 
* http://polycreative.ru
* ============================================= *      
* Version 0.9.7 (2012-10-11)
* Copyright (c) 2012 Anton Karabut (poly@polycreative.ru)
*
*  This library is free software; you can redistribute
*  it and/or modify it under the terms of the GNU
*  Lesser General Public License as published by the
*  Free Software Foundation; either version 2.1 of the
*  License, or (at your option) any later version.
*
*  This library is distributed in the hope that it will
*  be useful, but WITHOUT ANY WARRANTY; without even the
*  implied warranty of MERCHANTABILITY or FITNESS FOR A
*  PARTICULAR PURPOSE. See the GNU Lesser General Public
*  License for more details.
*
*  You should have received a copy of the GNU Lesser
*  General Public License along with this library;
*  Inc., 59 Temple Place, Suite 330, Boston,
*  MA 02111-1307 USA
**************************************************************/
if (jQuery){
	(function ($) {
		$.extend({
			pixlayout : function (data, context) {
				context = context || $("body");
				var settings = {
					src : 'http://pixlayout.polycreative.ru/img/no.gif',
					opacity : 0.5,
					step : 1,
					top: 0,
					center: false,
					left: 0,
					right: 0,
					zindex: 9999,
					clip: false,
					fixed: false,
					mini: false,
					show: false,
					pervious: false 
				};
				if( typeof data === 'string' ){
					settings.src = data;
				}else{
					$.extend(settings, data);
				}
				var pxl = '<div id="pxl_wrap"><div class="pxl_panel_wrap"><div class="pxl_panel"><div class="pxl_hat"><div class="pxl_title">pixLayout</div><div class="pxl_buttons"><div class="pxl_about_button" data="about"></div><div class="pxl_clip_button" data="clip"></div><div class="pxl_cross_button" data="destroy"></div></div></div><div class="pxl_nav"><div class="pxl_tl" data="top left"></div><div class="pxl_t" data="top"></div><div class="pxl_tr" data="top right"></div><div class="pxl_l" data="left"></div><div class="pxl_show" data="show / hide"></div><div class="pxl_r" data="right"></div><div class="pxl_bl" data="bottom left"></div><div class="pxl_b" data="bottom"></div><div class="pxl_br" data="bottom right"></div></div><div class="pxl_clear"></div><div class="pxl_settings"><div class="pxl_src"><input type="text" value="'+settings.src+'" title="src" /></div><div class="pxl_opacity"><input type="text" value="'+settings.opacity+'" />opacity</div><div class="pxl_step"><input type="text" value="'+settings.step+'" />step</div><div class="pxl_zindex"><input type="text" value="'+settings.zindex+'" />z-index</div><div class="pxl_top"><input type="text" value="'+settings.top+'" />top</div><div class="pxl_left"><input type="text" value="'+settings.left+'" />left</div><div class="pxl_right"><input type="text" value="'+settings.right+'" />right</div><div class="pxl_switch"><div class="pxl_center pxl_bool"></div><div class="pxl_switch_txt">center</div></div><div class="pxl_switch"><div class="pxl_fixed pxl_bool"></div><div class="pxl_switch_txt">fixed</div></div><div class="pxl_switch"><div class="pxl_pervious pxl_bool"></div><div class="pxl_switch_txt">pervious</div></div></div><div class="pxl_roll pxl_arrow_up"></div></div></div><div class="pxl_about"><div><b>jquery.pixLayout* Version: 0.9.7 (2012-10-11)</b><br />Copyright (c) 2012 Anton Karabut (poly@polycreative.ru) <br />free for editing and distribution<br /></div><div>	options:<ol><li>src: [string]"path to image"</li><li>opacity: [float] 0.0 - 1.0</li><li>step, top, left, right, zindex: [integer] 1 - infinity</li><li>clip, center, fixed, mini, show, pervious: [boolean] true or false</li>	</ol></div><div>move:<ol><li>“left”, “right”, “up”, “down” buttons</li><li>w,a,s,d buttons when the picture is visible</li><li>blue rectangles on the sides of the navigation bar</li></ol></div><div>operations:<ol><li>Destroy (deleting all pixLayout blocks on page) - cross in the upper right corner of the panel</li><li>Clip - clip in the upper right corner of the panel</li><li>About - question mark icon in the upper right corner of the panel</li><li>Show / hide - central icon in the navigation bar</li></ol></div><span>learn more: <a href="http://pixlayout.polycreative.ru">pixlayout.polycreative.ru</a></span></div><div class="pxl_pic"><img src="'+settings.src+'" /></div></div>';
				var clip = false;
				var pxl_vis = false;
				var drug = false;
				var created = false;
				var focused = false;
				var position = "absolute";
				var p_events = "auto";
				var temp_input = "";
				var pos, realX, realY, pic_width, pic_height, pic_width_temp, pic_height_temp, curX, curY, $pxl_pic;
				var init = function () {
					$(context).append(pxl);
					document.onselectstart = function(){return false;};
					$pxl_pic = $('.pxl_pic');
					$pxl_img = $(".pxl_pic img");
					for (var opt in settings){
						check_options(opt);
					}
					styles();
					$pxl_img.load(function(){
						if (!created) {
							show();
							move();
							hat();
							nav();
							sett();
						}
					});
				};
				// show
				var show = function () {
					$('.pxl_show').fadeIn(200).click(function () {
						if (!pxl_vis) {
							if (!created) {
								created = true;
								$pxl_pic.fadeIn(200, function(){
									tuning();
									if(settings.left === 0 && settings.right === 0){
										settings.left = 0;
										set_directions("right");
									}else if (settings.left !== 0 &&  settings.right === 0){
										set_directions("right");
									}else if (settings.right !== 0 &&  settings.left === 0) {
										set_directions("left");
									}else{
										set_directions("right");
									}
									if(settings.center) {
										settings.left = ($(window).width() - $pxl_pic.width()) / 2;
										$(".pxl_center").addClass("true");						
										set_directions("right");
									}
								});
								pxl_vis = true;
							} else {
								$pxl_pic.fadeIn(200);
								pxl_vis = true;
							}
						} else {
							$('.pxl_pic').fadeOut(200);
							pxl_vis = false;
						}
					});
					if(settings.show){
						$('.pxl_show').click();
					}
					if(settings.fixed){
						position = "fixed";
						$pxl_pic.css("position",position);
						$(".pxl_fixed").addClass("true");
					}
					if(settings.pervious){
						p_events = "none";
						$pxl_pic.css("pointerEvents",p_events);
						$(".pxl_pervious").addClass("true");
					}
					if(settings.clip){
						$('.pxl_panel').css("right", "0px");
						$('.pxl_clip_button').fadeTo(200, 1.0);
						clip = true;
					}
					if(settings.mini){
						$('.pxl_settings').slideUp(0);
						$(".pxl_roll").addClass('pxl_arrow_down').removeClass('pxl_arrow_up');
					}
					$('.pxl_panel_wrap').hover(function () {
						if(!clip){
							$('.pxl_panel').fadeIn(350).animate({
								right: "0px"
							}, {queue:false,duration: 200});
						}
					}, function () {
						if(!clip){
							$('.pxl_panel').fadeOut(150).animate({
								right: "-134px"
							}, {queue:false,duration: 200});
						}
					});
					$(".pxl_roll").click(function(){
						var s = $('.pxl_settings');
						if(settings.mini){
							s.slideDown(200);
							$(this).removeClass('pxl_arrow_down').addClass('pxl_arrow_up');
							settings.mini = false;
						}else{
							if(!settings.clip){
								switch_clip(true, $('.pxl_clip_button'));
							}
							s.slideUp(200);
							$(this).addClass('pxl_arrow_down').removeClass('pxl_arrow_up');
							settings.mini = true;
						}
					});
				};
				// move
				var move = function () {
					$('.pxl_pic').mousedown(function (e) {
						drug = true;
						curX = e.pageX;
						curY = e.pageY;
						pos = $pxl_pic.position();
						realX = pos.left - curX;
						if(settings.fixed){
							realY = pos.top - curY - $(window).scrollTop();
						}else{
							realY = pos.top - curY;
						}
						settings.center = false;
						$(".pxl_center").removeClass("true");
					});
					$('.pxl_pic').mouseup(function () {
						drug = false;
					});
					$('body').mousemove(function (e) {
						if (drug) {
							settings.top = e.pageY + realY;
							settings.left = e.pageX + realX;
							set_directions("right");
							tuning();
							$(".pxl_right input").val(settings.right);
							$pxl_pic.css({
								top : settings.top,
								left : settings.left,
								right: settings.right
							});
						}
					});
				};
				// hat
				var hat = function () {
					$('.pxl_about_button').toggle(function(){
						$(this).fadeTo(200, 1.0);
						$('.pxl_about').fadeIn(200).animate({top: "200px"}, {queue:false,duration: 200});
					}, function(){
						$(this).fadeTo(200, 0.8);
						$('.pxl_about').animate({top: "100px"}, {queue:false, duration: 200}).fadeOut(200);
					});
					$('.pxl_clip_button').click(function(){
						switch_clip(false, $(this));
					});
					$('.pxl_cross_button').click(function(){$('#pxl_wrap, .pxl_styles').remove();});
				};
				// navigantion
				var nav = function () {
					$('.pxl_nav div').not('.pxl_show').click(function () {
						if(created && !focused){
							step = parseInt(settings.step);
							switch ($(this).attr('class')) {
							case 'pxl_tl':
								settings.left -= step;
								settings.top -= step;
								break;
							case 'pxl_t':
								settings.top -= step;
								break;
							case 'pxl_tr':
								settings.left += step;
								settings.top -= step;
								break;
							case 'pxl_l':
								settings.left -= step;
								break;
							case 'pxl_r':
								settings.left += step;
								break;
							case 'pxl_bl':
								settings.top += step;
								settings.left -= step;
								break;
							case 'pxl_b':
								settings.top += step;
								break;
							case 'pxl_br':
								settings.top += step;
								settings.left += step;
								break;
							}
							set_directions("right");
						}
					});
					$(window).bind('keydown', function (e) {
						var code = e.keyCode;
						if(!focused){
							if(created && !e.shiftKey){
								step = parseInt(settings.step);
								if (code === 37 || (code === 65 && pxl_vis)) {
									settings.left -= step;
								} else if (code === 38 || (code === 87 && pxl_vis)) {
									settings.top -= step;
								} else if (code === 39 || (code === 68 && pxl_vis)) {
									settings.left += step;
								} else if (code === 40 || (code === 83 && pxl_vis)) {
									settings.top += step;
								} else if (code > 48 && code < 58) {
									settings.step = String.fromCharCode(e.keyCode);
									$(".pxl_step").val(settings.step);
								}
								set_directions("right");
								tuning();
							}else if(e.shiftKey && code === 69){
								$('.pxl_show').click();
							}
						}
					});
					$('.pxl_step').change(function () {
						settings.step = $(this).val();
					});
				};
				// settings
				var sett = function () {
					var temp_left = settings.left;
					$('.pxl_center').click(function(){
						if(created){
							if(settings.center){
								settings.center = false;
								settings.left = temp_left;
								set_directions("right");
								$(this).removeClass("true");
							}else{
								settings.center = true;
								temp_left = settings.left;
								settings.left = ($(context).width() - $pxl_pic.width()) / 2;
								$(this).addClass("true");
							}
							set_directions("right");
						}
					});
					$('.pxl_fixed').click(function(){
						if(created){
							if(settings.fixed){
								settings.fixed = false;
								position = "absolute";
								$(this).removeClass("true");
							}else{
								settings.fixed = true;
								position = "fixed";
								$(this).addClass("true");
							}
							$pxl_pic.css("position", position);
						}
					});
					$('.pxl_pervious').click(function(){
						if(created){
							if(settings.pervious){
								settings.pervious = false;
								p_events = "auto";
								$(this).removeClass("true");
							}else{
								settings.pervious = true;
								p_events = "none";
								$(this).addClass("true");
							}
							$pxl_pic.css("pointerEvents",p_events);
						}
					});
					$(".pxl_settings input").blur(function(){
						focused = false;
						if(created){
							var $this = $(this);
							var name = $this.parent().attr("class").split("_")[1];
							if(name !== "src"){
								settings[name] = $this.val();
								check_options(name);
							}else{
								settings.src = $this.val();
								$(".pxl_pic img").attr("src", settings.src);
								$pxl_pic = $('.pxl_pic');
								$pxl_img = $(".pxl_pic img");
							}
							tuning();
						}
					}).focus(function(){
						focused = true;
						temp_input = $(this).parent().attr("class");
					}).bind('mousewheel',function(event){
						if(focused && ($(this).parent().attr("class") === temp_input) ){
							var val = parseInt($(this).val());
							var opacity = $(this).parent().hasClass("pxl_opacity");
							var delta = event.originalEvent.wheelDelta > 0;
							if(opacity){
								step = .1;
								val = parseFloat($(this).val());
								if(delta){
									$(this).val((val+0.1).toFixed(1));
								}else{
									$(this).val((val-0.1).toFixed(1));
								}
							}else{
								if(delta){
									$(this).val(val+1);
								}else{
									$(this).val(val-1);
								}
							}
						}
					});

					$(".pxl_buttons div, .pxl_nav div").hover(function(){
						$(".pxl_title").text($(this).attr("data"));
					},function(){
						$(".pxl_title").text("pixLayout");
					});
				};
				// switch clip
				var switch_clip = function(on, $button){
					if(on || !clip){
						$button.fadeTo(200, 1.0);
						clip = true;
					}else{
						$button.fadeTo(200, 0.8);
						clip = false;
					}
				};
				// set directions
				var set_directions = function(dir){
					var anti = "left";
					if(dir === "left"){anti = "right";}
					settings[dir] = $(window).width() - (settings[anti]+$pxl_pic.width());
					tuning();
				};
				var check_options = function(name){
					var val = parseFloat(settings[name]);
					if(isNaN(val)){
						if(name === "src" || "center" || "fixed" || "clip" || "mini" || "show" ){
							val = settings[name];
						}else{
							val = 1;
						}
					}
					settings[name] = val;
					$(".pxl_"+name+">input").val(val);
				};
				var check_img = function () {
					$pxl_img.load(function(){
						img_loaded = true;
					});
				};
				// tuning
				var tuning = function () {
					pic_width = $pxl_img.width();
					pic_height = $pxl_img.height();
					if(pic_width){
						pic_width_temp = pic_width;
						pic_height_temp = pic_height;
					}else{
						pic_width = pic_width_temp;
						pic_height = pic_height_temp;
					}
					settings.top = parseInt(settings.top);
					settings.left = parseInt(settings.left);
					settings.right = parseInt(settings.right);
					settings.zindex = parseInt(settings.zindex);
					$pxl_pic.css({
						opacity : parseFloat(settings.opacity),
						background : 'url(' + settings.src + ') no-repeat',
						width : pic_width,
						height : pic_height,
						top: settings.top+"px",
						left: settings.left+"px",
						right: settings.right+"px",
						zIndex: settings.zindex,
						position: position
					});
					$(".pxl_about, .pxl_panel_wrap, .pxl_bool").css("zIndex", settings.zindex+1);
					$(".pxl_left input").val(settings.left);
						
					$(".pxl_right input").val(settings.right);
					$(".pxl_top input").val(settings.top);
					return pic_width;
				};
				// styles
				var styles = function () {
					var css = '<style type="text/css">#pxl_wrap * {box-sizing: content-box;}html, body {*height:100%;}#pxl_wrap, #pxl_wrap div {background:transparent;border:0;color:#9dc8f2;font-size:9px;vertical-align:center;padding:0;outline:none;line-height:9px;float:none;font-style:normal;display:block;font-weight:normal;margin:0;position:static;cursor:default;font-variant:normal;visibility:visible;white-space:normal;overflow:hidden;height:auto;bottom:auto;}#pxl_wrap {color:#9dc8f2;font-family:Arial}#pxl_wrap .pxl_clear{clear:both;width:0;height:0;*height:1%;}#pxl_wrap .pxl_arrow_down{background-image:url(data:image/gif;base64,R0lGODlhBQADAIABAJ3I8v///yH5BAEAAAEALAAAAAAFAAMAAAIFhB0XC1sAOw==)!important;}#pxl_wrap .pxl_arrow_up {background-image:url(data:image/gif;base64,R0lGODlhBQADAIABAJ3I8v///yH5BAEAAAEALAAAAAAFAAMAAAIFTGAHuF0AOw==)!important;}#pxl_wrap .pxl_panel_wrap {position:fixed;top:0;right:0;width:104px;height:344px;z-index:10000}#pxl_wrap .pxl_panel{position:fixed;top:0;right:-104px;width:84px;font-size:9px;line-height:1;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9JREFUeNpiYGBg2AwQYAAAuAC01qHx9QAAAABJRU5ErkJggg==);padding:5px 10px 10px;height:auto;}#pxl_wrap .pxl_hat{height:9px;margin-bottom:6px}#pxl_wrap .pxl_title{float:left;width:56px}#pxl_wrap .pxl_buttons{float:left;width:28px;height:7px;margin-top:1px;cursor:pointer}#pxl_wrap .pxl_buttons div{float:left;width:7px;height:7px;background-repeat:no-repeat;opacity:0.8;filter: alpha(opacity=80);cursor:pointer;}#pxl_wrap .pxl_buttons .pxl_about_button{padding-right:5px;background-image:url(data:image/gif;base64,R0lGODlhBQAHAIABAJ3I8v///yH5BAEAAAEALAAAAAAFAAcAAAIKDG6hoLvsmkyhAAA7);width:5px;}#pxl_wrap .pxl_buttons .pxl_clip_button{padding-right:4px;background-image:url(data:image/gif;base64,R0lGODlhBwAHAIABAJ3I8v///yH5BAEAAAEALAAAAAAHAAcAAAINDH5hoLzdHENUGWtdKAA7)}#pxl_wrap .pxl_buttons .pxl_cross_button{background-image:url(data:image/gif;base64,R0lGODlhBwAHAIABAJ3I8v///yH5BAEAAAEALAAAAAAHAAcAAAIKRH5miYr8HAyyFQA7);}#pxl_wrap .pxl_nav{width:84px;height:84px;margin-bottom:10px}#pxl_wrap .pxl_nav div{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpimHviUwNAgAEABzUC2Aw5loEAAAAASUVORK5CYII=);float:left;cursor:pointer;}#pxl_wrap .pxl_tl{width:20px;height:20px;border-top:3px solid #9dc8f2;border-left:3px solid #9dc8f2;margin:0 7px 7px 0}#pxl_wrap .pxl_t{width:24px;height:20px;border-top:3px solid #9dc8f2;margin:0 7px 7px 0}#pxl_wrap .pxl_tr{width:20px;height:20px;border-top:3px solid #9dc8f2;border-right:3px solid #9dc8f2;margin:0 0 7px}#pxl_wrap .pxl_l{width:20px;height:24px;border-left:3px solid #9dc8f2;margin:0 7px 7px 0}#pxl_wrap .pxl_nav .pxl_show{width:24px;height:24px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEZJREFUeNpinHviUwMDDQETA43B0LeABYtYPYVmNg7/IMLpXTygfmSlImKDoXE0J9M9DhpHg4ikHDqyg6hxNKPR1QKAAAMAbMsHlFVSABkAAAAASUVORK5CYII=);background-repeat:no-repeat;margin:0 7px 7px 0}#pxl_wrap .pxl_r{width:20px;height:24px;border-right:3px solid #9dc8f2;margin:0 0 7px}#pxl_wrap .pxl_bl{width:20px;height:20px;border-bottom:3px solid #9dc8f2;border-left:3px solid #9dc8f2;margin-right:7px}#pxl_wrap .pxl_b{width:24px;height:20px;border-bottom:3px solid #9dc8f2;margin-right:7px}#pxl_wrap .pxl_br{width:20px;height:20px;border-bottom:3px solid #9dc8f2;border-right:3px solid #9dc8f2}#pxl_wrap .pxl_settings{font-size:9px;*margin-top:-10px;height:auto;width:84px;}#pxl_wrap .pxl_settings div {width:84px;height:22px;}#pxl_wrap .pxl_settings input, #pxl_wrap .pxl_switch .pxl_bool{width: 39px;height:8px;background:transparent;border:1px solid #576f87;color:#9dc8f2;font-size:9px;vertical-align:center;padding:2px 0px 0px 2px;outline:none;line-height:9px;*position:relative;*bottom:-10px;*left:0;*right:0;*top:0;float:none;font-style:normal;display:inline;font-weight:normal;font-family:Arial;margin:0 5px 10px 0;position:static;cursor:text;font-variant:normal;max-width:44px;visibility:visible;white-space:normal;}#pxl_wrap .pxl_src input {width:80px;max-width:80px;height:10px;}#pxl_wrap .pxl_settings .pxl_switch .pxl_bool{position:static;cursor:pointer;padding-top:1px;padding-bottom:1px;float:left;margin-right:5px;padding: 3px;width: 5px;height: 5px;margin-left: 30px;}#pxl_wrap .pxl_settings .pxl_switch .pxl_bool.true{background-image:url(data:image/gif;base64,R0lGODlhBwAHAIABAJ3I8v///yH5BAEAAAEALAAAAAAHAAcAAAIKRH5miYr8HAyyFQA7);background-repeat:no-repeat;background-position:2px 2px;}#pxl_wrap .pxl_settings .pxl_switch_txt{float:left;margin-top:2px;*margin-top:10px;width: 36px;}#pxl_wrap .pxl_roll{position:absolute;top:auto;bottom:0;left:0;width:104px;background-position:50% 50%;background-repeat:no-repeat;height:9px;cursor:pointer}#pxl_wrap .pxl_roll:hover{background-color:#27323d}#pxl_wrap .pxl_about{position:fixed;width:370px;left:50%;top:100px;margin-left:-185px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9JREFUeNpiYGBg2AwQYAAAuAC01qHx9QAAAABJRU5ErkJggg==);padding: 10px 10px 15px 10px;font-size: 12px;display:none;}#pxl_wrap .pxl_about ol{padding-left:20px;margin:5px;}#pxl_wrap .pxl_about div{margin:5px;font-size:11px;line-height:13px;}#pxl_wrap .pxl_about span{margin-left:5px}.pxl_about a,.pxl_about a:visited{color:#9dc8f2}#pxl_wrap .pxl_pic {margin:0;padding:0;cursor:move;position:absolute;z-index: 9999; pointer-events: none;}#pxl_wrap .pxl_pic img {position:relative;display:none;}</style><!--[if lt IE 9]><style type="text/css" class="pxl_styles">#pxl_wrap .pxl_panel {background: black;} #pxl_wrap .pxl_settings input, #pxl_wrap .pxl_center{padding:1px 0px 2px 2px;} #pxl_wrap .pxl_about {background: black;} #pxl_wrap .pxl_panel {*background: black;} #pxl_wrap .pxl_nav div {background: #4e6479;}</style><![endif]-->';
					$("head").append(css);
				};
				init();
				return this;
			}
		});
	})(jQuery);
}