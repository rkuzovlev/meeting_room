import Iso from 'iso';

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import ServerHTML from './../views/index';
import routes from './../../client/routes.jsx';


export function *index(argument) {
	match({ routes: routes, location: this.request.url }, (err, redirect, props) => {
		if (err) {
			this.throw(500, err.message);
		
		} else if (redirect) {
			this.redirect(redirect.pathname + redirect.search)
		
		} else if (!props) {
			this.throw(404, 'Not Found');

		} else {
			const iso = new Iso()

			iso.add(renderToString(<RouterContext {...props}/>), { someSampleData: 'Hello, World! qdw' })

			// const sProps = { body, assets, locale, title, description }
			// const sProps = { body: iso.render(), assets: {}, locale: "ru", title: "Title", description: "description" }
			// const html = renderToString(<ServerHTML { ...sProps } />)

			const html = ServerHTML("Title", iso.render(), 'description');

			this.status = 200;
			this.body = `<!DOCTYPE html>${html}`
		}
	})
}