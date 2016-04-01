var utils = require('./utils.js');

exports.getBids = function getBids() {
  document.dispatchEvent(new CustomEvent('bidResponse', { 'detail': makeBids() }));
};

function bidFactory(bidInfo) {
  var id = bidInfo.bidId;
  var amount = bidInfo.bidAmount;

  return {
    id: id,
    amount: amount,
    content: 'This is bid ' + id + ' for $' + amount
  }
}

function makeBids() {
  return utils._map(bidFixtures, bidFactory);
}

var bidFixtures = [
  { bidId: 1,
    bidAmount: 5
  },
  {
    bidId: 2,
    bidAmount: 6
  },
  {
    bidId: 3,
    bidAmount: 4
  },
  {
    bidId: 4,
    bidAmount: 3
  },
  {
    bidId: 5,
    bidAmount: 7
  },
  {
    bidId: 6,
    bidAmount: 6
  },
  {
    bidId: 7,
    bidAmount: 2
  },
  {
    bidId: 8,
    bidAmount: 1
  },
  {
    bidId: 9,
    bidAmount: 7
  },
  {
    bidId: 10,
    bidAmount: 5
  }
];
