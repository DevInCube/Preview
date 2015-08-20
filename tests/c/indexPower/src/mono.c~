#include "test.h"
#include "mono.h"

void createTestCases(struct TestCaseSet * set) {
	static struct TestCase cases[] = {
		{4, {1, 2, 3, 4}, 2, 9},
		{5, {1, 3, 10, 100, 1000}, 3, 1000000},
		{2, {0, 1}, 0, 1},
		{2, {1, 2}, 3, -1},		
	};
	set->cases = cases;
	set->length = LEN(cases);
	//printTestCases(*set);
}

int checkCase(struct TestCase c) {
	int length = c.length;	
	int *a = &c.array[0];
	printf("%d, %d\n", length, c.power);
	int test = indexPower(a, length, c.power);	
	printf("= %d\n", test);
	return test == c.mult;
}

void printCase(struct TestCase c) {
	//printf("\t%d - %d\n", c.number, c.mult);
}

void printTestCases(struct TestCaseSet set) {
	int i;
	//for(i = 0; i < set.length; i++)
		//printCase(set.cases[i]);
}

