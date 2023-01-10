'use strict';

/**
 * ticket controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ticket.ticket', ({ strapi }) => ({
  async create(ctx) {
    const { type } = ctx.request.body;
    // get shopify service
    const shopify = strapi.service('plugin::shopify.shopify');
    // get shopify library
    const Shopify = shopify.getShopify();
    // get shopify session
    const { shop, accessToken } = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res, true);
    // get shop service
    const shopService = strapi.service('plugin::shopify.shop');
    // get shop
    const shopRecord = await shopService.findByDomain(shop);
    // get usage record service
    const usageRecordService = strapi.service('plugin::shopify.usage-record');
    // create usage record
    const usageRecord = await usageRecordService.create({
      shop,
      accessToken,
      price: 1.2,
      currencyCode: 'USD',
      description: 'Ticket purchase',
    });
    // get ticket service
    const ticketService = strapi.service('api::ticket.ticket');
    // create ticket
    const ticket = await ticketService.create({
      data: {
        type,
        shop: shopRecord.id,
        usageRecord: usageRecord.id,
      },
    });
    return ticket;
  },
}));
