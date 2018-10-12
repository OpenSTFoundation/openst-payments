const openSTNotification = require('@openstfoundation/openst-notification');

const notificationConfigStrategy = {
  OST_RMQ_USERNAME: 'guest',
  OST_RMQ_PASSWORD: 'guest',
  OST_RMQ_HOST: '127.0.0.1',
  OST_RMQ_PORT: '5672',
  OST_RMQ_HEARTBEATS: '30',
  OST_RMQ_SUPPORT: '1'
};

const openStNotification = openSTNotification.getInstance(notificationConfigStrategy),
  openStNotificationInstance = openStNotification.getInstance();

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
    openSTNotification.subscribeEvent.local(
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
    notificationRef = openStNotificationInstance;
  }
};
