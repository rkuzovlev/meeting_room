import sequelize from './../sequelize'
import Sequelize from "sequelize";

var Social = sequelize.define('social', {
	type: {
		type: Sequelize.ENUM('facebook', 'google', 'vk', 'twitter'),
		allowNull: false,
		validate: {
			notNull: true
		}
	},

	data: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: true,
			isJSON: function(value){
				if (typeof value !== 'string'){
					throw new Error('Only JSON string is allowed');
				}

				try {
					JSON.parse(value)
				} catch (e) {
					throw new Error('JSON string is not valid');
				}
			}
		}
	},
});


export default Social