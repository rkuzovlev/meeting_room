import sequelize from './../sequelize'
import Sequelize from "sequelize";

var Room = sequelize.define('room', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: true
		}
	}
});


export default Room