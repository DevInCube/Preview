#include "test.h"

Object* TestCase(int input, int output) { 
  Object* tc = malloc(sizeof(Object));
  tc->input = input;
  tc->output = output;
  return tc;
}

int runTestCases() {
  Object* cases[]  = {
    TestCase(101, 1),
    TestCase(123, 6),
  };    
  int counter = 0;
  for(int i = 0; i < 2; i++) {
    Object* case = cases[i];
    if(multDigits(case->input) == case->output) {
      counter++;
    }
  }
  return counter;
}
