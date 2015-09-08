import csv

def get_students(filename):
	students = []
	with open(filename, "r") as csvfile:
		reader = csv.reader(csvfile, delimiter=',')
		for row in reader:
			if not row[0].strip(): continue;
			student = {
				'fullname': row[1] + ' ' + row[2],				
				'repo': row[7]
			}
			students.append(student)
	students.pop(0)
	return students