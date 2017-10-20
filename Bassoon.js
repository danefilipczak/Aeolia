var Bassoon = function(audioContext) {
	//range from 40 to 70
	this.range = {
		low: 22,
		high: 55
	}

	this.audioCtx = audioContext || new(window.AudioContext || window.webkitAudioContext)();
	Instrument.call(this, this.audioCtx)


	this.samples = [
		'samples/bassoon/cresc/AS1.mp3',
		'samples/bassoon/cresc/CS2.mp3',
		'samples/bassoon/cresc/E2.mp3',
		'samples/bassoon/cresc/G2.mp3',
		'samples/bassoon/cresc/AS2.mp3',
		'samples/bassoon/cresc/CS3.mp3',
		'samples/bassoon/cresc/E3.mp3',
		'samples/bassoon/cresc/G3.mp3',
		'samples/bassoon/cresc/AS3.mp3',
		'samples/bassoon/cresc/CS4.mp3',
		'samples/bassoon/cresc/E4.mp3',
		'samples/bassoon/cresc/G4.mp3',
	]
}

Bassoon.prototype = Object.create(Instrument.prototype);
Bassoon.prototype.constructor = Bassoon;
Bassoon.prototype.range = {
	low: 22,
	high: 55
}