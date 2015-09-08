import requests

class GitHubApi(object):
	
	def __init__(self, cid, secret):
		self.client_id = cid
		self.client_secret = secret
	
	def check_contents(self, user, repo, path):
		path = "/" + path.strip("/")
		url = "https://api.github.com/repos/{user}/{repo}/contents{path}?client_id={id}&client_secret={secret}".format(user=user,repo=repo,path=path,id=self.client_id,secret=self.client_secret)		
		res = requests.get(url)		
		if res.status_code == 200:
			return True
		if res.status_code == 403:
			raise "403 Forbidden"
		return False
		
	def get_contents_request(self, user, repo, path):
		path = "/" + path.strip("/")
		url = "https://api.github.com/repos/{user}/{repo}/contents{path}?client_id={id}&client_secret={secret}".format(user=user,repo=repo,path=path,id=self.client_id,secret=self.client_secret)
		return url	
		
	def get_contents_json(self, user, repo, path):
		url = self.get_contents_request(user, repo, path)	
		res = requests.get(url)	
		if res.status_code == 200:
			return res.json()
		if res.status_code == 403:
			raise "403 Forbidden"
		return None			
