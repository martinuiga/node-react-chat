const config = {
	app: {
		port: process.env.PORT || 3005,
	},
	couchdb: {
		host: process.env.COUCHDB_HOST || 'localhost',
		port: process.env.COUCHDB_PORT || '5984',
	}
};
module.exports = config;
