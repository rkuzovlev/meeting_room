import path from "path";
import fs from "fs";

import sequelize from './sequelize'

import "./models";

sequelize.sync().then(function(){
	console.log('synced');
}).catch(function(err){
	console.log('some error occured while sync', err);
})

export default sequelize