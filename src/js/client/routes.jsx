import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App.jsx'
import About from './components/About.jsx'
import Home from './components/Home.jsx'
import Room from './components/room/Room.jsx'
import RoomAddEdit from './components/room/RoomAddEdit.jsx'
import Login from './components/Login.jsx'
import Profile from './components/profile/Profile.jsx'


export default <Route path="/" component={App}>
	<IndexRoute component={Home}/>
	<Route path="/about" component={About}/>
	<Route path="/profile" component={Profile}/>
	<Route path="/login" component={Login}/>
	<Route path="/login/error/:message" component={Login}/>
	<Route path="/room/:roomID" component={Room}/>
	<Route path="/room/:roomID/edit" component={RoomAddEdit}/>
</Route>
