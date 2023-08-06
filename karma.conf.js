// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('karma-time-stats-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      timeouts: 'all',
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/angular-test-training'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
      ]
    },
    reporters: ['progress', 'kjhtml', 'dots', 'time-stats'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],
    singleRun: false,
    restartOnFileChange: true,
    timeStatsReporter: {
      reportTimeStats: true,
      binSize: 100,
      reportSlowerThan: 500,
      slowThreshold: 500,
      reportSlowestTests: true,
      showSlowTestRankNumber: false,
      longestTestsCount: 10,
      reportOnlyBeyondThreshold: false,
    },
  });
};
