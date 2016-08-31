var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'dzb'
    },
    port: process.env.PORT || 3030,
    db: 'mongodb://localhost/dzb-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'dzb'
    },
    port: process.env.PORT || 3030,
    db: 'mongodb://localhost/dzb-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'dzb'
    },
    port: process.env.PORT || 3030,
    db: 'mongodb://localhost/dzb-production'
  }
};

module.exports = config[env];
