import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App.jsx'
import About from './components/About.jsx'
import Home from './components/Home.jsx'
import RoomContainer from './components/room/RoomContainer.jsx'
import RoomAddEdit from './components/room/RoomAddEdit.jsx'
import Login from './components/Login.jsx'
import ProfileContainer from './components/profile/ProfileContainer.jsx'


export default <Route path="/" component={App}>
	<IndexRoute component={Home}/>
	<Route path="/about" component={About}/>
	<Route path="/profile" component={ProfileContainer}/>
	<Route path="/login" component={Login}/>
	<Route path="/login/error/:message" component={Login}/>
	<Route path="/room/add" name="addRoom" component={RoomAddEdit}/>
	<Route path="/room/:roomID" component={RoomContainer}/>
	<Route path="/room/:roomID/edit" name="roomEdit" component={RoomAddEdit}/>
</Route>
