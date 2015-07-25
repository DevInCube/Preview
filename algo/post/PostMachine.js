var PostMachineStrip = function() { 	
	this.reset();	
};
PostMachineStrip.prototype.reset = function() {
	this.cells = [false, false, false];
	this.caret_position = 1;
}
PostMachineStrip.prototype.set = function() {
	//@todo check
	this.cells[this.caret_position] = true;
};
PostMachineStrip.prototype.unset = function() {
	//@todo check
	this.cells[this.caret_position] = false;
};
PostMachineStrip.prototype.get = function() {
	return this.cells[this.caret_position];
};
PostMachineStrip.prototype.moveLeft = function() {
	this.caret_position -= 1;
	if(this.caret_position == 0) {
		this.cells.unshift(false);
		this.caret_position = 1;
	}
};
PostMachineStrip.prototype.moveRight = function() {
	this.caret_position += 1;
	if(this.caret_position == this.cells.length - 1)
		this.cells.push(false);
};
PostMachineStrip.prototype.setInput = function(listOfBools) {	
	this.cells = listOfBools;
	this.cells.unshift(false);
	this.cells.push(false);
	this.caret_position = 1; //@todo
};
//===========================================================
var PostMachine = function(rules) {
	
	if(!rules || !rules.length) {
		//@todo
	}
	
	this.strip = new PostMachineStrip();
	this.rules = rules;
	this.rule_index = 0;	
	this.stop = false;
};

PostMachine.prototype.setInput = function(str) {
	var bools = [];
	for(var i = 0; i < str.length; i++) {
		bools.push(str[i] == '1');
	}
	this.strip.setInput(bools);
	this.strip.moveLeft();
};

PostMachine.prototype.setAndGoto = function(index) {
	this.strip.set();
	this.rule_index = index;
};
PostMachine.prototype.unsetAndGoto = function(index) {
	this.strip.unset();
	this.rule_index = index;
};
PostMachine.prototype.moveLeftAndGoto = function(index) {
	this.strip.moveLeft();
	this.rule_index = index;
};
PostMachine.prototype.moveRightAndGoto = function(index) {
	this.strip.moveRight();
	this.rule_index = index;
};
PostMachine.prototype.checkEmptyAndGoto = function(indexIfEmpty, indexIfMarked) {
	if(!this.strip.get())
		this.rule_index = indexIfEmpty;
	else
		this.rule_index = indexIfMarked;
};
PostMachine.prototype.stopCommand = function() {
	this.stop = true;
};
PostMachine.prototype.step = function() {
	if(this.stop) return false;
	this.apply(this.rules[this.rule_index]);
	return !this.stop; 
};
PostMachine.prototype.apply = function(command) {
	switch(command.type) {
		case("<") : { this.moveLeftAndGoto(command.args[0]); break; }
		case(">") : { this.moveRightAndGoto(command.args[0]); break; }
		case("1") : { this.setAndGoto(command.args[0]); break; }
		case("0") : { this.unsetAndGoto(command.args[0]); break; }
		case("?") : { this.checkEmptyAndGoto(command.args[0], command.args[1]); break; }
		case("!") : { this.stopCommand(); break; }
		default:
			return; //@todo error
	}
};
//===========================================
var PostCommand = function(command_type, args) {
	
	this.type = command_type;
	this.args = args;	
};
PostCommand.prototype.parse = function(str) {
	var parts = str.split(' ');
	var type = parts[0];
	parts.shift();
	var args = [];
	for(var i = 0; i < parts.length; i++) {
		var index = parseInt(parts[i]);
		args.push(index);
	}
	return new PostCommand(type, args);	
};
PostCommand.prototype.parseCommands = function(text) {
	var rules = [];	
	var lines = text.split('\n');
	for(var i = 0; i < lines.length; i++) {
		var line = lines[i];
		if(line == '') continue;
		var rule = PostCommand.prototype.parse(line);	
		rules.push(rule);
	}
	return rules; 
};

