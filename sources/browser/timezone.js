var merge = require('../merge');

module.exports = function() {
  return merge({
    timezone: mapping[key()]
  }, 'client');
};

var YEAR = 2014;

function key() {
  var january = offset(new Date(YEAR, 0, 2));
  var june = offset(new Date(YEAR, 5, 2));

  var diff = january - june;

  if (diff === 0) return january + ',0';
  return diff > 0 ? june + ',1,s' : january + ',1'
}

function offset(date) {
  var offset = -date.getTimezoneOffset();
  return (offset !== null ? offset : 0);
}

var timezones = {
  '': {
    '0,0': 'UTC'
  },
  'Africa/': {
    '60,0': 'Lagos',
    '60,1,s': 'Windhoek',
    '120,0': 'Johannesburg',
  },
  'America/': {
    '-600,1': 'Adak',
    '-540,1': 'Anchorage',
    '-480,1': 'Los_Angeles',
    '-420,0': 'Phoenix',
    '-420,1': 'Denver',
    '-360,0': 'Guatemala',
    '-360,1': 'Chicago',
    '-300,0': 'Bogota',
    '-300,1': 'New_York',
    '-270,0': 'Caracas',
    '-240,1': 'Halifax',
    '-240,0': 'Santo_Domingo',
    '-240,1,s': 'Asuncion',
    '-210,1': 'St_Johns',
    '-180,1': 'Godthab',
    '-180,0': 'Argentina/Buenos_Aires',
    '-180,1,s': 'Montevideo',
    '-120,0': 'Noronha',
    '-120,1': 'Noronha'
  },
  'Asia/': {
    '120,1': 'Beirut',
    '180,0': 'Baghdad',
    '210,1': 'Tehran',
    '240,0': 'Dubai',
    '240,1': 'Baku',
    '270,0': 'Kabul',
    '300,1': 'Yekaterinburg',
    '300,0': 'Karachi',
    '330,0': 'Kolkata',
    '345,0': 'Kathmandu',
    '360,0': 'Dhaka',
    '360,1': 'Omsk',
    '390,0': 'Rangoon',
    '420,1': 'Krasnoyarsk',
    '420,0': 'Jakarta',
    '480,0': 'Shanghai',
    '480,1': 'Irkutsk',
    '540,1': 'Yakutsk',
    '540,0': 'Tokyo',
    '600,1': 'Vladivostok',
    '660,1': 'Kamchatka'
  },
  'Atlantic/': {
    '-60,1': 'Azores',
    '-60,0': 'Cape_Verde',
  },
  'Australia/': {
    '525,0': 'Eucla',
    '525,1,s': 'Eucla',
    '570,0': 'Darwin',
    '570,1,s': 'Adelaide',
    '600,0': 'Brisbane',
    '600,1,s': 'Sydney',
    '630,1,s': 'Lord_Howe',
  },
  'Etc/': {
    '-720,0': 'GMT+12'
  },
  'Europe/': {
    '0,1': 'London',
    '60,1': 'Berlin',
    '180,1': 'Moscow',
  },
  'Pacific/': {
    '-660,0': 'Pago_Pago',
    '-660,1,s': 'Apia',
    '-600,0': 'Honolulu',
    '-570,0': 'Marquesas',
    '-540,0': 'Gambier',
    '-480,0': 'Pitcairn',
    '-360,1,s': 'Easter',
    '660,0': 'Noumea',
    '690,0': 'Norfolk',
    '720,1,s': 'Auckland',
    '720,0': 'Majuro',
    '765,1,s': 'Chatham',
    '780,0': 'Tongatapu',
    '780,1,s': 'Apia',
    '840,0': 'Kiritimati'
  }
};

var mapping = {};
for (var k in timezones) {
  for (var t in timezones[k]) {
    mapping[t] = k + timezones[k][t];
  }
}
