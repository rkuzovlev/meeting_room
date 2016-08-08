import Messenger from './messenger'
import LocalStream from './localStream'

class Room {
	constructor(roomID){
		this.roomID = roomID;
		this.messenger = new Messenger(roomID);
		this.remoteStreams = {};
		this.localStream = new LocalStream(this.messenger, roomID)
	}

	startStream(){
		this.localStream.start();
	}

	stopStream(){
		this.localStream.stop();
	}

	destroy(){
		this.stopStream()
	}
}


export default Room