var Task = function(input, program) {
	
	this.input = input;
	this.program = program;	
};

var tasks = {};
tasks['move'] = new Task(
	'0001',
	'> 1\n? 0 2\n0 3\n< 4\n!'
);
tasks['ad2'] = new Task(
	'0111',
	'? 1 2\n> 0\n> 3\n? 4 2\n1 5\n> 6\n1 7\n!'
);
tasks['merge'] = new Task(
	'1110011',
	'0 1\n> 2\n? 3 1\n1 4\n> 5\n? 7 6\n!\n< 8\n? 9 7\n> 0'
);