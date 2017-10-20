var ContraBassoon = function(audioContext) {
	//range from 40 to 70
	this.range = {
		low: 10,
		high: 37
	}

	this.audioCtx = audioContext || new(window.AudioContext || window.webkitAudioContext)();
	Instrument.call(this, this.audioCtx)


	this.samples = [
		'samples/contraBassoon/cresc/AS0.mp3',
		'samples/contraBassoon/cresc/CS1.mp3',
		'samples/contraBassoon/cresc/E1.mp3',
		'samples/contraBassoon/cresc/G1.mp3',
		'samples/contraBassoon/cresc/AS1.mp3',
		'samples/contraBassoon/cresc/CS2.mp3',
		'samples/contraBassoon/cresc/E2.mp3',
		'samples/contraBassoon/cresc/G2.mp3',
		'samples/contraBassoon/cresc/AS2.mp3',
		'samples/contraBassoon/cresc/CS3.mp3'
	]
}

ContraBassoon.prototype = Object.create(Instrument.prototype);
ContraBassoon.prototype.constructor = ContraBassoon;
ContraBassoon.prototype.range = {
	low: 22,
	high: 55
}