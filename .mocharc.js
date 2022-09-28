'use strict';

module.exports = {
    extension: ['ts'],
    ignore: ['node_modules'],
    recursive: true,
    require: ['ts-node/register'],
    spec: ['test/*.spec.ts']
};