//inherits from Instrument
var Flute = function(audioContext) {
	//range from 40 to 70
	this.range = {
		low: 48,
		high: 84
	}
	this.numSwitches = 1;

	this.audioCtx = audioContext || new(window.AudioContext || window.webkitAudioContext)();
	


	this.paths = {
		0: [
			'cresc/C4.mp3',
			'cresc/DS4.mp3',
			'cresc/FS4.mp3',
			'cresc/A4.mp3',
			'cresc/C5.mp3',
			'cresc/DS5.mp3',
			'cresc/FS5.mp3',
			'cresc/A5.mp3',
			'cresc/C6.mp3',
			'cresc/DS6.mp3',
			'cresc/FS6.mp3',
			'cresc/A6.mp3',
			'cresc/C7.mp3',
		]
	}

	//add stems
	for (var key in this.paths) {
		if (this.paths.hasOwnProperty(key)) { //making sure it doesn't come from the prototype
			for(var i = 0;i<this.paths[key].length;i++){
				this.paths[key][i] = 'https://dfilipczak.github.io/Aeolia/samples/flute/' + this.paths[key][i]
			}
		}
	}

	Instrument.call(this, this.audioCtx, this.numSwitches)
	this.buildSamples();
}

Flute.prototype = Object.create(Instrument.prototype);
Flute.prototype.constructor = Flute;
Flute.prototype.range = {
	low: 48,
	high: 84
}