/** @module simpleJsApp */

var bidServer = require('./bidServer');
var timeout = 0;

// if simpleJsApp already exists in global dodcument scope, use it, if not, create the object
window.simpleJsApp = (window.simpleJsApp || {});
window.simpleJsApp.que = window.simpleJsApp.que || [];
window.simpleJsApp.callbacks = window.simpleJsApp.callbacks || [];

var simpleJsApp = window.simpleJsApp;

/**
 * Once the app is loaded the que array `push` method is redefined
 * to execute function immediately
 * @param  {function} cmd anonymous function to execute
 * @alias module:simpleJsApp.que.push
 */
simpleJsApp.que.push = function (cmd) {
  if (typeof cmd === 'function') {
    try {
      cmd.call();
    } catch (e) {
      console.log('Error processing command :' + e.message);
    }
  } else {
    utils.logError('Commands written into simpleJsApp.que.push must wrapped in a function');
  }
};

simpleJsApp.echoMyContent = function(content){
  return content;
};

simpleJsApp.setTimeout = function appTimeOut(timeout) {
  this.timeout = timeout;
};

simpleJsApp.init = function init() {
  document.addEventListener('bidResponse', function(event) {
    for (var i = 0; i < simpleJsApp.callbacks.length; i++) {
      var bidWonIndex = Math.floor(Math.random() * 9);
      console.log('bidWonIndex', bidWonIndex);
      simpleJsApp.callbacks.pop().call(null, event.detail[bidWonIndex]);
    }
  });
  processQue();
};

simpleJsApp.getBids = function(options) {
  console.log('gettings bids...');
  this.callbacks.push(options.bidsBackHandler);
  window.setTimeout(bidServer.getBids, this.timeout);
};


function processQue() {
  for (var i = 0; i < simpleJsApp.que.length; i++) {
    if (typeof simpleJsApp.que[i].called === 'undefined') {
      try {
        simpleJsApp.que[i].call();
        simpleJsApp.que[i].called = true;
      }
      catch (e) {
        console.log('Error processing command :', 'prebid.js', e);
      }
    }
  }
}
