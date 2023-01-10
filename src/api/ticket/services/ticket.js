'use strict';

/**
 * ticket service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ticket.ticket');
