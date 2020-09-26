const { checkRequired } = require('./check-required');
const { ModelMapperFieldError } = require('../classes/model-mapper-error');
const { checkDateRange } = require('./check-date-range');
const { isDate } = require('./is-date');

async function processDateSpec(sourceObject, key, mapModelSpec) {

    const preValue = sourceObject[(mapModelSpec.from && mapModelSpec.from.toString()) || (key)];

    checkRequired(preValue, key, mapModelSpec);

    if (preValue) {
        if (!isDate(preValue))
            throw ModelMapperFieldError.createFromModelSpec(
                key,
                mapModelSpec
            );

        const dtValue = new Date(preValue);

        return checkDateRange(
            dtValue,
            key,
            mapModelSpec
        );
    }

    return '';
}

exports.processDateSpec = processDateSpec;
