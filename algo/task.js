var Task = function(input, output, program) {
	this.input = input;
	this.output = output;
	this.program = program;	
};

var tasks = {};
tasks['hello'] = new Task(
	'hello.',
	'HELLO!',
	'q0,h->H,R,q0\nq0,e->E,R,q0\nq0,l->L,R,q0\nq0,o->O,R,q0\nq0,.->!,R,q1\nq1, -> ,L,!'
);