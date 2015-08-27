import os
import sys
import re

def comment_remover(text):
    def replacer(match):
        s = match.group(0)
        if s.startswith('/'):
            return " " # note: a space and not an empty string
        else:
            return s
    pattern = re.compile(
        r'//.*?$|/\*.*?\*/|\'(?:\\.|[^\\\'])*\'|"(?:\\.|[^\\"])*"',
        re.DOTALL | re.MULTILINE
    )
    return re.sub(pattern, replacer, text)
    
def string_remover(text):
    def replacer(match):
        s = match.group(0)
        return "\"{c_string}\""
    pattern = re.compile(
        r'L?\"(\\.|[^\\"])*\"',
        re.DOTALL | re.MULTILINE
    )
    return re.sub(pattern, replacer, text)
    
def char_remover(text):
    def replacer(match):
        s = match.group(0)
        return "\'\'"
    pattern = re.compile(
        r"'([^'\\\n]|\\.)'",
        re.DOTALL | re.MULTILINE
    )
    return re.sub(pattern, replacer, text)
    
def count_filter(string, f):	
    pattern = re.compile(
        r'%s' % f,
        re.DOTALL | re.MULTILINE
    )
    return len(pattern.findall(string))

if __name__ == "__main__":
	if len(sys.argv) < 2:
		print('Input file argument is missing')
		exit(1)
	filename = sys.argv[1]
	print(filename)
	with open(filename, 'r') as file:
		code = file.read()
		print(code)
		print('*' * 80)
		clean_code = char_remover(string_remover(comment_remover(code)))
		print(clean_code)
		print('*' * 80)
		if len(sys.argv) > 2:
			filters = sys.argv[2].split(',')
			for f in filters:
				f = '\W%s\W' % f
				print("%s - %s" % (f, count_filter(clean_code, f)))
	sys.exit(0)
