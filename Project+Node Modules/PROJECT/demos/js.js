var tags = [];

$(function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;
  var scale = 0;
  var angle = 0;

  /* Enable Cross Origin Image Editing */
  var img = new Image();
  img.crossOrigin = '';
  img.src = 'image.jpg';

  img.onload = function() {
    if(img.width>760 || img.height>600){
      canvas.width = img.width;
      canvas.height = img.height;
      document.getElementById("mainImage").style.overflow = "scroll";
    }
    else{
      canvas.width = img.width;
      canvas.height = img.height;
      document.getElementById("mainImage").style.overflow = "hidden";
    }

    ctx.drawImage(img, 0, 0, img.width, img.height);
    ctx.font = "15pt Calibri";
  }

  var $reset = $('#resetbtn');
  var $brightness = $('#brightnessbtn');
  var $clarity = $('#claritybtn');
  var $zoomIn = $('#zoomIn');
  var $zoomOut = $('#zoomOut');
  var $rotateRight = $('#rotateRight');
  var $rotateLeft = $('#rotateLeft');
  var $AddTag = $('#AddTag');
  /* As soon as slider value changes call applyFilters */
  $('input[type=range]').change(applyFilters);

  function applyFilters() {
  var hue = parseInt($('#hue').val());
  var cntrst = parseInt($('#contrast').val());
  var vibr = parseInt($('#vibrance').val());
  var sep = parseInt($('#sepia').val());

  Caman('#canvas', img, function() {
    this.revert(false);
    this.hue(hue).contrast(cntrst).vibrance(vibr).sepia(sep).render();
  });
  }

  $reset.on('click', function(e) {
  $('input[type=range]').val(0);
  Caman('#canvas', img, function() {
    canvas.width = img.width;
    canvas.height = img.height;
    scale = 0;
    this.revert(false);
    this.render();
  });
  });

  $brightness.on('click', function(e) {
  Caman('#canvas', function() {
    this.brightness(10).render();
  });
  });

  $clarity.on('click', function(e) {
  Caman('#canvas', img, function() {
    this.clarity().render();
  });
  });
  $zoomIn.on('click', function(e) {
  var img = new Image();
  img.crossOrigin = '';
  img.src = 'image.jpg';
  scale+=20;
  img.width+=scale;
  img.height+=scale;
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  });

  $zoomOut.on('click', function(e) {
  var img = new Image();
  img.crossOrigin = '';
  img.src = 'image.jpg';
  scale-=20;
  img.width+=scale;
  img.height+=scale;
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  });

  $rotateRight.on('click', function(e) {
  angle+=90;
  document.getElementById("canvas").style.transform = "rotate("+angle+"deg)";
  });

  $rotateLeft.on('click', function(e) {
  angle-=90;
  document.getElementById("canvas").style.transform = "rotate("+angle+"deg)";
  });

  $AddTag.on('click', function(e) {
  var x = document.getElementById('X');
  var y = document.getElementById('Y');
  var text = document.getElementById('text');
  tags.push({
	  Column1: x;
	  Column2: y;
	  Column3: text;
  });
  
  
  ctx.drawImage(img, 0, 0, img.width, img.height);
  for (var i = 0; i < tags.length; i+3) {
	ctx.fillText(tags[i+2], parseInt(tags[i]),parseInt(tags[i+1]));
  }
  });

  $('input[type=file]').change(function () {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var width = ctx.canvas.width;
	var height = ctx.canvas.height;
    var img = new Image();
	img.crossOrigin = '';
	img.src = this.files[0].mozFullPath;
	if(img.width>760 || img.height>600){
      canvas.width = img.width;
      canvas.height = img.height;
      document.getElementById("mainImage").style.overflow = "scroll";
    }
    else{
      canvas.width = img.width;
      canvas.height = img.height;
      document.getElementById("mainImage").style.overflow = "hidden";
    }

    ctx.drawImage(img, 0, 0, img.width, img.height);
    ctx.font = "15pt Calibri";
	
	});
  $(document).ready(function() {
  $('canvas').click(function(e) {
    var offset = $(this).offset();
    var x = e.pageX - offset.left;
    var y = e.pageY - offset.top;
    var inputX = document.getElementById('X');
    var inputY = document.getElementById('Y');
    inputX.value = x;
    inputY.value = y;
  });
  });


});
