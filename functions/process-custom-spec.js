const { ModelMapperFieldError } = require('../classes/model-mapper-error');
const { checkLength } = require('./check-length');
const { checkRequired } = require('./check-required');
const { checkRegExp } = require('./check-regexp');

async function processCustomSpec(sourceObject, key, mapModelSpec) {
    if (mapModelSpec.map) {
        const preValue = mapModelSpec.map instanceof Function ?
            Promise.resolve(mapModelSpec.map(sourceObject, key, mapModelSpec))
            : Promise.resolve(mapModelSpec.map);

        const value = await preValue;
        await checkRequired(value, key, mapModelSpec);
        await checkLength(value, key, mapModelSpec);
        return await checkRegExp(value, key, mapModelSpec);
    }

    throw new ModelMapperFieldError(
        'A map function was not provided.',
        key,
        mapModelSpec);
}

exports.processCustomSpec = processCustomSpec;
