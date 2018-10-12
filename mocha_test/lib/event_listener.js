const openSTNotification = require('@openstfoundation/openst-notification');

const notificationConfigStrategy = {
  OST_RMQ_USERNAME: process.env.OST_RMQ_USERNAME,
  OST_RMQ_PASSWORD: process.env.OST_RMQ_PASSWORD,
  OST_RMQ_HOST: process.env.OST_RMQ_HOST,
  OST_RMQ_PORT: process.env.OST_RMQ_PORT,
  OST_RMQ_HEARTBEATS: process.env.OST_RMQ_HEARTBEATS,
  OST_RMQ_SUPPORT: process.env.OST_RMQ_SUPPORT,
  CONNECTION_WAIT_TIME: process.env.CONNECTION_WAIT_TIME
};

const openStNotification = openSTNotification.getInstance(notificationConfigStrategy);

let allEvents = {},
  notificationRef = null;

module.exports.verifyIfEventFired = function(uuid, kind) {
  const key = `${uuid}_${kind}`;
  return (
    allEvents[key] !== undefined && allEvents[key] !== 'undefined' && allEvents[key] !== null && allEvents[key] !== ''
  );
};

module.exports.startObserving = function() {
  if (notificationRef === null) {
    openStNotification.subscribeEvent.local(
      [
        'payments.pricer.setAcceptedMargin',
        'payments.pricer.setPriceOracle',
        'payments.pricer.unsetPriceOracle',
        'transfer.payments.pricer.pay',
        'transfer.payments.airdrop.pay',
        'payments.workers.setWorker',
        'payments.workers.removeWorker',
        'payments.workers.remove',
        'payments.opsManaged.setOpsAddress',
        'transfer.payments.brandedToken.transferToBudgetHolder',
        'payments.brandedToken.approveToBudgetHolder'
      ],
      function(msgContent) {
        const messageData = JSON.parse(msgContent);
        const key = `${messageData.message.payload.uuid}_${messageData.message.kind}`;
        allEvents[key] = messageData.message;
      }
    );
    notificationRef = openStNotification;
  }
};
