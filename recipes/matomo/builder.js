'use strict';

// Modules
const _ = require('lodash');

/*
 * Helper to get cache
 */
const getCache = cache => {
  // Return redis
  if (_.includes(cache, 'redis')) {
    return {
      type: cache,
      portforward: true,
      persist: true,
    };
  // Or memcached
  } else if (_.includes(cache, 'memcached')) {
    return {
      type: cache,
      portforward: true,
    };
  }
};

/*
 * Build Matomo
 */
module.exports = {
  name: 'matomo',
  parent: '_lamp',
  config: {
    confSrc: __dirname,
    config: {},
    composer: {},
    database: 'mysql',
    defaultFiles: {
      php: 'php.ini',
    },
    php: '7.4',
    services: {appserver: {overrides: {environment: {
      APP_LOG: 'errorlog',
    }}}},
    tooling: {matomo: {service: 'appserver'}},
    via: 'apache',
    webroot: '.',
    xdebug: false,
  },
  builder: (parent, config) => class LandoMatomo extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      // Add the Matomo console as a default tooling option.
      const matomoTooling = {
        'console': {
          service: 'appserver',
          cmd: '/app/console'
        }
      };
      options.tooling = _.merge({}, matomoTooling, options.tooling);
      if (_.has(options, 'cache') && options.cache !== 'none') {
        options.services.cache = getCache(options.cache);
      }
      // Send downstream
      super(id, options);
    };
  },
};
