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
		return;
	}

	if(this.sampler){
		this.stop();
	}
	var lag = when || 0.1;
	var scale = nn.linlin(this.range.low, this.range.high, 0, this.samples.length-1);
	var index = Math.round(scale);
	var detune = Math.round((scale - index).linlin(0, this.samples.length-1, this.range.low, this.range.high)-this.range.low);
	var path = 'samples/' + this.samples[index] + '.wav';
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
	this.sampler.stop(lag);
	setTimeout(function(){
		self.gainNode.gain.exponentialRampToValueAtTime(1, self.audioCtx.currentTime + lag*2);
	}, lag);
	
}