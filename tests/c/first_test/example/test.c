int multDigits(int number) {
	int mult = 1;
	while(number > 0) {
		short digit = number % 10;
		if(digit > 0) 
			mult *= digit;
		number /= 10;
	}
	return mult;
}
