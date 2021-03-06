import Alt from 'alt'

import CurrentUserActions from './actions/CurrentUserActions'
import CurrentUserRoomsActions from './actions/CurrentUserRoomsActions'
import NotificationActions from './actions/NotificationActions'
import RoomActions from './actions/RoomActions'
import ChatActions from './actions/ChatActions'
import CentrifugoActions from './actions/CentrifugoActions'

import CurrentUserStore from './stores/CurrentUserStore'
import CurrentUserRoomsStore from './stores/CurrentUserRoomsStore'
import NotificationStore from './stores/NotificationStore'
import RoomStore from './stores/RoomStore'
import ChatStore from './stores/ChatStore'
import CentrifugoStore from './stores/CentrifugoStore'

import CurrentUserSource from './sources/CurrentUserSource'
import RoomSource from './sources/RoomSource'

class Flux extends Alt {
	constructor(fetcher, resolver, centrifugo, kurento) {
		super();
		
		this.resolver = resolver
		this.centrifugo = centrifugo;
		this.kurento = kurento;

		this.sources = {
			"CurrentUserSource": new CurrentUserSource(fetcher),
			"RoomSource": new RoomSource(fetcher)
		}

		this.addActions("CurrentUserActions", CurrentUserActions);
		this.addActions("NotificationActions", NotificationActions);
		this.addActions("CurrentUserRoomsActions", CurrentUserRoomsActions);
		this.addActions("RoomActions", RoomActions);
		this.addActions("ChatActions", ChatActions);
		this.addActions("CentrifugoActions", CentrifugoActions);

		this.addStore("CurrentUserStore", CurrentUserStore);
		this.addStore("NotificationStore", NotificationStore);
		this.addStore("CurrentUserRoomsStore", CurrentUserRoomsStore);
		this.addStore("RoomStore", RoomStore);
		this.addStore("ChatStore", ChatStore);
		this.addStore("CentrifugoStore", CentrifugoStore);
	}
}


export default Flux;