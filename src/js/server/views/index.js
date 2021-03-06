export default function render(title, body, description){
	return `<html>
<head>
	<meta charSet='utf-8' />
	<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width" />

	<link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="/assets/main.css" />

	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/adapterjs/0.13.3/adapter.screenshare.min.js"></script>
	<script src="/assets/js/kurento-utils.js"></script>
	<script src="//cdn.jsdelivr.net/sockjs/1/sockjs.min.js"></script>

	<title>${title}</title>
	<meta name='description' content="${description}" />
</head>
<body>
	<div id='content'>${body}</div>
	<script type="text/javascript" src="/assets/app.js"></script>
</body>
</html>`;
}

/*
import React from 'react'

function ServerHTML(props) {
	const { body, assets, locale, title, description } = props

	return (
		<html>
			<head>
				<meta charSet='utf-8' />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />

				<link rel="stylesheet" href="/assets/main.css" />

				<title>Title</title>
				<meta name='description' content="test" />
			</head>
			<body>
				<div id='content' dangerouslySetInnerHTML={ { __html: body } }></div>
				<script type="text/javascript" src="/assets/app.js"></script>
			</body>
		</html>
	)
}

export default ServerHTML
*/

/*

<html lang={ locale }>
			<head>
				<meta charSet='utf-8' />

				
				<link rel='icon' type='image/ico' href='/favicon.ico' />
				{ assets.style.map((href, idx) => <link key={ idx } rel='stylesheet' href={ href } />) }

				<title>{ title }</title>
				<meta name='description' content={ description } />
			</head>
			<body>
				<div id='content' dangerouslySetInnerHTML={ { __html: body } } />
				<script src={ assets.script[0] } />
			</body>
		</html>
*/