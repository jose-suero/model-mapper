const { ModelMapperFieldError } = require('../classes/model-mapper-error');

exports.checkNumberRange = async function (value, key, mapModelSpec) {
    mapModelSpec.min && validate(
        mapModelSpec.min,
        mapModelSpec,
        (testValue) => `The minimum value accepted for key '${key}' is ${testValue}.`,
        'Invalid value provided for min parameter.',
        (testValue) => (value >= testValue));

    mapModelSpec.max && validate(
        mapModelSpec.max,
        mapModelSpec,
        (testValue) => `The maximum value accepted for key '${key}' is ${testValue}.`,
        'Invalid value provided for max parameter.',
        (testValue) => (value <= testValue));

    return value;
}

function validate(
    specParam,
    mapModelSpec,
    defaultMessageCtor,
    isNaNMessage,
    validate) {
    if (specParam) {
        const [value, message] = Array.isArray(specParam) ?
            specParam
            :
            [specParam, defaultMessageCtor(specParam)];

        if (isNaN(value))
            throw ModelMapperFieldError.createFromModelSpec(
                key,
                mapModelSpec,
                isNaNMessage);

        if (!validate(value))
            throw ModelMapperFieldError.createFromModelSpec(
                key,
                mapModelSpec,
                message.toString());
    }
}