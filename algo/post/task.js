var Task = function(input, program) {
	
	this.input = input;
	this.program = program;	
};

var tasks = {};
tasks['move'] = new Task(
	'0001',
	'> 1\n? 0 2\n0 3\n< 4\n!'
);