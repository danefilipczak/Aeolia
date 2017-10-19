
var ac = new(window.AudioContext || window.webkitAudioContext)();

Number.prototype.linlin = function (in_min, in_max, out_min, out_max) {
	//map a linear range to another linear range
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var CorAnglais = function(audioContext){
	//range from 40 to 70
	this.range = {
		low: 40,
		high: 70
	}

	this.audioCtx = audioContext || new(window.AudioContext || window.webkitAudioContext)();
	Instrument.call(this, this.audioCtx)


	this.samples = [
		'CE3',
		'CG3',
		'CAS3',
		'CCS4',
		'CE4',
		'CG4',
		'CAS4',
		'CCS5',
		'CE5',
		'CG5',
		'CAS5',
	]	
}

CorAnglais.prototype = Object.create(Instrument.prototype);
CorAnglais.prototype.constructor = CorAnglais;




