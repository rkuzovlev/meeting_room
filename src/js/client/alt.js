import Alt from 'alt'

import CurrentUserActions from './actions/CurrentUserActions'

import CurrentUserStore from './stores/CurrentUserStore'

import CurrentUserSource from './sources/CurrentUserSource'

class Flux extends Alt {
	constructor(fetcher, resolver) {
		super();
		
		this.resolver = resolver

		this.sources = {
			"CurrentUserSource": new CurrentUserSource(fetcher)
		}

		this.addActions("CurrentUserActions", CurrentUserActions);

		this.addStore("CurrentUserStore", CurrentUserStore);
	}
}


export default Flux;