'use strict';

module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'frame-ancestors': null,
        },
      },
      frameguard: false,
    },
  },
  'strapi::cors',
  {
    name: 'strapi::poweredBy',
    config: {
      poweredBy: 'Shop3 <shop3.dev>',
    },
  },
  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      includeUnparsed: true,
    },
  },
  'strapi::favicon',
  'strapi::public',
];
