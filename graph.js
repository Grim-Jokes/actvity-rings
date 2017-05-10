function Graph(params, gl) {
	this.x = params.x || 75;
	this.y = params.y || 75;
	this.radius = params.radius || 50;
	this.gl = gl;
	this.speed = params.speed || 1;
	this.startAngle = params.startAngle  || 0;
	

	this.endAngles = [];

	params.endAngles.forEach((item) => {
		this.endAngles.push({
			current: this.startAngle, 
			target: (item.angle || item) + this.startAngle, 
			color: item.color || "#000000" , 
			faded_color: item.faded_color || "#444444",
			complete: false});
	});
	
	self.complete = false;
}

Graph.prototype = {
	
	_getDirection: function(index) {
		return this.startAngle > this.endAngles[index].target ? -1 : 1;
	},
	
	draw: function() {
		var self = this;
		
		var animate = function() {
			
			self.gl.clearRect(0, 0, screen.width, screen.height);
			
			self.endAngles.forEach((item, index) => {
				// self._draw_faded_ring(index);
				self._draw_ring(index);
				
				var direction = self._getDirection(index);
				self._updateAngle(index, direction)
			});
			
			if (!self._isComplete()) {
				requestAnimationFrame(animate);
			}
			else {
				if (self.onComplete) {
					self.onComplete();
				}
			}
		}
		
		animate();
	},
	
	_updateAngle: function(index, direction){
		var end_degrees = this.endAngles[index].target;
				
		if (this.endAngles[index].current <= end_degrees) {
			this.endAngles[index].current += direction * this.speed;
		}
		else {
			this.endAngles[index]['complete'] = true;
		}
	},
	
	_draw_faded_ring: function(index){
		var start_radians = 0 * (Math.PI / 180);
		var end_radians = 360 * (Math.PI / 180);
		
		this.gl.beginPath();
		this.gl.strokeStyle  = this.endAngles[index].faded_color;
		this.gl.arc(this.x, this.y, this.radius + index * 10, start_radians, end_radians, false);
		this.gl.stroke();
	},
	
	_draw_ring: function(index) {
		var start_radians = this.startAngle * (Math.PI / 180);
		var degree = this.endAngles[index].current;
		var end_radians = degree * (Math.PI / 180);
		var radius = this.radius + index * 10;
		
		var path = this.gl.beginPath();
		this.gl.strokeStyle  = this.endAngles[index].color;
		this.gl.arc(this.x, this.y, radius, start_radians, end_radians, false);
		this.gl.stroke();
		this.gl.closePath();
		
		
		var x = this.x + radius * Math.cos(end_radians);
		var y = this.y + radius * Math.sin(end_radians);
		
		this.gl.beginPath();
		this.gl.fillStyle = this.endAngles[index].color;
		this.gl.arc(x, y, 5, 0, 6, false);
		this.gl.fill();
	},
		
	_isComplete: function() {
		results = this.endAngles.filter((x)=> x.complete == false);
		return results.length == 0;
	}
}