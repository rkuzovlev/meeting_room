import sequelize from './../sequelize'
import Sequelize from "sequelize";

var Social = sequelize.define('social', {
	type: {
		type: Sequelize.ENUM('facebook', 'google', 'vk', 'twitter'),
		allowNull: false
	},

	social_id: {
		type: Sequelize.STRING,
		allowNull: false
	},

	data: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: "{}",
		set: function(val){
			if (typeof val === "object"){
				try {
					this.setDataValue('data', JSON.stringify(val));
				} catch (e) {
					console.warn("Can't JSON.stringify(", val, ")");
				}
			}
		},
		validate: {
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
	}
}, {
	classMethods: {
		loginOrCreateUser: function(socialType, socialID, name, email, socialData){
			const where = { 
				social_id: socialID,
				type: socialType
			};

			const User = sequelize.models.user;

			return Social.findOne({ where: where }).then(function(social){
				if (social){
					return social.getUser();
				}

				return User.create({ name: name, email: email }).then(function(user){
					return Social.create({type: socialType, social_id: socialID, data: socialData, user_id: user.id}).then(function(){
						return user;
					});
				});
			})
		}
	}
});

export default Social