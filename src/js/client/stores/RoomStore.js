class RoomStore {
	constructor() {
		this.error = null;
		this._initRoom();

		this.bindActions(this.alt.getActions('RoomActions'))


		//  {
		// 		id: "video id",
		// 		src: "blob:......."
		//  }
		this.localVideo = null;

		//  [{
		// 		id: "video id",
		// 		src: "blob:......."
		//  }]
		this.remoteVideos = [];

		/*
		this.remoteVideos = [{
			id: "video2",
			src: "http://video.webmfiles.org/elephants-dream.webm"
		}, {
			id: "video3",
			src: "http://video.webmfiles.org/big-buck-bunny_trailer.webm"
		}];
		*/
	}

	_initRoom(){
		this.room = {
			description: "",
			id: 0,
			image: "",
			title: "",
			user_id: 0
		}

		this.permissions = {
			stream: false,
			manage: false
		}
	}

	onLocalVideo(video){
		this.localVideo = video;
	}

	onInitRoom(){
		this._initRoom();
	}

	onUpdateRoom(room) {
		this.room = room;
		this.error = null;
	}

	onRoomFailed(error) {
		this.error = error;
	}

	onUpdateRoomPermissions(permissions){
		this.permissions = permissions;
	}
}

export default RoomStore