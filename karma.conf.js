// Look at //:BUILD to see why we're slicing 6
const FILES = process.argv.slice(6);

module.exports = function (config) {
  // Browsers to run on Sauce Labs
  // Check out https://saucelabs.com/platforms for all browser/OS combos
  const customLaunchers = {
    // Sauce Labs keeps failing to get a safari instance
    // sl_safari: {
    //   base: 'SauceLabs',
    //   browserName: 'safari',
    // },
    sl_edge: {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
    },
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '38', // https://polyfill.io/v3/supported-browsers/
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '40', // https://polyfill.io/v3/supported-browsers/
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '11',
    },
  };

  config.set({
    basePath: '',
    frameworks: ['jasmine', 'jasmine-matchers'],
    files: FILES,
    reporters: ['progress', 'saucelabs'],
    colors: true,
    concurrency: 5,
    sauceLabs: {
      testName: 'formatjs',
      build: process.env.TRAVIS_BUILD_ID,
      recordScreenshots: false,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      // Must match with `.github/workflows/saucelabs.yml`
      connectOptions: {
        scproxyPort: 5757,
        logfile: 'sauce_connect.log',
      },
      public: 'public',
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine-matchers',
      'karma-jasmine',
      'karma-sauce-launcher',
    ],
    // Increase timeout in case connection in CI is slow
    captureTimeout: 120000,
    customLaunchers,
    singleRun: true,
  });
};
