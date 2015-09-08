from math import pow
import math

def charToInt(ch):
	code = ord(ch.upper())
	if code in range(48,58):
		return int(code - 48)
	elif code in range(65, 91):
		return 10 + int(code - 65)
	else:
		raise "charToInt: Invalid character %s" % ch
		
def intToChar(num):
	if num in range(0, 10):
		return chr(num + 48)
	elif num in range(10, 36):
		return chr(num - 10 + 65)
	else:
		raise "intToChar: too big integer %s" % str(num)	

def convertBase(num, base1, base2, precision = 5):
	if base1 == 10:
		parts = num.split('.')
		left = parts[0]
		ret = -1
		x = int(left) 
		newNum = []
		while x >= base2 or ret >= base2:
			ret = x % base2
			x = x // base2	
			newDigit = intToChar(ret)
			newNum.insert(0, newDigit)			
		newNum.insert(0, intToChar(x))	
		decNum = []
		res = ''.join(newNum)
		if len(parts) > 1:
			right = parts[1]
			f = float("0." + right)	
			for i in range(0, precision):
				f = f * base2
				integer = int(math.modf(f)[1])				
				decNum.append(intToChar(integer))
				f -= integer
			res += "." + ''.join(decNum)
				
		return res
	else:
		if base2 == 10:
			x = 0
			parts = num.split('.')
			left = parts[0]
			leftLen = len(left)
			for i in range(0, leftLen):
				a = charToInt(left[leftLen - i - 1])
				b = pow(base1, i)				
				x += a * b	
			x = int(x)		
			if len(parts) > 1:
				right = parts[1]					
				rightLen = len(right)			
				for i in range(-1, - rightLen - 1, -1):
					a = charToInt(right[-i - 1])
					b = pow(base1, i)					
					x += a * b			
			return str(x)
		else:
			return convertBase(convertBase(num, base1, 10), 10, base2)

def numb(num, base):
	return "%s (%d)" % (num, base)

def chainstr(num, base1, basearr):
	res = "%s " % numb(num, base1)
	for base2 in basearr:
		res += "-> %s " % numb(convertBase(num, base1, base2), base2)		
	return res

def results(count):
	for var in range(1, count + 1):
		number = str(var // 10) + str(var % 10)
		task1 = "15%s" % number
		task2 = "%sF" % number
		t = str((var % 2))	
		z = str((var % 3))
		task31 = t + z + "01" + z + z + t + "." + t + t + z
		task32 = "20%s.%s15" % (number, number)
		task4 = "1%s" % number 
		
		print("===============================")
		print("VARIANT: %s" % number)
		print("----------------")
		print("1) %s" % chainstr(task1, 10, [3, 2, 4]))
		print("2)  %s" % chainstr(task2, 16, [5, 8, 10])) 
		print("3.1)  %s" % chainstr(task31, 3, [2, 10])) 
		print("3.2)  %s" % chainstr(task32, 10, [16, 10])) 
		print("4)  %s" % chainstr(task4, 10, [19, 10])) 
		
if __name__ == "__main__":
	results(24)		
	# print(numb(convertBase("2019.1915", 10, 16), 16))	
	# print(chainstr("1519", 10, [3, 2, 4]))
	 
	