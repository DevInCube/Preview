#include <stdio.h>
#include "test.h"
#include "mono.h"

void con_out(int count, int n) {
	printf("Passed:\t%d\n", count);
	printf("Total:\t%d\n", n);
}

void json_out(int pass, int total) {
	printf("{\"pass\":%d,\"total\":%d}\n", pass, total);
}

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
	json_out(count, n);
	
	return 0;
}



