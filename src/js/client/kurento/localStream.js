import Stream from './stream'

const stunServers = [
	{"urls":"stun:stun.l.google.com:19302"},
	{"urls":"stun:stun1.l.google.com:19302"},
	{"urls":"stun:stun2.l.google.com:19302"},
	{"urls":"stun:stun3.l.google.com:19302"},
	{"urls":"stun:stun4.l.google.com:19302"},
	{"urls":"stun:stun01.sipphone.com"},
	{"urls":"stun:stun.ekiga.net"},
	{"urls":"stun:stun.fwdnet.net"},
	{"urls":"stun:stun.ideasip.com"},
	{"urls":"stun:stun.iptel.org"},
	{"urls":"stun:stun.rixtelecom.se"},
	{"urls":"stun:stun.schlund.de"},
	{"urls":"stun:stun.softjoys.com"},
	{"urls":"stun:stun.voiparound.com"},
	{"urls":"stun:stun.voipbuster.com"},
	{"urls":"stun:stun.voipstunt.com"},
	{"urls":"stun:stun.voxgratia.org"},
	{"urls":"stun:stun.xten.com"}
];

class LocalStream extends Stream {
	constructor(messenger, roomID){
		super(messenger);

		this.roomID = roomID;
		this.stream = null;
	}

	start(){
		let options = {
			mediaConstraints: {
				audio: true,
				video: {
					width: 1280,
					framerate: 30
				}
			},
			onicecandidate : this.onIceCandidate.bind(this),
			// configuration: {
			// 	iceServers: stunServers
			// }
		};

		this.stream = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, (error) =>  {
			if(error){
				this.onError(error);
			}
		});

		this.stream.generateOffer((error, sdpOffer) => {
			this.onOfferPresenter(error, sdpOffer, 'startStream');
		});

		setTimeout(function(){
			let ls = this.stream.getLocalStream();
			let url = URL.createObjectURL(ls);
	
			let v = {
				id: ls.id,
				src: url
			};

			// console.log('getLocalStream', ls);
			// console.log('localStream video', v);

			flux.getActions('RoomActions').changeLocalVideo(v)
		}.bind(this), 1000)
	}

	onIceCandidate(candidate) {
		console.log('Local candidate' + JSON.stringify(candidate));

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
		flux.getActions('RoomActions').changeLocalVideo(null);
	}
}

export default LocalStream