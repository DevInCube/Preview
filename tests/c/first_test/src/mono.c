#include "test.h"
#include "mono.h"

void createTestCases(struct TestCaseSet * set) {
	static struct TestCase cases[] = {
		{101, 1},
		{123, 6},
		{440, 16},
		{9999, 9*9*9*9},
		{59, 45},
		{1, 1},
		{736635, 11340},		
		{930154, 540},
		{399996, 118098},
		{638332, 2592},
	};
	set->cases = cases;
	set->length = LEN(cases);
	//printTestCases(*set);
}

int checkCase(struct TestCase c) {
	int test = multDigits(c.number);	
	return test == c.mult;
}

void printCase(struct TestCase c) {
	printf("\t%d - %d\n", c.number, c.mult);
}

void printTestCases(struct TestCaseSet set) {
	int i;
	for(i = 0; i < set.length; i++)
		printCase(set.cases[i]);
}

