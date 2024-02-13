'use strict';

module.exports = {
    ...require('./jest.config'),
    coverageReporters: ['json'],
    reporters: [
      'default',
      [
        'jest-junit',
        {outputDirectory: './', outputName: 'test-results.xml'},
      ]
  ],
};
