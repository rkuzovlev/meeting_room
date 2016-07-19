import sequelize from './../sequelize'
import Sequelize from "sequelize";

import * as utils from "../utils"

var Room = sequelize.define('room', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	image: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: true
	}
}, {
	instanceMethods: {
		toJSON: utils.toJSON
	}
});


export default Room