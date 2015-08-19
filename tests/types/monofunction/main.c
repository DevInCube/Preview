#include <stdio.h>
#include "test.h"
#include "mono.h"

int main() {
	struct TestCaseSet set;
	createTestCases(&set);
	//printTestCases(set);
	int n = set.length;
	int	count = 0;
	int i;
	for(i = 0; i < n; i++) {
		struct TestCase c = *(set.cases + i);
		int pass = checkCase(c);
		if(pass)
			count++;		
	}

	printf("Passed:\t%d\n", count);
	printf("Total:\t%d\n", n);
	return 0;
}


