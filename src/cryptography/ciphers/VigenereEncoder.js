var VigenereEncoder = function() {
	
	this.alphabet = '';
}

VigenereEncoder.prototype.setAlphabet = function(_alphabet) {
	this.alphabet = _alphabet;
};

function expandKey(key, length) {
	var longKey = '';	
	var num = Math.ceil(length / key.length);		
	while(num-- > 0) 
		longKey += key;
	longKey = longKey.substring(0, length);
	return longKey;
}

function filterMessage(alphabet, message) {
	message = message.toLowerCase();
	var newMessage = '';
	for (var i = 0, len = message.length; i < len; i++) {
	  	var m = message[i];	
		if(alphabet.indexOf(m) == -1) {
			continue;
		}	
		newMessage += m;
	}	
	return newMessage;
}

function cipherText(alphabet, key, message, isDecode) {
	alphabet = alphabet.toLowerCase();
	key = key.toLowerCase();	
	message = filterMessage(alphabet, message);
	var longKey = expandKey(key, message.length);	
	var res = "";		
	for (var i = 0, len = message.length; i < len; i++) {
	  	var m = message[i];	
		if(alphabet.indexOf(m) == -1) {				
			continue;
		}				
		var k = longKey[i];							
		var shiftedIndex = alphabet.indexOf(m) + (isDecode ? -1 : 1) * alphabet.indexOf(k);
		var index = mod(shiftedIndex, alphabet.length);					
		res += alphabet[index];
	}
	return res;
}

VigenereEncoder.prototype.encode = function(message, key) {
	var cipher = cipherText(this.alphabet, key, message, false);	
	return cipher;
};

VigenereEncoder.prototype.decode = function(cipher, key) {
	var message = cipherText(this.alphabet, key, cipher, true);
	return message;
};