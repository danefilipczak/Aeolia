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

	this.gainNode = this.audioCtx.createGain();
	this.gainNode.connect(this.panNode);

	this.progress = 0;


	this.switch = 0; //current keyswitch
	this.samples = new Array(127);
	for (var i = 0; i < this.samples.length; i++) {
		this.samples[i] = new Array(numSwitches);
	}
	this.buildSamples();



}

Instrument.prototype.logProgress = function() {
	this.progress++;
}

Instrument.prototype.buildSamples = function() {
	//fill your samples array up with instances of MiniSampler

	for (var nn = this.range.low; nn <= this.range.high; nn++) {
		for (var ks = 0; ks < this.numSwitches; ks++) {
			// console.log(linlin())
			// console.log(linlin(nn, this.range.low, this.range.high, 0, this.paths[ks].length - 1))
			// var scale = nn.linlin(this.range.low, this.range.high, 0, this.paths[ks].length - 1);
			// var index = Math.round(scale);
			// var detune = Math.round((scale - index).linlin(0, this.paths.length - 1, this.range.low, this.range.high) - this.range.low);
			// var path = this.paths[ks][index];
			// console.log({
			// 	'path': path,
			// 	'index': index,
			// 	// 'detune': detune,
			// 	'scale': scale
			// })

			// this.samples[nn][ks] = new MiniSampler(path, detune, this.audioCtx, this.gainNode, this)
			this.samples[nn][ks] = this.createSampler(nn, ks);
		}
	}


}


Instrument.prototype.createSampler = function(nn, ks) {
	var scale = nn.linlin(this.range.low, this.range.high, 0, this.paths[ks].length - 1);
	var index = Math.round(scale);
	var detune = Math.round((scale - index).linlin(0, this.paths[ks].length - 1, this.range.low, this.range.high) - this.range.low);
	var path = this.paths[ks][index];
	return new MiniSampler(path, detune, this.audioCtx, this.gainNode, this);
}



Instrument.prototype.play = function(nn, when) {

	if (nn > this.range.high || nn < this.range.low) {
		console.log('that note\'s out of range - this instrument can play from ' + this.range.low + ' to ' + this.range.high);
		if (this.sampler) {
			this.stop()
		};
		return;
	}

	if (this.sampler) {
		this.stop();
	}
	var lag = when || 0.1;
	var scale = nn.linlin(this.range.low, this.range.high, 0, this.samples.length - 1);
	var index = Math.round(scale);
	var detune = Math.round((scale - index).linlin(0, this.samples.length - 1, this.range.low, this.range.high) - this.range.low);
	// var path = 'samples/' + this.samples[index] + '.wav';
	var path = this.samples[index];
	console.log({
		'path': path,
		'index': index,
		'detune': detune,
		'scale': scale
	})

	this.sampler = new MiniSampler(path, detune, this.audioCtx, this.gainNode, this)

}



Instrument.prototype.noteOn = function(nn) {
	if (nn > this.range.high || nn < this.range.low) {
		console.log('that note\'s out of range - this instrument can play from ' + this.range.low + ' to ' + this.range.high);
		return;
	}
	this.samples[nn][this.switch].play()
}

Instrument.prototype.noteOff = function(nn, when) {
	var self = this;
	var lag = when || 0.05;
	this.gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + lag);
	setTimeout(function() {
		self.gainNode.gain.exponentialRampToValueAtTime(1, self.audioCtx.currentTime + lag + 0.1);
	}, lag);
	this.samples[nn].forEach(function(s) {
		s.stop(lag);
		// s = new
	})
}



Instrument.prototype.stop = function(when) {
	var self = this;
	var lag = when || 0.05;
	this.gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + lag);
	setTimeout(function() {
		self.gainNode.gain.exponentialRampToValueAtTime(1, self.audioCtx.currentTime + lag + 0.1);
	}, lag);
	this.sampler.stop(lag);

}


Instrument.prototype.gain = function(value_, when) {

	var lag = when || 0.1;
	var value = value_;

	if (value <= 0) {
		value = 0.000000001
	}

	this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
	this.gainNode.gain.exponentialRampToValueAtTime(value, this.audioCtx.currentTime + lag);

}

Instrument.prototype.pan = function(value, when) {

	var self = this;
	var lag = when || 0.1;
	this.panNode.pan.cancelScheduledValues(this.audioCtx.currentTime);
	self.panNode.pan.linearRampToValueAtTime(value, self.audioCtx.currentTime + lag);

}