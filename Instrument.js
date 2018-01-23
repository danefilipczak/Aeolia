var ac = new(window.AudioContext || window.webkitAudioContext)();

Number.prototype.linlin = function(in_min, in_max, out_min, out_max) {
	//map a linear range to another linear range
	return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function linlin(val, in_min, in_max, out_min, out_max) {
	return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var Instrument = function(audioContext, numSwitches) {

	this.audioCtx = audioContext;
	this.panNode = this.audioCtx.createStereoPanner();
	this.panNode.connect(this.audioCtx.destination);

	this.progress = 0;
	this.switch = 0; //current keyswitch

	this.gain = 1;
	this.attack = 1;
	this.release = 1;
	
	/* 
		samplers are housed as a two dimensional array
		the first index is the note number, the second is the keyswitch
		*/

	this.samples = new Array(127); 
	for (var i = 0; i < this.samples.length; i++) {
		this.samples[i] = new Array(numSwitches);
	}

	this.numSamplers = (this.range.high-this.range.low+1)*this.numSwitches;
}

Instrument.prototype.logProgress = function() {
	this.progress++;
	var progress = this.progress/this.numSamplers;
	this.onProgress(progress);
	if(progress>=1){
		this.onLoad();
	}
}

Instrument.prototype.onProgress = function(progress){
	// console.log(progress)
}

Instrument.prototype.onLoad = function(){
	///
	console.log('loaded')
}

Instrument.prototype.buildSamples = function() {
	//fill your samples array up with instances of MiniSampler
	for (var nn = this.range.low; nn <= this.range.high; nn++) {
		for (var ks = 0; ks < this.numSwitches; ks++) {
			this.samples[nn][ks] = this.createSampler(nn, ks);
		}
	}
}


Instrument.prototype.createSampler = function(nn, ks) {
	var scale = nn.linlin(this.range.low, this.range.high, 0, this.paths[ks].length - 1);
	var index = Math.round(scale);
	var detune = Math.round((scale - index).linlin(0, this.paths[ks].length - 1, this.range.low, this.range.high) - this.range.low);
	var path = this.paths[ks][index];
	return new MiniSampler(path, detune, this.audioCtx, this);
}



Instrument.prototype.noteOn = function(nn) {
	if (nn > this.range.high || nn < this.range.low) {
		console.log('that note\'s out of range - this instrument can play from ' + this.range.low + ' to ' + this.range.high);
		return;
	}
	this.samples[nn][this.switch].play()
}

Instrument.prototype.noteOff = function(nn) {
	var self = this;
	// var lag = when || 0.05;
	
	// setTimeout(function() {
	// 	self.gainNode.gain.exponentialRampToValueAtTime(1, self.audioCtx.currentTime + lag + 0.1);
	// }, lag);
	this.samples[nn].forEach(function(s) {
		s.stop();
		// s = new
	})
}


Instrument.prototype.hush = function() {
	for (var nn = this.range.low; nn <= this.range.high; nn++) {
		for(var ks = 0; ks<this.samples[nn].length; ks++){
			this.samples[nn][ks].stop();
		}
	}
}


Instrument.prototype.pan = function(value, when) {

	var self = this;
	var lag = when || 0.1;
	this.panNode.pan.cancelScheduledValues(this.audioCtx.currentTime);
	self.panNode.pan.linearRampToValueAtTime(value, self.audioCtx.currentTime + lag);

}