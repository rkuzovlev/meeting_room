import Stream from './stream'

class LocalStream extends Stream {
	constructor(messenger, roomID){
		super(messenger);

		this.roomID = roomID;
		this.stream = null;
	}

	onSdpAnswer(sdpAnswer){
		this.stream.processAnswer(sdpAnswer.sdpAnswer);
	}

	start(){
		this.messenger.on('sdpAnswer', this.onSdpAnswer, this);

		let options = {
			mediaConstraints: {
				audio: true,
				video: {
					width: 1280,
					framerate: 30
				}
			},
			onicecandidate : this.onIceCandidate.bind(this),
			onnegotiationneeded: this.onNegotiationNeeded.bind(this)
		};

		let self = this;

		this.stream = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function(error) {
			if(error){
				self.onError(error);
			}

			this.generateOffer((error, sdpOffer) => {
				self.onOfferPresenter(error, sdpOffer, 'startStream');
			});
		});
	}

	onNegotiationNeeded(){
		let ls = this.stream.getLocalStream();
		let url = URL.createObjectURL(ls);

		let v = {
			id: ls.id,
			src: url
		};

		flux.getActions('RoomActions').changeLocalVideo(v)
	}

	onIceCandidate(candidate) {
		var message = {
			type : 'onIceCandidate',
			candidate : candidate
		}

		this.messenger.sendMessage(message).catch((error) => {
			this.onError(error);
		});
	}

	stop(){
		this.stream.dispose();
		this.stream = null;

		this.messenger.off('sdpAnswer', this.onSdpAnswer);

		flux.getActions('RoomActions').changeLocalVideo(null);
	}

	destroy(){
		this.stop();
		super.destroy();
	}
}

export default LocalStream