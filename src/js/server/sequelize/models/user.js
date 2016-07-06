import sequelize from './../sequelize'
import Sequelize from "sequelize";

import Social from "./social"
import Room from "./room"

var User = sequelize.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: true
	}
}, {
	classMethods: {
		
	}
});


User.hasMany(Social, { as: 'Socials' })
Social.belongsTo(User)
User.hasMany(Room, { as: 'Rooms' })
Room.belongsTo(User)

export default User
