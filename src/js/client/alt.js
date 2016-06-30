import Alt from 'alt'

import UserActions from './actions/UserActions'

import UserStore from './stores/UserStore'

import UserSource from './sources/UserSource'

class Flux extends Alt {
	constructor(fetcher, resolver) {
		super();
		
		this.resolver = resolver

		this.sources = {
			"UserSource": new UserSource(fetcher)
		}

		this.addActions("UserActions", UserActions);

		this.addStore("UserStore", UserStore);
	}
}


export default Flux;