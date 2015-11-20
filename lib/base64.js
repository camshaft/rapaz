var utf8Encode = require('utf8-encode');
var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

exports.encode = function(input) {
  return (typeof input === 'number' ? fromNumber : fromString)(input);
};

function fromNumber(input) {
  var result = '';
  while (true) {
    result = charFor(input & 0x3f) + result;
    input >>>= 6;
    if (input === 0) return result;
  }
}

function fromString(input) {
  var output = [];
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  input = utf8Encode(input);

  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output.push(charFor(enc1), charFor(enc2), charFor(enc3), charFor(enc4));
  }

  return output.join('');
}

function charFor(idx) {
  return keyStr.charAt(idx) || '';
}
