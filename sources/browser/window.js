module.exports = process.BUILD_TARGET == 'web' ? window : {
  navigator: {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
    language: 'en',
    languages: ['en', 'es'],
    plugins: [
      {
        "name": "Widevine Content Decryption Module",
        "description": "Enables Widevine licenses for playback of HTML audio/video content. (version: 1.4.8.824)",
        "length": 1,
        "0": {
          "type": "application/x-ppapi-widevine-cdm",
          "suffixes": ""
        }
      },
      {
        "name": "Chrome PDF Viewer",
        "description": "",
        "length": 1,
        "0": {
          "type": "application/pdf",
          "suffixes": "pdf"
        }
      }
    ]
  },
  screen: {
    colorDepth: 24
  },
  document: {
    documentElement: {

    },
    body: {

    },
    getElementsByTagName: function() {
      return [];
    }
  },
  location: {
    href: 'http://google.com'
  }
};
