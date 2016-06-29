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

savePng = function(el, name, options) {

  options = options || {};
  options.scale = options.scale || 1;
  var border = options.border || 10;

  var outer = document.createElement("div");
  var clone = el.cloneNode(true);
  var width, height;

  width = el.viewBox.baseVal['width']
  height = el.viewBox.baseVal['height']

  clone.setAttribute("width", width * options.scale);
  clone.setAttribute("height", height * options.scale);

  outer.appendChild(clone);

  var s = document.createElement('style');
  s.setAttribute('type', 'text/css');
  s.innerHTML = styles(el, options.selectorRemap);
  clone.insertBefore(s, clone.firstChild);

  var svg = outer.innerHTML;
  var uri = 'data:image/svg+xml;base64,' + window.btoa(svg);

  var image = new Image();
    image.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = image.width + border*2;
      canvas.height = image.height + border*2;
      var context = canvas.getContext('2d');
      context.drawImage(image, border, border);
      var a = document.createElement('a');
      var png = canvas.toDataURL('image/png');
      download(name, png);
    }
    image.src = uri;
}

function download(name, uri) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}
