'use strict';

module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6fd9f074-c1f3-4be1-9bb2-755bc342e80d'),
  },
  apiToken: {
    salt: env('ADMIN_API_TOKEN_SALT', '88ae8b22-6da1-4f5f-8b60-96a3de5465b5'),
  },
});
