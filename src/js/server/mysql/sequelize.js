import config from "config";
import Sequelize from "sequelize";

const dbc = config.get('database');

var sequelize = new Sequelize(dbc.db, dbc.user, dbc.pass, dbc.options);

export default sequelize