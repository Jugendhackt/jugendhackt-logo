function styles(el, selectorRemap) {
  var css = "";
  var sheets = document.styleSheets;
  for (var i = 0; i < sheets.length; i++) {
    var rules = sheets[i].cssRules;
    for (var j = 0; j < rules.length; j++) {
      css += rules[j].cssText + '\n';
    }
  }
  return css;
}

savePng = function(el, name, options, target) {
  console.log("Saving png");

  options = options || {};
  options.scale = options.scale || 1;
  var border = options.border || 10;

  console.log("Creating div for image");

  var outer = document.createElement("div");
  var clone = el.cloneNode(true);
  var width, height;

  width = el.viewBox.baseVal['width']
  height = el.viewBox.baseVal['height']

  clone.setAttribute("width", width * options.scale);
  clone.setAttribute("height", height * options.scale);

  outer.appendChild(clone);
  console.log("Applying stiles");
  var s = document.createElement('style');
  s.setAttribute('type', 'text/css');
  s.innerHTML = styles(el, options.selectorRemap);
  clone.insertBefore(s, clone.firstChild);
  console.log("Rendering svg in div");
  var svg = outer.innerHTML;
  var uri = 'data:image/svg+xml;base64,' + window.btoa(svg);

  var image = new Image();
    image.onload = function() {
      console.log("Creating canvas");
      var canvas = document.createElement('canvas');
      canvas.width = image.width + border*2;
      canvas.height = image.height + border*2;
      console.log("Getting context");
      var context = canvas.getContext('2d');
      console.log("Drawing image");
      context.drawImage(image, border, border);
      console.log("Getting canvas as data url");
      var a = document.createElement('a');
      var png = canvas.toDataURL('image/png');
      console.log("Creating link for "+uri);
      target.download = name;
      target.href = png;
    }
    image.src = uri;
}
