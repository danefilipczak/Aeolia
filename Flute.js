var Flute = function(audioContext) {
	//range from 40 to 70
	this.range = {
		low: 48,
		high: 84
	}

	this.audioCtx = audioContext || new(window.AudioContext || window.webkitAudioContext)();
	Instrument.call(this, this.audioCtx)


	this.samples = [
		'samples/flute/cresc/C4.mp3',
		'samples/flute/cresc/DS4.mp3',
		'samples/flute/cresc/FS4.mp3',
		'samples/flute/cresc/A4.mp3',
		'samples/flute/cresc/C5.mp3',
		'samples/flute/cresc/DS5.mp3',
		'samples/flute/cresc/FS5.mp3',
		'samples/flute/cresc/A5.mp3',
		'samples/flute/cresc/C6.mp3',
		'samples/flute/cresc/DS6.mp3',
		'samples/flute/cresc/FS6.mp3',
		'samples/flute/cresc/A6.mp3',
		'samples/flute/cresc/C7.mp3',
	]
}

Flute.prototype = Object.create(Instrument.prototype);
Flute.prototype.constructor = Flute;
Flute.prototype.range = {
	low: 48,
	high: 84
}