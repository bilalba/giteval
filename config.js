var config = {};
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
config.env = env;
config.port = 9910;
config.redis_url = '';
if (env == 'production')
	config.redis_url = process.env.REDIS_URL;
config.github = {};
config.github.CLIENT_ID = 'c45417c5d6249959a91d';
config.github.CLIENT_SECRET = '3630a057d4ebbbdbfc84f855376f3f46f58b9710';

module.exports = config;