'use strict';

module.exports = {
    extension: ['js'],
    ignore: ['node_modules'],
    recursive: true,
    require: ['ts-node/register'],
    spec: ['dist/test/*.spec.js']
};