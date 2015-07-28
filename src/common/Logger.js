var LogLevel = Object.freeze({
	Off: { value: 0, }, 
	Trace: { value: 1, name: 'TRACE', }, 
	Debug: { value: 2, name: 'DEBUG', },
	Info: { value: 3, name: 'INFO', },
	Error: { value: 4, name: 'ERROR', },
	Fatal: { value: 5, name: 'FATAL', },
});

var Logger = new (function() {
	
	this.level = LogLevel.Off;
	
	this.log = function(level, message) {
		if(this.level.value >= level.value) {
			console.log("[" + level.name + "]: " + message);
		}
	};
	
	this.trace = function(message) {
		this.log(LogLevel.Trace, message);
	};
	
	this.debug = function(message) {
		this.log(LogLevel.Debug, message);	
	};
		
})();

function includeStringFormat() {
	if (!String.prototype.format) {
	  String.prototype.format = function() {
	    var args = arguments;
	    return this.replace(/{(\d+)}/g, function(match, number) { 
	      return typeof args[number] != 'undefined'
	        ? args[number]
	        : match
	      ;
	    });
	  };
	}
}