#include <math.h>

int indexPower(int* a, int len, int index) {
	if(index < 0 || index >= len) return -1;
	return (int)pow(*(a + index), index);
}
