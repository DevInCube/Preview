var VigenereBreaker = function() {
	
	this.alphabet = '';
	this.key_analyst = function(text) { return kasiskiTest(text, 3); }
}

VigenereBreaker.prototype.break = function(cipher) {		
	var probable_key_length_list = this.key_analyst(cipher);
	var key_length = parseInt(probable_key_length_list[0]);
	var key = this.getKey(cipher, key_length);
	var encoder = new VigenereEncoder();
	encoder.alphabet = this.alphabet;
	var message = encoder.decode(cipher, key);
	return message;
};

VigenereBreaker.prototype.getKey = function(cipher, key_length) {
	var key = '';
	for(var i = 0; i < key_length; i++) {
		var periodText = getEveryChar(cipher, i, key_length);
		var freq = getCharsFrequencies(periodText, this.alphabet);
		key += getChar(freq, this.alphabet.length);
	}
	return key;
};

function getChar(data, alpha_length) {	
	var min = Number.MAX_SAFE_INTEGER;
	var min_index = -1;
	for(var i = 0; i < alpha_length; i++) {
		var data2 = shiftedData(data, i);
		var chi2 = getChi2Critical(data2, eng_freq);
		if(chi2 < min) {
			min = chi2;
			min_index = i;
		}
	}
	return alpha[min_index];
}

function shiftedData(data, shiftBy) {
	var copy = data.slice();
	while(shiftBy-- > 0) {
		copy.push(copy.shift());
	}
	return copy;
}

function getChi2Critical(observedData, desiredData) {
	var criticalValue = 0;		
	for(var i = 0; i < desiredData.length; i++){
	    var xSqr = observedData[i][1] - desiredData[i][1];
	    criticalValue += ((xSqr * xSqr) / desiredData[i][1]);
	}
	return criticalValue;
}

function getEveryChar(text, shift, period) {
	var res = '';
	for(var i = shift; i < text.length; i++) {
		if((i - shift) % period == 0)
			res += text[i];
	}
	return res;
}

function getCharsFrequencies(text, alpha) {
	var Pair = function(ch, value) { 
		this.ch = ch; 			
		this.value = value; 
	};		
	
	text = text.toLowerCase();
	var freq = zeros(alpha.length);
	for(var j = 0; j < text.length; j++) {
		var index = alpha.indexOf(text[j]);
		freq[index]++;
	}
	var data = [];
	for(var i = 0; i < freq.length; i++) {
		var val = freq[i] / text.length;
		data.push([alpha[i], val]);			
	}			
	return data;
}

function getEnglishFrequencies() {
	var eng_freq = [
		['a',	8.167	],
		['b',	1.492	],
		['c',	2.782	],
		['d',	4.253	],
		['e',	12.702	],
		['f',	2.228	],
		['g',	2.015	],
		['h',	6.094	],
		['i',	6.966	],
		['j',	0.153	],
		['k',	0.772	],
		['l',	4.025	],
		['m',	2.406	],
		['n',	6.749	],
		['o',	7.507	],
		['p',	1.929	],
		['q',	0.095	],
		['r',	5.987	],
		['s',	6.327	],
		['t',	9.056	],
		['u',	2.758	],
		['v',	0.978	],
		['w',	2.361	],
		['x',	0.150	],
		['y',	1.974	],
		['z',	0.074	],		 
	];	
	var copy = [];
	eng_freq.forEach(function(el, i, arr) { copy.push([el[0], el[1] / 100]); });
	return copy;
}

function zeros(length) {
	var arr = new Array(length);
	for(var i = 0; i < length; i++)
		arr[i] = 0;
	return arr;
}

function kasiskiTest(text, digramLength) {
	var Pair = function(index, value) { 
		this.index = index; 
		if(!value) 
			value = 0;
		this.value = value; 
	};
	
	if(!digramLength)
		digramLength = 3;
		
	function gcd(a, b) { if(!b) return a; else return gcd(b, a % b); }
	
	var repeatCount = [];
	for (var i = 0; i < text.length - digramLength + 1; i++) {
		var temp = text.substring(i, i + digramLength);
		for (var j = i + 1; j < text.length - digramLength + 1; j++) {
			var temp2 = text.substring(j, j + digramLength);
			if(temp == temp2)
				repeatCount.push(j - i);
		}
	}		
	var nods = zeros(5000);
	for (var i = 0; i < repeatCount.length; ++i)
	    for (var j = i + 1; j < repeatCount.length; ++j)
	        nods[gcd(repeatCount[i], repeatCount[j])]++;
	nods[0] = 0;		
	var ans = new Array();
	for (var i = 2; i < 500; ++i) {
		var p = new Pair(i, nods[i]);
        ans.push(p);			
    }			
	var anss = ans.sort(function(a, b) { return b.value - a.value; });		
	var res = [];
	for(var i = 0; i < 10; i++)
		if(anss[i].value > 0)
			res.push(anss[i].index); 
	return res;		
}

function hist(container_id, data) {
	$(container_id).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'y'
        },
        series: [{
            name: 'Frequency',
            data: data,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.4f}', // one decimal
                y: 5, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
}