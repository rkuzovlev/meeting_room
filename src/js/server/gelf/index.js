import gelf from 'gelf-pro'
import config from 'config'

const gelfc = config.get('gelf');

gelf.setConfig({
	fields: {
		server: gelfc.server
	},
	adapterName: gelfc.adapterName,
	adapterOptions: gelfc.adapterOptions
});


let graylogSendError = function (err, bytesSent) {
	if (err){
		console.error("Can't send message to graylog", err);
	}
};



export let log = function(){
	if (process.env.NODE_ENV != 'production'){
		console.log.apply(null, arguments);
	}
}

export let info = function(message, extra = null){
	console.log.apply(null, arguments);
	gelf.info(message, extra, graylogSendError);
}

export let warn = function(message, extra = null){
	console.warn.apply(null, arguments);
	gelf.warn(message, extra, graylogSendError);
}

export let error = function(errormsg){
	console.error.apply(null, arguments);
	gelf.error(errormsg, graylogSendError);
}

export let critical = function(errormsg){
	console.error.apply(null, arguments);
	gelf.critical(errormsg, graylogSendError);
}
