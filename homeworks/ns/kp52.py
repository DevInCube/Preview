import csv
import requests
import json
from urllib.parse import urlparse
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
	
def check():
	students = get_students("/home/devincube/Documents/students.csv")
	for st in students:
		repo = st["repo"]
		if not repo: continue;
	
		status = check_hello_world(repo)
		
		print("{status} {repo}".format(repo=repo, status=status))

if __name__ == "__main__":
	
	user = 'gribo4eg'
	repo = 'repos1'
	path = "/courses/prog_base/tasks/hello_world"
	res = github.get_contents_request(user, repo, path)
	print(res)
	
	

