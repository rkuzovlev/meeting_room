import Alt from 'alt'

import CurrentUserActions from './actions/CurrentUserActions'
import NotificationActions from './actions/NotificationActions'

import CurrentUserStore from './stores/CurrentUserStore'
import NotificationStore from './stores/NotificationStore'

import CurrentUserSource from './sources/CurrentUserSource'

class Flux extends Alt {
	constructor(fetcher, resolver) {
		super();
		
		this.resolver = resolver

		this.sources = {
			"CurrentUserSource": new CurrentUserSource(fetcher)
		}

		this.addActions("CurrentUserActions", CurrentUserActions);
		this.addActions("NotificationActions", NotificationActions);

		this.addStore("CurrentUserStore", CurrentUserStore);
		this.addStore("NotificationStore", NotificationStore);
	}
}


export default Flux;