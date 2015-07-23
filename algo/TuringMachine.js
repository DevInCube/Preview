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
			if(this.caret_position == 0)
				this.cells.unshift(' ');
			break;
		}
		case('R'): {
			this.caret_position += 1;
			if(this.caret_position == this.strip.length - 1)
				this.cells.push(' ');
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
	this.cells.unshift(' ');
	this.cells.push(' ');
	this.caret_position = 1;
};
TuringMachineStrip.prototype.getOutput = function() {
	var output = '';
	for(var i = 0; i < this.cells.length; i++) {
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
	this.stop_state = 'STOP';
	this.transitions = transitions;
	this.stop = false;
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
				&& (this.strip.get_current() == condition.value)) {	
				return transition;
			}
		}	
	}
	return null;
};

TuringMachine.prototype.step = function() {
	var transition = this.getNextTransition();
	if(transition) {
		var command = transition.command;
		this.strip.write(command.input);
		this.strip.move(command.move_dir);
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