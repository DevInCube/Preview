var Task = function(input, output, program, memo) {
	this.input = input;
	this.output = output;
	this.program = program;	
	this.memo = memo;
};

var tasks = {};
tasks['empty'] = new Task(
	' ',
	' ',
	'q1, ->,,!',
	'Пустий приклад'
);
tasks['hello'] = new Task(
	'hello.',
	'HELLO!',
	'q0,h->H,R,q0\nq0,e->E,R,q0\nq0,l->L,R,q0\nq0,o->O,R,q0\nq0,.->!,R,q1\nq1, -> ,L,!',
	'Перевести всі букви у верхній регістр. Замінити точку на знак оклику.'
);
tasks['inc10'] = new Task(
	'199',
	'200',
	'q0,0->,R,\nq0,1->,R,\nq0,2->,R,\nq0,3->,R,\nq0,4->,R,\nq0,5->,R,\nq0,6->,R,\nq0,7->,R,\nq0,8->,R,\nq0,9->,R,\nq0, ->,L,q1\nq1,0->1,,!\nq1,1->2,,!\nq1,2->3,,!\nq1,3->4,,!\nq1,4->5,,!\nq1,5->6,,!\nq1,6->7,,!\nq1,7->8,,!\nq1,8->9,,!\nq1,9->0,L,\nq1, ->1,,!',
	'Інкрементувати число, що представлене в десятковій системі числення'
);
tasks['replace1'] = new Task(
	'abcb',
	'bcba',
	'q1,a-> ,R,q2\nq1,b-> ,R,q3\nq1,c-> ,R,q4\nq1, ->,R,\nq2,a->,R,\nq2,b->,R,\nq2,c->,R,\nq2, ->a,,!\nq3,a->,R,\nq3,b->,R,\nq3,c->,R,\nq3, ->b,,!\nq4,a->,R,\nq4,b->,R,\nq4,c->,R,\nq4, ->c,,!\n',
	'Перенести першу букву в кінець послідовності'
);