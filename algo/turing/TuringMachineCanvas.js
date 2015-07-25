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
	
	this.font_size = 32;
};

TuringMachineCanvas.prototype.setMachine = function(machine) {
	this.machine = machine;
	this.draw();
};

TuringMachineCanvas.prototype.draw = function() {
	this.canvas.width = this.canvas.width;
	var width = this.canvas.width;
	var height = this.canvas.height;
	if(this.machine) {		
		
		var length = this.machine.strip.cells.length;
		if(length > 10) {
			cell_size = 40 - (length - 10) * 0.5;
			if(cell_size < 10) cell_size = 10;
			this.font_size = 32 - (length - 10) * 0.5;			
			if(this.font_size < 12) this.font_size = 12;
		} else {
			cell_size = 40;
			cell_border = 2;
			this.font_size = 32;
		}	
		var strip_width = length * cell_size;
		
		var start_x = (width - strip_width) / 2;
		var middle_y = (height - cell_size) / 2;
		
		var x = start_x;
		
		var fade_cells_count = 4;
		var fade_cells_min = 0.05;
		var fade_cells_max= 0.5;
		var face_cells_step = (fade_cells_max - fade_cells_min) / fade_cells_count;
		for(var i = 0; i < fade_cells_count; i++) {
			this.drawEmptyCell(x - cell_size * (fade_cells_count - i), middle_y, cell_size, fade_cells_min + face_cells_step * i);
		}				
		for(var i = 0; i < length; i++) {
			this.drawStripCell(x, middle_y, this.machine.strip.cells[i]);
			x += cell_size;
		}	
		for(var i = 0; i < fade_cells_count; i++) {
			this.drawEmptyCell(x + cell_size * i, middle_y, cell_size, fade_cells_max - face_cells_step * i);
		}
		
		x = start_x + this.machine.strip.caret_position * cell_size;
		var y = middle_y - cell_size;	
		this.drawMachine(x, y);
	} else {
		var ctx = this.ctx;	
		var text = 'No machine';
		ctx.fillStyle = '#000000';
		var font_size = this.font_size + 4;
		ctx.font = font_size + "px Courier";
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
		var text_size = ctx.measureText(text);	
		ctx.fillText(text, (width - text_size.width) / 2 , (height  -  font_size) / 2 );
	}
};

TuringMachineCanvas.prototype.drawEmptyCell = function(x, y, size, opacity) {
	var ctx = this.ctx;	
	ctx.fillStyle = "rgba(230, 230, 230, " + opacity + ")";
	ctx.fillRect(x, y, size, size);
	ctx.beginPath();
	ctx.lineWidth = cell_border;
	ctx.strokeStyle = "rgba(0, 0, 0, " + opacity + ")";
	ctx.rect(x, y, size, size); 
	ctx.stroke();
};

TuringMachineCanvas.prototype.drawStripCell = function(x, y, value) {
	this.drawEmptyCell(x, y, cell_size, 1);
	var ctx = this.ctx;
	
	ctx.fillStyle = '#000000';	
	ctx.font = this.font_size + "px Courier";
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	var text_size = ctx.measureText(value);	
	ctx.fillText(value, x + (cell_size - text_size.width) / 2 , y  +  (cell_size - this.font_size) / 2 );
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
	var font_size = this.font_size - 10;
	ctx.font = font_size + "px Courier bold";
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	var text = this.machine.state;
	var text_size = ctx.measureText(text);	
	ctx.fillText(text, x + (cell_size - text_size.width) / 2 , y  +  (cell_size - font_size) / 2 );
}
