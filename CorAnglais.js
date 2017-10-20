var CorAnglais = function(audioContext) {
	//range from 40 to 70
	this.range = {
		low: 40,
		high: 70
	}

	this.audioCtx = audioContext || new(window.AudioContext || window.webkitAudioContext)();
	Instrument.call(this, this.audioCtx)


	this.samples = [
		'samples/corAnglais/cresc/CE3.wav',
		'samples/corAnglais/cresc/CG3.wav',
		'samples/corAnglais/cresc/CAS3.wav',
		'samples/corAnglais/cresc/CCS4.wav',
		'samples/corAnglais/cresc/CE4.wav',
		'samples/corAnglais/cresc/CG4.wav',
		'samples/corAnglais/cresc/CAS4.wav',
		'samples/corAnglais/cresc/CCS5.wav',
		'samples/corAnglais/cresc/CE5.wav',
		'samples/corAnglais/cresc/CG5.wav',
		'samples/corAnglais/cresc/CAS5.wav',
	]
}

CorAnglais.prototype = Object.create(Instrument.prototype);
CorAnglais.prototype.constructor = CorAnglais;
CorAnglais.prototype.range = {
	low: 40,
	high: 70
}