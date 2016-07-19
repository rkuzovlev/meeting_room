import path from "path";
import fs from "fs";

import sequelize from './sequelize'

import "./models";

// sequelize.sync({force: true}).then(function(){
sequelize.sync().then(function(){
}).catch(function(err){
	console.log('some error occured while sync', err);
})

export default sequelize