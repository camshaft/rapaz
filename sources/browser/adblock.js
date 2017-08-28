var merge = require('../merge');
var window = require('./window');

var BAIT_CLASS = 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links';
var BAIT_STYLE = 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;';

var obj = {
  adblock: false,
};

function compute() {
  var bait = document.createElement('div');
  bait.setAttribute('class', BAIT_CLASS);
  bait.setAttribute('style', BAIT_STYLE);
  window.document.body.appendChild(bait);

  bait.offsetParent;
  bait.offsetHeight;
  bait.offsetLeft;
  bait.offsetTop;
  bait.offsetWidth;
  bait.clientHeight;
  bait.clientWidth;

  obj.adblock = check(bait);

  window.document.body.removeChild(bait);
}

function check(bait) {
  return !!(
    window.document.body.getAttribute('abp') !== null
    || bait.offsetParent === null
    || bait.offsetHeight == 0
    || bait.offsetLeft == 0
    || bait.offsetTop == 0
    || bait.offsetWidth == 0
    || bait.clientHeight == 0
    || bait.clientWidth == 0
    || getComputedStyle(bait)
  );
}

function getComputedStyle(bait) {
  if (window.getComputedStyle !== undefined) {
    var style = window.getComputedStyle(bait, null);
    return (
      style && (
        style.getPropertyValue('display') == 'none'
        || style.getPropertyValue('visibility') == 'hidden'
      )
    );
  }
}

window.addEventListener('load', compute, false);

module.exports = function() {
  compute();
  return merge(obj, 'client');
};
