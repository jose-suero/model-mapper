const { ModelMapperFieldError } = require('../classes/model-mapper-error');
const { checkNumberRange } = require('./check-number-range');

async function processNumberSpec(sourceObject, key, mapModelSpec) {
    const preValue = sourceObject[(mapModelSpec.from && mapModelSpec.from.toString()) || (key)];
    if (preValue && !isNaN(preValue)) {
        const value = parseFloat(preValue);
        return checkNumberRange(value, key, mapModelSpec);
    }
    throw ModelMapperFieldError.createFromModelSpec(key, mapModelSpec);
}
exports.processNumberSpec = processNumberSpec;
