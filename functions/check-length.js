const { ModelMapperFieldError } = require('../classes/model-mapper-error');

exports.checkLength = async function (value, key, mapModelSpec) {
    validate(mapModelSpec.minLength, mapModelSpec,
        (length) => `The value for '${key}' can not have less than ${length} characters`,
        'Invalid length provided for minLength parameter.',
        (length) => value.length >= length);

    validate(mapModelSpec.maxLength, mapModelSpec,
        (length) => `The value for '${key}' can not have more than ${length} characters`,
        'Invalid length provided for maxLength parameter.',
        (length) => value.length <= length);

    return value;
}

function validate(specParam, mapModelSpec, defaultMessageCtor, isNaNMessage, fnValidate) {
    if (specParam) {
        const [length, message] = Array.isArray(specParam) ? specParam : [specParam, defaultMessageCtor(specParam)];

        if (isNaN(length))
            throw ModelMapperFieldError.createFromModelSpec(key, mapModelSpec, isNaNMessage);

        if (!fnValidate(length))
            throw ModelMapperFieldError.createFromModelSpec(key, mapModelSpec, message.toString());
    }
}