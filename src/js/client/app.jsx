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


Iso.bootstrap(function (state) {
	console.log('Iso.bootstrap', JSON.parse(state));
	
	const alt = new Alt(new Fetcher(), new Resolver());
	alt.bootstrap(state)

	ReactDOM.render(
		<AltContainer flux={alt}>
			<Router routes={routes} history={browserHistory}/>
		</AltContainer>,

		document.getElementById('content')
	);
});