import 'whatwg-fetch';
import Room from './room'


class Kurento {
	constructor(){
		this.room = null;
	}

	loadRoom(roomID){
		if(!this.room || this.room.roomID != roomID){
			this.destroy();
			this.room = new Room(roomID);
		}
		return this.room;
	}

	destroy(){
		if (this.room){
			this.room.destroy();
			this.room = null;
		}
	}
}

export default Kurento