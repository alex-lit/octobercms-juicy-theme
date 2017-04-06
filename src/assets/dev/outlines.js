// подсветка блоков
jQuery(document).ready(function ($) {
	var myFunction = function (a) {
	[].forEach.call($($("*")), function (a) {
			a.style.boxShadow = "inset 0 0 0 1px #" + (~~(Math.random() * (1 << 24))).toString(16)
		})
	};
	myFunction('*');
});