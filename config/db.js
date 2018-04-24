var DB = {

	host : process.env.DB_HOST,
	port : process.env.DB_PORT,
	database : process.env.DB_DATABASE,
	username : (process.env.DB_USER || null),
	password : (process.env.DB_PASSWORD || null)
};

module.exports =  DB;