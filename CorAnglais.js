var CorAnglais = function(audioContext) {
	//range from 40 to 70
	this.range = {
		low: 40,
		high: 70
	}

	this.audioCtx = audioContext || new(window.AudioContext || window.webkitAudioContext)();
	this.numSwitches = 1;


	this.paths = {
		0: [
			'cresc/CE3.wav',
			'cresc/CG3.wav',
			'cresc/CAS3.wav',
			'cresc/CCS4.wav',
			'cresc/CE4.wav',
			'cresc/CG4.wav',
			'cresc/CAS4.wav',
			'cresc/CCS5.wav',
			'cresc/CE5.wav',
			'cresc/CG5.wav',
			'cresc/CAS5.wav',
		]
	}

	//add stems
	for (var key in this.paths) {
		if (this.paths.hasOwnProperty(key)) { //making sure it doesn't come from the prototype
			for(var i = 0;i<this.paths[key].length;i++){
				this.paths[key][i] = 'https://dfilipczak.github.io/Aeolia/samples/corAnglais/' + this.paths[key][i]
			}
		}
	}

	Instrument.call(this, this.audioCtx)
}

CorAnglais.prototype = Object.create(Instrument.prototype);
CorAnglais.prototype.constructor = CorAnglais;
CorAnglais.prototype.range = {
	low: 40,
	high: 70
}