var TuringCondition = function(state, value) {
	
	this.state = state;
	this.value = value;
};

var TuringCommand = function(input, move_dir, new_state) {
	
	this.input = input;
	this.move_dir = move_dir;
	this.new_state = new_state;
};

var TuringTransition = function(condition, command) {
	
	this.condition = condition;
	this.command = command;
};

/// q0,a->d,L,q1
function parseTransition(str) {
	var parts = str.split('->');
	var cond_parts = parts[0].split(',');
	var comm_parts = parts[1].split(',');
	
	var condition = new TuringCondition(cond_parts[0], cond_parts[1]);
	var command = new TuringCommand( comm_parts[0], comm_parts[1], comm_parts[2]);
	return new TuringTransition(condition , command); 
}

//===============================================================

var TuringStrip = function(canvas_id) {
	
	this.canvas = document.getElementById(canvas_id);
		
	this.canvas.style.width = '100%';
	this.canvas.width  = this.canvas.offsetWidth;
	this.canvas.height = 200;
	
	this.ctx = this.canvas.getContext('2d');	
	
	this.reset();
};

var cell_size = 40;
var cell_border = 2;

function drawCell(ctx, x, y, value) {	
	ctx.fillStyle = '#eeeeee';
	ctx.fillRect(x, y, cell_size, cell_size);
	ctx.beginPath();
	ctx.lineWidth = cell_border;
	ctx.strokeStyle = "black";
	ctx.rect(x, y, cell_size, cell_size); 
	ctx.stroke();
	
	ctx.fillStyle = '#000000';
	var font_size = 32;
	ctx.font = font_size + "px Courier";
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	var text_size = ctx.measureText(value);	
	ctx.fillText(value, x + (cell_size - text_size.width) / 2 , y  +  (cell_size - font_size) / 2 );
}

TuringStrip.prototype.drawMachine = function(x, y) {
	var ctx = this.ctx;
	ctx.fillStyle = '#ccccff';
	if(this.stop) {
		ctx.fillStyle = '#ffcccc';
	}	
	ctx.fillRect(x, y, cell_size, cell_size);
	
	ctx.beginPath();
	ctx.lineWidth = cell_border;
	ctx.strokeStyle = "black";
	ctx.rect(x, y, cell_size, cell_size); 
	ctx.stroke();
	
	ctx.fillStyle = '#000000';
	var font_size = 22;
	ctx.font = font_size + "px Courier bold";
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	var text_size = ctx.measureText(this.state);	
	ctx.fillText(this.state, x + (cell_size - text_size.width) / 2 , y  +  (cell_size - font_size) / 2 );
}

TuringStrip.prototype.draw = function() {
	this.canvas.width = this.canvas.width;
	
	var length = this.strip.length;
	var width = this.canvas.width;
	var height = this.canvas.height;
	var strip_width = length * cell_size;
	
	var start_x = (width - strip_width) / 2;
	var middle_y = (height - cell_size) / 2;
	
	var x = start_x;
	
	for(var i = 0; i < length; i++) {
		drawCell(this.ctx, x, middle_y, this.strip[i]);
		x += cell_size;
	}	
	
	x = start_x + this.caret_position * cell_size;
	var y = middle_y - cell_size;	
	this.drawMachine(x, y);
};

TuringStrip.prototype.reset = function() {	
	this.stop = false;
	this.strip = [' ', ' ', ' '];
	this.caret_position = 1;
	this.state = "!";
};

TuringStrip.prototype.get_current = function() {	
	return this.strip[this.caret_position];
};

TuringStrip.prototype.write = function(value) {
	//@todo validate value
	this.strip[this.caret_position] = value;
};

TuringStrip.prototype.move = function(dir) {
	switch(dir) {
		case('L'): {
			this.caret_position -= 1;
			if(this.caret_position == 0)
				this.strip.unshift(' ');
			break;
		}
		case('R'): {
			this.caret_position += 1;
			if(this.caret_position == this.strip.length - 1)
				this.strip.push(' ');
			break;
		}
		case('N'):
		default: 
			break;
	}
};

TuringStrip.prototype.setState = function(state) {
	//@todo validate state
	this.state = state;
	
	//@todo check stop state
	if(state == "!")
		this.stop = true;
	this.draw();
};

TuringStrip.prototype.setInput = function(value) {
	this.strip = value.split('');
	this.strip.unshift(' ');
	this.strip.push(' ');
	this.caret_position = 1;
};

TuringStrip.prototype.check = function(condition) {	
	return (this.state == condition.state) && (this.get_current() == condition.value);
};

TuringStrip.prototype.apply = function(command) { 
	if(this.stop)
		return;
	this.write(command.input);
	this.move(command.move_dir);
	this.setState(command.new_state);
	this.draw();
};
