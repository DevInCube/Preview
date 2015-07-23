var TuringCondition = function(state, value) {
	
	this.state = state;
	this.value = value;
};

var TuringCommand = function(input, move_dir, new_state) {
	
	this.input = input;
	this.move_dir = move_dir;
	this.new_state = new_state;
};
TuringCommand.prototype.isEmpty = function() {
	return !this.input && !this.move_dir && !this.new_state;
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

function parseTransitions(text) {
	var transitions = [];	
	var lines = text.split('\n');
	for(var i = 0; i < lines.length; i++) {
		var line = lines[i];
		if(line == '') continue;
		var transition = parseTransition(line);	
		transitions.push(transition);
	}
	return transitions;
}