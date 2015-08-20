#include <stdio.h>

#define LEN(x) (sizeof(x)/sizeof((x)[0]))

struct TestCaseSet {
	struct TestCase *cases;
	int length;
};

void createTestCases(struct TestCaseSet *);
int checkCase(struct TestCase);
