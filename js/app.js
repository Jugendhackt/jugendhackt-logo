
function newStyle(e) {
	style_name = e.value;
	var style_element  = document.getElementById('logo_style');
	style_element.href = 'css/' + style_name +'.css';

}