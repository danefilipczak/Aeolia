var MiniSampler = function(path_, detune, audioContext, parent_) {
	this.source;
	this.buffer;
	this.path = path_;
	this.parent = parent_;
	this.audioCtx = audioContext;
	this.getData();
	this.detune = detune || 0;
	this.gainNode = this.audioCtx.createGain();
	this.gainNode.connect(this.parent.panNode);
}

MiniSampler.prototype.getData = function() {
	var self = this;
	var request = new XMLHttpRequest();
	request.open('GET', self.path, true);
	request.responseType = 'arraybuffer';

	request.onload = function() {
		var audioData = request.response;
		self.parent.logProgress();
		self.audioCtx.decodeAudioData(audioData, function(buffer) {
				self.buffer = buffer;
			},
			function(e) {
				console.log("Error with decoding audio data " + e.err);
			});
	}
	request.send();
}

MiniSampler.prototype.play = function() {
	var self = this;
	if(this.source){
		this.stop();
	}
	this.source = this.audioCtx.createBufferSource();
	self.source.buffer = this.buffer;
	self.source.playbackRate.value = midiRatio(self.detune);
	self.source.connect(self.gainNode);
	self.source.loop = true;
	self.source.onended = function(event) {
		// 
	}
	this.gainNode.gain.exponentialRampToValueAtTime(this.parent.gain, this.audioCtx.currentTime + this.parent.attack);
	this.source.start();
}

MiniSampler.prototype.stop = function() {
	if(this.source){
		this.source.stop(this.audioCtx.currentTime + this.parent.release);
		this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + this.parent.release);
	}
}


function midiRatio(nn) {
	return Math.pow(Math.pow(2, nn), 1 / 12);
}

