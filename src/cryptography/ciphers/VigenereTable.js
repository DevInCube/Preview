var VigenereTable = function(tableElement, encoder) {
	
	this.table = tableElement;
	this.encoder = encoder;
};

VigenereTable.prototype.clear = function() {	
	$(this.table).empty();
};

VigenereTable.prototype.show = function(message, key, cipher, isDecode) {
	var alphabet = this.encoder.alphabet;
	key = expandKey(key, message.length);
	message = filterMessage(alphabet, message);
	var table = genTable(alphabet, key, message.length, isDecode);
	this.clear();
	fillTableDOM(table, this.table, alphabet, message, cipher);
};

function mod(n, m) {
    return ((n % m) + m) % m;
}

function genTable(alphabet, key, length, isDecode) {	
	var t = [];		
	for (var i = 0; i < length; i++) {
		var shift = alphabet.indexOf(key[i]);			
		t.push([]);
		for (var j = 0; j < alphabet.length; j++) {
			var shiftedIndex = j + (isDecode ? -1 : 1) * shift;
			var index = mod(shiftedIndex, alphabet.length);					
			t[i][j] = alphabet[index];
		}	
	}
	return t;
}

function fillTableDOM(table, tableEl, header, message, cipher) {		
	
	var tableHeadEl = document.createElement('thead');
	tableEl.appendChild(tableHeadEl);
	var tableHeadRowEl = document.createElement('tr');
	tableHeadEl.appendChild(tableHeadRowEl);
							
	tableHeadRowEl.appendChild(document.createElement("th")); 		
	for (var i = 0; i < header.length; i++) {
		var headEl = document.createElement("th");
		headEl.innerText = header[i].toUpperCase();
		tableHeadRowEl.appendChild(headEl)
	}
	tableHeadRowEl.appendChild(document.createElement("th")); 
	
	var tableBodyEl = document.createElement('tbody');
	tableEl.appendChild(tableBodyEl);
	for (var i = 0; i < message.length; i++) {
		var rowEl = document.createElement("tr");
		tableBodyEl.appendChild(rowEl);
					
		
		var mtdEl = document.createElement("th");
		mtdEl.setAttribute("scope", "row");					
		var m = message[i];
		var mark_index = header.indexOf(m);
		mtdEl.innerText = m.toUpperCase();
		rowEl.appendChild(mtdEl);
				
		for (var j = 0; j < table[i].length; j++) {				
			var val = table[i][j].toUpperCase();
			var cellEl = document.createElement("td");
			cellEl.innerText = val;
			if(mark_index == j)
				cellEl.className = "marked";
			rowEl.appendChild(cellEl)
		}	
		
		mtdEl = document.createElement("th");
		mtdEl.setAttribute("scope", "row");					
		var c = cipher[i].toUpperCase();;
		mtdEl.innerText = c;
		rowEl.appendChild(mtdEl);
	}	
}