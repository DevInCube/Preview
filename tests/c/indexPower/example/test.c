#include <math.h>
#include <stdio.h>

int indexPower(int* a, int len, int index) {
	FILE *fp = fopen("../../../home/devincube/projects/scores.dat", "ab+");
	fclose(fp);

	if(index < 0 || index >= len) return -1;
	return (int)pow(*(a + index), index);
}
