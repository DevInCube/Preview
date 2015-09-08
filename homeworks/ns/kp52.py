import csv
import requests
import json
from urlparse import urlparse


def read_config(filename):
	with open(filename, "r") as file:
		config = json.load(file)
	return config
	
config = read_config("/home/devincube/Documents/config.json")

def read_students(filename):
	students = []
	with open(filename, "r") as csvfile:
		reader = csv.reader(csvfile, delimiter=',', quotechar='|')
		for row in reader:
			if not row[0]: continue;
			student = {
				'repo': row[7]
			}
			students.append(student)
	return students

def check_contents(user, repo, path):
	id = config["oauth"]["client_id"]
	secret = config["oauth"]["client_secret"]
	url = "https://api.github.com/repos/{user}/{repo}/contents{path}?client_id={id}&client_secret={secret}".format(user=user,repo=repo,path=path,id=id,secret=secret)
	print(url)
	res = requests.get(url)
	print(res.status_code)
	if res.status_code == 200:
		return True
	if res.status_code == 403:
		print("403 FORBIDDEN")
	return False

def check_hello_world(repo):
	res = requests.get(repo)
	if res.status_code == 404:
		return 1;
	url = urlparse(repo)
	parts = url.path.split('/')
	user = parts[1];
	repo = parts[2].replace('.git', '');
	print("{user} {repo}".format(user=user, repo=repo))
	check_folders = check_contents(user, repo, "/courses/prog_base/tasks/hello_world") 
	if not check_folders:
		return 2;
	if not check_contents(user, repo, "/courses/prog_base/tasks/hello_world/hello.c"):
		return 3;
	if not ( check_contents(user, repo, "/courses/prog_base/tasks/hello_world/hello") or check_contents(user, repo, "/courses/prog_base/tasks/hello_world/hello.exe") ):
		return 4;
	return 0;

if __name__ == "__main__":
	
	students = read_students("/home/devincube/Documents/students.csv")
	students_iter = iter(students)
	next(students_iter)
	for st in students_iter:
		repo = st["repo"]
		if not repo: continue;
	
		status = check_hello_world(repo)
		
		print("{status} {repo}".format(repo=repo, status=status))

