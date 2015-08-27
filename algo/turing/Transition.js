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
	var state = '';
	var value = '';
	var input = '';
	var move = '';
	var new_state = '';
	var cond_parts = parts[0].split(',');
	state = cond_parts[0];
	if(cond_parts.length > 1 && cond_parts[1])
		value = cond_parts[1][0];	
	if(parts.length > 1) {
		var comm_parts = parts[1].split(',');
		if(comm_parts[0])
			input = comm_parts[0][0];
		if(comm_parts.length > 1)
			move = comm_parts[1][0];
		if(comm_parts.length > 2)
			new_state = comm_parts[2];
	}	
	var condition = new TuringCondition(state, value);
	var command = new TuringCommand( input, move, new_state);
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