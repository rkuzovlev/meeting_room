import Iso from 'iso';

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import AltContainer from 'alt-container';

import ServerHTML from './../views/index';
import routes from './../../client/routes.jsx';
import Alt from './../../client/alt';
import Fetcher from './../fetcher';
import Resolver from './../resolver';


const runRouter = function(routes, location){
	return new Promise(function(resolve){
		match({ routes, location }, function(...args){
			resolve(args)
		});
	});
}



export function *index(argument) {
	const [err, redirect, props] = yield runRouter(routes, this.request.url)

	if (err) {
		this.throw(500, err.message);
	
	} else if (redirect) {
		this.redirect(redirect.pathname + redirect.search)
	
	} else if (!props) {
		this.throw(404, 'Not Found');

	} else {
		const fetcher = new Fetcher(this.request)
		const flux = new Alt(fetcher, new Resolver())
		const iso = new Iso()
		const elems =  (<AltContainer flux={flux}> 
							<RouterContext {...props}/> 
						</AltContainer>)


		try {
			// TODO: change this behavior
			renderToString(elems); // we have to send WillMount event to react elements
			
			yield flux.resolver.all()
			
			const rendered = renderToString(elems); // final render
			iso.add(rendered, flux.takeSnapshot())
			const html = ServerHTML("Title", iso.render(), 'description');
						
			this.status = 200;
			this.body = `<!DOCTYPE html>${html}`;
		} catch (e) {
			console.error('Was somethig wrong with flux.resolver promises. ', e);
			this.throw(500, 'Sorry, service unavailable now, try it later!');
			return;
		}
	}
}