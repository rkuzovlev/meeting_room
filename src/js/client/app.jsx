import Iso from 'iso';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import ReactHelmet from 'react-helmet';
import AltContainer from 'alt-container';

import Fetcher from './fetcher';
import Resolver from './resolver';
import routes from './routes.jsx';
import Alt from './alt';
import { getCentrifugo } from './centrifugo'
import Kurento from './kurento';


Iso.bootstrap(function (state) {
	getCentrifugo().then(function(cent){
		const alt = new Alt(new Fetcher(), new Resolver(), cent, new Kurento());
		alt.bootstrap(state)
	
		window.flux = alt;

		ReactDOM.render(
			<AltContainer flux={alt}>
				<Router routes={routes} history={browserHistory}/>
			</AltContainer>,

			document.getElementById('content')
		);
	});
});