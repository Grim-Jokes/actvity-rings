function initWebGL(canvas) {
  var gl = null;
  
  // Try to grab the standard context. If it fails, fallback to experimental.
  gl = canvas.getContext('2d')
  
  // If we don't have a GL context, give up now
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser may not support it.');
  }
  
  canvas.width = 200;
  canvas.height = 200;
  
  return gl;
}

var gl = null;

var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

function start() {
  var canvas = document.getElementById('glCanvas');
  var canvas2 = document.getElementById('glCanvas2');

  // Initialize the GL context
  gl = initWebGL(canvas);
  gl2 = initWebGL(canvas2);
    
  // Only continue if WebGL is available and working
  if (!gl || !gl2) {
    return;
  }

  // Set clear color to black, fully opaque     
  draw_objects();
}

function draw_objects() {
	
	var graph = new Graph({
		x: 0,
		y: 0,
		radius: 20,
		startAngle: 270,
		endAngles: [
		{
			angle: 360, 
			color: "#FFFFFF",
			faded_color: "#666666"
		},
		{
			angle: 360 * 0.45, 
			color: "#AA44AA",
			faded_color: "#663366"
		},
		{
			angle: 360 * 0.8, 
			color: "#44AA44",
			faded_color: "#004400"
		},
		],
		speed: 1
	}, gl);
	graph.draw();
	
	var graph2 = new Graph({
		x: 0,
		y: 0,
		startAngle: 270,
		radius: 20,
		endAngles: [40, 70, 360, 90, 80],
		speed: 3
	}, gl2);
	
	// graph2.draw();
	
	
}
window.onload = start;