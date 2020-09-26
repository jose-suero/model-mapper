const { ModelMapperFieldError } = require('../classes/model-mapper-error');
const { isDate } = require('./is-date');

exports.checkDateRange = async function (value, key, mapModelSpec) {
    mapModelSpec.min && validate(
        mapModelSpec.min,
        mapModelSpec,
        (testValue) => `The minimum date accepted for key '${key}' is ${testValue}.`,
        'Invalid value provided for minimum date parameter.',
        (testValue) => (value >= testValue));

    mapModelSpec.max && validate(
        mapModelSpec.max,
        mapModelSpec,
        (testValue) => `The maximum date accepted for key '${key}' is ${testValue}.`,
        'Invalid value provided for maximum date parameter.',
        (testValue) => (value <= testValue));

    return value;
}

function validate(
    specParam, mapModelSpec, defaultMessageCtor,
    notDateMessage, validate) {
    if (specParam) {
        const [value, message] = Array.isArray(specParam) ?
            specParam
            :
            [specParam, defaultMessageCtor(new Date(specParam))];

        if (!isDate(value))
            throw ModelMapperFieldError.createFromModelSpec(
                key,
                mapModelSpec,
                notDateMessage);

        if (!validate(new Date(value)))
            throw ModelMapperFieldError.createFromModelSpec(
                key,
                mapModelSpec,
                message.toString());
    }
}