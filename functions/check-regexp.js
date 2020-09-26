const { ModelMapperFieldError } = require('../classes/model-mapper-error');

exports.checkRegExp = async function (value, key, mapModelSpec) {
  if (!mapModelSpec.regExp) return value;

  if (!(mapModelSpec.regExp instanceof RegExp))
    throw ModelMapperFieldError.createFromModelSpec(key, mapModelSpec, 'Invalid Type passed to the regExp parameter.');

  if (mapModelSpec.regExp.test(value)) return value;

  throw ModelMapperFieldError.createFromModelSpec(key, mapModelSpec)
}