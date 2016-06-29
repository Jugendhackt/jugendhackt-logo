'use strict';

function newStyle(e) {
	var style_name = e.value;
	var style_element  = document.getElementById('logo_style');
	style_element.href = 'css/' + style_name +'.css';
}

function blink(id) {
	var eye = document.getElementById(id);
	var blink_class = "blink";
	if (! eye.classList.contains(blink_class))
		eye.classList.add(blink_class);
	var new_eye = eye.cloneNode(true);

	eye.parentNode.replaceChild(new_eye, eye);

	var wait_amount = 5000*Math.random();

	if (wait_amount < 1000)
		wait_amount += 1000;

	setTimeout(blink, wait_amount, id);
}

function toggleUrl() {
	var e = document.getElementById("url");
	if(e.style.display != 'none')
        e.style.display = 'none';
    else
        e.style.display = 'block';
}

function getPNG() {
	console.log(document.getElementById("jh_logo"));
	savePng(document.getElementById("jh_logo"), 'jh_logo.png', {scale: 100})
}



blink("left_eye");
blink("right_eye");