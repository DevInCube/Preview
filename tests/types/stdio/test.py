import os, shutil, uuid, signal
import subprocess, threading
import json

ROOT_DIR = '/home/devincube/projects/Preview/tests/'
TEST_COMMON_PATH = 'types/stdio'

def copy_files(path_from, path_to):
	src_files = os.listdir(path_from)
	for file_name in src_files:
		full_file_name = os.path.join(path_from, file_name)
		if (os.path.isfile(full_file_name)):
		    shutil.copy(full_file_name, path_to)
		    
def get_build_dir(id):
	return 'build/%s/' % id	
	
def get_build_meta(test_rel_path):
	meta_path = os.path.join(ROOT_DIR, test_rel_path, 'meta.json')
	with open(meta_path) as data_file:    
		return json.load(data_file)

def create_build(user_path):
	if not os.path.exists('build'):
		os.makedirs('build')
	id = uuid.uuid4()
	build_dir = get_build_dir(id);
	os.makedirs(build_dir)	
	user_dir = os.path.join(ROOT_DIR, user_path)
	copy_files(user_dir, build_dir)	
	return id	
	
def run_build(id, timeout=3):
	dir = get_build_dir(id)
	make_cmd = Command(['make', '-C', dir])
	make_cmd.run(shell=False)
	if make_cmd.returncode or make_cmd.errors:
		raise Exception('Make crash: \r\n\t%s' % make_cmd.errors)	
	run_cmd = Command([os.path.join(dir, 'bin/run')])
	run_cmd.run(timeout=timeout)
	if run_cmd.returncode or run_cmd.errors:
		raise Exception('Run crash: \r\n\t%s' % run_cmd.errors)
	out = run_cmd.output
	if not out: 
		return None	
	try:
		res = json.loads(out)
	except Exception as e:
		raise Exception('Test crash: \r\n\t%s\r\n"""%s"""' % (str(e), out))
	return res
	
def clean_build(id):
	shutil.rmtree(get_build_dir(id))
	
class Command(object):
	def __init__(self, cmd):
		self.cmd = cmd;
		self.process = None
		self.returncode = None
		self.output = None
		self.errors = None
		
	def run(self, timeout=1, shell=True):
		def target():
			print('Thread started')
			try:
				print("runnning %s" % self.cmd)
				self.process = subprocess.Popen(self.cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=shell, preexec_fn=os.setsid)
				out, err = self.process.communicate()							
				self.output = out
				self.errors = err
			except Exception as e:
				self.errors = str(e)
			print('Thread finished')
			
		thread = threading.Thread(target=target)
		thread.start()
		
		thread.join(timeout)
		if thread.is_alive():
			print('Terminating process')
			os.killpg(self.process.pid, signal.SIGTERM)
			thread.join()
			self.errors = "Timeout (%s sec)" % timeout
		self.returncode = self.process.returncode
		result = (self.returncode, self.output, self.errors)	
		# print('%s \n%s \n%s' % result)
		return result
		
class MonoFunctionTest(object):
	def __init__(self, test_path, user_path):					
		self.test_path = test_path
		self.user_path = user_path
	
	def run(self, timeout):
		id = create_build(self.test_path, self.user_path)	
		try:
			res = run_build(id, timeout=timeout)		
			print(res)
		except Exception as e:
			print(str(e))
		finally:	
			pass
			clean_build(id)
	
if __name__ == "__main__":
	test_name = 'c/indexPower'
	test = test_name
	user = test_name + '/example/'
	meta = get_build_meta(test)
	timeout = int(meta['timeout'])
	if meta['type'] == 'monofunction':
		test_suite = MonoFunctionTest(test, user)
		test_suite.run(timeout)
	pass	

