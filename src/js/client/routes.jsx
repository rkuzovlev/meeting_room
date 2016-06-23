import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App.jsx'
import About from './components/About.jsx'
import Home from './components/Home.jsx'
import Room from './components/Room.jsx'


export default <Route path="/" component={App}>
	<IndexRoute component={Home}/>
	<Route path="/about" component={About}/>
	<Route path="/room/:roomID" component={Room}/>
</Route>
