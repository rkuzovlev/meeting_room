import Stream from './stream'

class RemoteStream extends Stream {
	constructor(messenger){
		super(messenger);

		let options = {};

		this.stream = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, (error) =>  {
			if(error){
				this.onError(error);
			}
		});
	}
}


export default RemoteStream