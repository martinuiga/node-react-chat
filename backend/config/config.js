const config = {
	app: {
		port: process.env.PORT || 3005,
	},
	couchdb: {
		host: process.env.COUCHDB_HOST || 'localhost',
	}
};
module.exports = config;
