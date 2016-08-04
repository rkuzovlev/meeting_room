class Messenger {
	constructor(broadcastID){
		this.broadcastID = broadcastID;
	}

	sendMessage(){

	}

	on(type, fn){

	}

	off(type, fn){
		
	}
}

class Stream {
	constructor(mode, messenger){
		let options = {
			
		};

		let WebRtcPeer = mode == 'send' ? kurentoUtils.WebRtcPeer.WebRtcPeerSendonly : kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly;

		this.stream = WebRtcPeer(options, (error) =>  {
			if(error){
				this.onError(error);
			}
		});

		this.stream.generateOffer.bind(this)(this.onOfferPresenter);

		this.error = null;
		this.messenger = messenger;
	}

	onOfferPresenter(error, sdpOffer){
		if (error) {
			this.onError(error);
			return
		}

		console.log('sdpOffer', sdpOffer)

		var message = {
			id : 'presenter',
			sdpOffer : sdpOffer
		};
		this.messenger.sendMessage(message);
	}

	onError(error){
		this.error = error;

		console.error('Еррор сука блеать', error)
	}
}

class LocalStream extends Stream {
	constructor(messenger){
		super('send', messenger);
	}
}

class RemoteStream extends Stream {
	constructor(messenger){
		super('recv', messenger);
	}
}

class Kurento {
	constructor(broadcastID, isStreamer){
		this.broadcastID = broadcastID;
		this.messenger = new Messenger(broadcastID);
		this.remoteStreams = {};
		this.isStreamer = isStreamer;
		this.localStream = isStreamer ? new LocalStream(this.messenger) : null;
	}
}

export default Kurento