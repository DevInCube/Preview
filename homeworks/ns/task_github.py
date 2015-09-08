import csv
import requests
import json
from urllib.parse import urlparse
from enum import Enum
from github import GitHubApi
from students import get_students

def read_config(filename):
	with open(filename, "r") as file:
		config = json.load(file)
	return config

local_config = read_config("local_config.json")
config = read_config(local_config["config"])
oauth = config["oauth"]
github = GitHubApi(oauth["client_id"], oauth["client_secret"])
students = get_students(local_config["students"])

class ResultCode(Enum):
	SUCCESS = 0
	NO_PATH = 1
	NO_CODE = 2
	NO_PROG = 3

def check_repo(repo):
	url = urlparse(repo)
	parts = url.path.split('/')
	user = parts[1];
	repo_name = parts[2].replace('.git', '');
	path = "/courses/prog_base/tasks/hello_world/"
	jres = github.get_contents_json(user, repo_name, path)
	if jres:
		has_code = False
		has_prog = False
		for item in jres:
			name = item['name']		 
			if name == 'hello.c':
				has_code = True
			elif (name == 'hello' or name == 'hello.exe'):
				has_prog = True
		if not has_code: return ResultCode.NO_CODE
		if not has_prog: return ResultCode.NO_PROG
		return ResultCode.SUCCESS
	else:
		return ResultCode.NO_PATH	
		
def list_students():
	for st in students:
		print(st)
		
def check():
	res = []
	for st in students:
		fullname = st['fullname']
		repo = st["repo"]
		check_res = check_repo(repo)
		print(str(check_res) + " " + repo)
		row = [fullname, check_res, repo]
		res.append(row)
	return res
		
def save_results(filename, results):
	with open(filename, 'w') as csvfile:
		spamwriter = csv.writer(csvfile, delimiter=',', lineterminator='\n')
		for row in results:
			spamwriter.writerow(row)

if __name__ == "__main__":
	# list_students()
	res = check()
	save_results("res.csv", res)
	pass