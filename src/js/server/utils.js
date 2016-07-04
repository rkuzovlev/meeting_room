import path from 'path'
import config from 'config'

let distFolder = path.join(__dirname, '../../../dist');

export function getDistFolder(){
	return distFolder;
}



const serverConf = config.get("server");
const host = process.env.HOST || serverConf.host;
const port = process.env.PORT || serverConf.port;

export function getServerListenParams(){
	return { host: host, port: port }
}



export function getCurrentTimestamp(){
	return Math.round(new Date().getTime() / 1000)
}