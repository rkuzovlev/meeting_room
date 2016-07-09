import sequelize from './../sequelize'
import Sequelize from "sequelize";

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
});


export default Room