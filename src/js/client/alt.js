import Alt from 'alt'

import CurrentUserActions from './actions/CurrentUserActions'
import NotificationActions from './actions/NotificationActions'
import RoomActions from './actions/RoomActions'

import CurrentUserStore from './stores/CurrentUserStore'
import NotificationStore from './stores/NotificationStore'
import RoomStore from './stores/RoomStore'

import CurrentUserSource from './sources/CurrentUserSource'
import RoomSource from './sources/RoomSource'

class Flux extends Alt {
	constructor(fetcher, resolver) {
		super();
		
		this.resolver = resolver

		this.sources = {
			"CurrentUserSource": new CurrentUserSource(fetcher),
			"RoomSource": new RoomSource(fetcher)
		}

		this.addActions("CurrentUserActions", CurrentUserActions);
		this.addActions("NotificationActions", NotificationActions);
		this.addActions("RoomActions", RoomActions);

		this.addStore("CurrentUserStore", CurrentUserStore);
		this.addStore("NotificationStore", NotificationStore);
		this.addStore("RoomStore", RoomStore);
	}
}


export default Flux;