var TuringMachineStrip = function() { 
	this.empty_symbol = ' ';
	this.reset();	
};
TuringMachineStrip.prototype.reset = function() {
	this.cells = [this.empty_symbol, this.empty_symbol, this.empty_symbol];
	this.caret_position = 1;
}
TuringMachineStrip.prototype.write = function(symbolValue) {
	//@todo validate symbolValue
	this.cells[this.caret_position] = symbolValue;
};
TuringMachineStrip.prototype.read = function() {
	var symbolValue = this.cells[this.caret_position];
	return symbolValue;
};
TuringMachineStrip.prototype.move = function(dir) {
	switch(dir) {
		case('L'): {
			this.caret_position -= 1;
			if(this.caret_position == 0) {
				this.cells.unshift(this.empty_symbol);
				this.caret_position = 1;
			}
			break;
		}
		case('R'): {
			this.caret_position += 1;
			if(this.caret_position == this.cells.length - 1)
				this.cells.push(this.empty_symbol);
			break;
		}
		case('N'):
		default: 
			break;
	}
};
TuringMachineStrip.prototype.setInput = function(inputValue) {
	//@todo validate inputValue
	this.cells = inputValue.split('');
	this.cells.unshift(this.empty_symbol);
	this.cells.push(this.empty_symbol);
	this.caret_position = 1;
};
TuringMachineStrip.prototype.getOutput = function() {
	var output = '';
	for(var i = 0; i < this.cells.length; i++) {
		var cellVal = this.cells[i];
		if(cellVal != this.empty_symbol)
			output += this.cells[i];
	}
	//@todo check for inner spaces, trim
	return output;
};
//=============================================================
var TuringMachine = function(states, init_state, transitions) {
	
	this.strip = new TuringMachineStrip();
	this.states = states;
	this.initial_state = init_state;
	this.stop_state = '!';
	this.transitions = transitions;
	this.stop = false;
};

TuringMachine.prototype.reset = function() {
	var output = this.strip.getOutput();
	this.stop = false;
	this.strip.reset();
	this.strip.setInput(output);
	this.state = this.initial_state;
};

TuringMachine.prototype.setInput = function(inputValue) {
	this.strip.reset();
	this.strip.setInput(inputValue);
	this.state = this.initial_state;
};

TuringMachine.prototype.getNextTransition = function() {
	if(!this.stop) {
		for(var i = 0; i < this.transitions.length; i++) {
			var transition = this.transitions[i];
			var condition = transition.condition;
			if((this.state == condition.state) 
				&& (this.strip.read() == condition.value)) {	
				return transition;
			}
		}	
	}
	return null;
};

TuringMachine.prototype.setState = function(new_state) {
	//@todo validate state
	this.state = new_state;
	if(new_state == this.stop_state)
		this.stop = true;
};

TuringMachine.prototype.step = function() {
	var transition = this.getNextTransition();
	if(transition) {
		var command = transition.command;
		if(command.isEmpty()) {
			this.stop = true;
			return;
		}
		if(command.input)
			this.strip.write(command.input);
		if(command.move_dir)
			this.strip.move(command.move_dir);
		if(command.new_state)
			this.setState(command.new_state);
	}
};

TuringMachine.prototype.getStrip = function() {
	return this.strip;
};

TuringMachine.prototype.getOutput = function() {
	if(this.stop) {
		return this.strip.getOutput();
	}
	return null;
};