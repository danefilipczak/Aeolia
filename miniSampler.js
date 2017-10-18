// define variables

var ac = new(window.AudioContext || window.webkitAudioContext)();

var MiniSampler = function(audioContext, nn) {
	this.source;
	this.audioCtx = audioContext;
	this.getData();
	this.source.start();



}

MiniSampler.prototype.getData = function() {
	var self = this;
	this.source = this.audioCtx.createBufferSource();
	var request = new XMLHttpRequest();

	request.open('GET', 'samples/CAS3.wav', true);

	request.responseType = 'arraybuffer';


	request.onload = function() {
		var audioData = request.response;

		self.audioCtx.decodeAudioData(audioData, function(buffer) {
				self.source.buffer = buffer;

				self.source.connect(self.audioCtx.destination);
				self.source.loop = true;
				console.log('decoded')
			},

			function(e) {
				console.log("Error with decoding audio data" + e.err);
			});

	}

	request.send();
}

MiniSampler.prototype.stop = function(){
	this.source.stop();
}



// var source = 1;
// window.onload = function() {


	// source;

	// var pre = document.querySelector('pre');
	// var myScript = document.querySelector('script');
	// var play = document.querySelector('.play');
	// var stop = document.querySelector('.stop');


	// var playbackControl = document.querySelector('.playback-rate-control');
	// var playbackValue = document.querySelector('.playback-rate-value');
	// playbackControl.setAttribute('disabled', 'disabled');
	// var loopstartControl = document.querySelector('.loopstart-control');
	// var loopstartValue = document.querySelector('.loopstart-value');
	// loopstartControl.setAttribute('disabled', 'disabled');
	// var loopendControl = document.querySelector('.loopend-control');
	// var loopendValue = document.querySelector('.loopend-value');
	// loopendControl.setAttribute('disabled', 'disabled');

	// use XHR to load an audio track, and
	// decodeAudioData to decode it and stick it in a buffer.
	// Then we put the buffer into the source



	// wire up buttons to stop and play audio

// 	play.onclick = function() {
// 		getData();
// 		source.start(0);
// 		play.setAttribute('disabled', 'disabled');
// 	}

// 	stop.onclick = function() {
// 		source.stop(0);
// 		play.removeAttribute('disabled');
// 	}



// 	playbackControl.oninput = function() {
// 		source.playbackRate.value = playbackControl.value;
// 		playbackValue.innerHTML = playbackControl.value;
// 	}
// 	loopstartControl.oninput = function() {
// 		source.loopStart = loopstartControl.value;
// 		loopstartValue.innerHTML = loopstartControl.value;
// 	}
// 	loopendControl.oninput = function() {
// 		source.loopEnd = loopendControl.value;
// 		loopendValue.innerHTML = loopendControl.value;
// 	}



// 	// dump script to pre element

// 	pre.innerHTML = myScript.innerHTML;
// }