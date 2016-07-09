import _ from "lodash";

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
	},
	avatar: {
		type: Sequelize.STRING,
		allowNull: true
	}
}, {
	instanceMethods: {
		getUserRooms: function(){
			let sql = `SELECT room.id, room.title, room.image, room.description, user.id as uid, user.name as uname, user.avatar as uavatar FROM room LEFT JOIN user on user.id = room.user_id WHERE room.deleted_at IS NULL AND (room.user_id = :userid OR room.id IN ( SELECT UserRoom.room_id FROM UserRoom WHERE UserRoom.user_id = :userid ) )`;
			let opt = { 
				replacements: {userid: this.id}, 
				type: sequelize.QueryTypes.SELECT 
			};

			return sequelize.query(sql, opt);

			/*
			return Room.findAll({where: { user_id: this.id }}).then((rooms) => {
				return this.getConnectedRooms({attributes: { exclude: ['ConnectedRooms'] }}).then((crooms) => {
					let ids = [];
					rooms.forEach((r) =>{
						ids.push(r.id);
					})

					crooms.forEach((cr) =>{
						if(ids.indexOf(cr.id) < 0){
							rooms.push(cr);
						}
					})
					return rooms;
				});
			});
			*/
		}
	},

	classMethods: {
		updateUser: function (uid, obj){
			return User.findOne({where: {id: uid}}).then(function(user){
				if (!user){
					throw new Error("Can't find user by ID '" + uid + "'");
				}

				obj = _.pick(obj, ['name', 'email']);
				return user.update(obj);
			});
		}
	}
});


User.hasMany(Social, { as: 'Socials' })
Social.belongsTo(User)

User.hasMany(Room, { as: 'Rooms' })
Room.belongsTo(User)

User.belongsToMany(Room, {as: 'ConnectedRooms', through: 'UserRoom'});
Room.belongsToMany(User, {as: 'ConnectedUsers', through: 'UserRoom'});

export default User
