//@todo move to canvas options
var cell_size = 40; 
var cell_border = 2;

var TuringMachineCanvas = function(canvas_id) {
	
	this.machine = null;	
	this.canvas = document.getElementById(canvas_id);
		
	this.canvas.style.width = '100%';
	this.canvas.width  = this.canvas.offsetWidth;
	this.canvas.height = 200;
	
	this.ctx = this.canvas.getContext('2d');	
};

TuringMachineCanvas.prototype.setMachine = function(machine) {
	this.machine = machine;
	this.draw();
};

TuringMachineCanvas.prototype.draw = function() {
	this.canvas.width = this.canvas.width;
	
	var length = this.machine.strip.cells.length;
	var width = this.canvas.width;
	var height = this.canvas.height;
	var strip_width = length * cell_size;
	
	var start_x = (width - strip_width) / 2;
	var middle_y = (height - cell_size) / 2;
	
	var x = start_x;
	
	for(var i = 0; i < length; i++) {
		this.drawStripCell(x, middle_y, this.machine.strip.cells[i]);
		x += cell_size;
	}	
	
	x = start_x + this.machine.strip.caret_position * cell_size;
	var y = middle_y - cell_size;	
	this.drawMachine(x, y);
};

TuringMachineCanvas.prototype.drawStripCell = function(x, y, value) {
	var ctx = this.ctx;	
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

TuringMachineCanvas.prototype.drawMachine = function(x, y) {
	var ctx = this.ctx;
	ctx.fillStyle = '#ccccff';
	if(this.machine.stop) {
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
	var text = this.machine.state;
	var text_size = ctx.measureText(text);	
	ctx.fillText(text, x + (cell_size - text_size.width) / 2 , y  +  (cell_size - font_size) / 2 );
}
