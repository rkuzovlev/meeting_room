import sequelize from './../sequelize'
import Sequelize from "sequelize";

import Social from "./social"
import Room from "./room"

var User = sequelize.define('user', {
	nickname: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			notNull: true,
			is: /^[a-zA-Z0-9\_\-]+$/i
		}
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true
		}
	}
});


User.hasMany(Social, { as: 'Socials' })
User.hasMany(Room, { as: 'Rooms' })


export default User
