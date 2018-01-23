var Bassoon = function(audioContext) {
	//range from 40 to 70
	this.range = {
		low: 22,
		high: 55
	}

	this.audioCtx = audioContext || new(window.AudioContext || window.webkitAudioContext)();
	this.numSwitches = 1;


	this.paths = {
		0: [
			'cresc/AS1.mp3',
			'cresc/CS2.mp3',
			'cresc/E2.mp3',
			'cresc/G2.mp3',
			'cresc/AS2.mp3',
			'cresc/CS3.mp3',
			'cresc/E3.mp3',
			'cresc/G3.mp3',
			'cresc/AS3.mp3',
			'cresc/CS4.mp3',
			'cresc/E4.mp3',
			'cresc/G4.mp3',
		]
	}

	//add stems
	for (var key in this.paths) {
		if (this.paths.hasOwnProperty(key)) { //making sure it doesn't come from the prototype
			for (var i = 0; i < this.paths[key].length; i++) {
				this.paths[key][i] = 'https://dfilipczak.github.io/Aeolia/samples/bassoon/' + this.paths[key][i]
			}
		}
	}

	Instrument.call(this, this.audioCtx)
}

Bassoon.prototype = Object.create(Instrument.prototype);
Bassoon.prototype.constructor = Bassoon;
Bassoon.prototype.range = {
	low: 22,
	high: 55
}