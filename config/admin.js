'use strict';

module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('ADMIN_API_TOKEN_SALT'),
  },
});
