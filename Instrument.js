var ac = new(window.AudioContext || window.webkitAudioContext)();

Number.prototype.linlin = function (in_min, in_max, out_min, out_max) {
	//map a linear range to another linear range
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


var Instrument = function(audioContext){

	this.audioCtx = audioContext;
	this.panNode = this.audioCtx.createStereoPanner();
    this.panNode.connect(this.audioCtx.destination);

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.connect(this.panNode);


}



Instrument.prototype.play = function(nn, when){

	if(nn>this.range.high || nn<this.range.low){
		console.log('that note\'s out of range - this instrument can play from ' + this.range.low + ' to ' + this.range.high);
		if(this.sampler){this.stop()};
		return;
	}

	if(this.sampler){
		this.stop();
	}
	var lag = when || 0.1;
	var scale = nn.linlin(this.range.low, this.range.high, 0, this.samples.length-1);
	var index = Math.round(scale);
	var detune = Math.round((scale - index).linlin(0, this.samples.length-1, this.range.low, this.range.high)-this.range.low);
	// var path = 'samples/' + this.samples[index] + '.wav';
	var path = this.samples[index];
	console.log({
		'path':path,
		'index':index,
		'detune':detune,
		'scale':scale
	})

	this.sampler = new MiniSampler(path, detune, this.audioCtx, this.gainNode)

}



Instrument.prototype.stop = function(when){
	var self = this;
	var lag = when || 0.05;
	this.gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + lag);
	setTimeout(function(){
		self.gainNode.gain.exponentialRampToValueAtTime(1, self.audioCtx.currentTime + lag + 0.1);
	}, lag);
	this.sampler.stop(lag);
	
}